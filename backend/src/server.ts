import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";


config(); //reads the .env file
//verify if essential env var is missing
const requiredEnvVars = ["JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET", "DATABASE_URL"];
for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required env variable: ${key}`);
  }
}

const app = express();

//security to hide some http headers so attackers don't know which technologies we exactly use
app.use(helmet());

//to read json reqests from the front 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//to read the refresh token stored in users cookies with req.cookies
app.use(cookieParser());



const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [];

//decides wich website can call the api
const corsOptions = {
  origin: allowedOrigins, // the const that contains the allowed urls
  credentials: true, // allows client's browser to send the cookie containing the token to the api 
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//routes
app.use("/auth", authRoutes);

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown function
const shutdown = async (signal: string) => {
  console.log(`\n${signal} received. Cleaning up and shutting down...`);

  // 1. Close the server (stops new connections)
  server.close(async (err) => {
    if (err) console.error("Server shutdown error:", err);

    // 2. Properly close the database
    await disconnectDB();

    // 3. Exit
    console.log("Process stopped.");
    process.exit(0);
  });
};

// listen to stop signals
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.once("SIGUSR2", () => shutdown("SIGUSR2")); //for Nodemon

//FOR GLOBAL CRASHES

// for sync err without a try/catch
process.on("uncaughtException", (err) => {
  console.error("✗ CRITICAL ERROR (Uncaught Exception):", err.message);
  console.error(err.stack);
  shutdown("UNCAUGHT_EXCEPTION");
});

// for async err without a try/catch
process.on("unhandledRejection", (reason, promise) => {
  console.error(
    "✗ CRITICAL ERROR (Unhandled Rejection) at:",
    promise,
    "reason:",
    reason,
  );
  shutdown("UNHANDLED_REJECTION");
});
