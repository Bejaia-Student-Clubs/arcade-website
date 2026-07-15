import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

//just typescript bs
declare global {
  var poolGlobal: pg.Pool | undefined;
  var prismaGlobal: PrismaClient | undefined;
}

const { Pool } = pg;


const pool = globalThis.poolGlobal ?? new Pool({
  connectionString: process.env.DATABASE_URL, // where and how to reach the db, from .env
  max: 10, // never open more than 10 connections at once
  idleTimeoutMillis: 30000, // close a connection if it's unused for 30 seconds
  connectionTimeoutMillis: 5000, // give up trying to connect after 5 seconds
});

// Handle pool errors
pool.on("error", (err: any) => {
  console.error("Unexpected error on idle client", err);
});

// Save the pool in global memory for Nodemon
// nodemon restarts the server on every file change during development
// without this, we'd create a new pool on every restart and pile up connections
if (process.env.NODE_ENV !== "production") {
  globalThis.poolGlobal = pool ;
}

// 2. Configure Prisma with this global Pool
const prismaClientSingleton = () => {
  const adapter = new PrismaPg(pool);
  
  return new PrismaClient({
    adapter, 
    // show detailed logs (queries, errors, warnings) only in development, just errors in production
    log: process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
  });
};

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// keep this client in global memory in development, so nodemon restarts reuse it too
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

// call this once when the server starts, to open the db connection right away
const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("✓ Database connected successfully");
    } catch(error: any) {
        console.error(`✗ Database connection error: ${error.message}`);
        process.exit(1);
    }
};

// call this when shutting down the server, to close connections cleanly
const disconnectDB = async () => {
    try {
        await prisma.$disconnect();
        
        if (pool) {
            await pool.end();
        }
        
        console.log("✓ Database pool closed successfully");
    } catch (error: any) {
        console.error("✗ Error closing database connection:", error.message);
    }
};

export { prisma, connectDB, disconnectDB };