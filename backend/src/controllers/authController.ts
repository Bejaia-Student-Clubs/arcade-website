import { Request, Response } from "express";
import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateTokens } from "../utils/generateTokens.js";

const register = async (req: Request, res: Response) => {
  try {
    //data sent by the user from the request body (always in json)
    const { username, email, password } = req.body;

    //email and password are required, stop here if one is missing
    if (!email || !password) {
      return res.status(400).json({ error: "fill the sections" });
    }

    //asking prisma if a user exists already with this email
    const emailExists = await prisma.user.findUnique({ where: { email } });

    if (emailExists) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    }

    const usernameExists = await prisma.user.findUnique({ where: { username } });

    if (usernameExists) {
      return res
        .status(400)
        .json({ error: "User already exists with this username" });
    }

    //bcrypt is used to hash the password (NEVER store non-hashed password in the db)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //then we save the new user in the db with his hashed password
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    // create an access token for this user (also sets the refresh token cookie, see generateTokens.ts
    const accessToken = generateTokens(user.id, res);

    //return user's input if success
    res.status(201).json({
      status: "success",
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Server error during registration" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // look for a user with this email in the db
    const user = await prisma.user.findFirst({ where: { email } });

    //no user found with this mail (the const user only stores the email here)
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    //no password saved in the db so he registered with google
    if (!user.password) {
      return res.status(400).json({ error: "Please sign in with Google" });
    }

    //compare the password typed by the user with the hash stored in the db (bcrypt hashes the typed password too and checks if it matches)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    //hashed input not equal the hashed password in the db
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    //generate a new token everytime the user logs in (refresh token generated too)
    const accessToken = generateTokens(user.id, res);

    res.status(200).json({
      status: "success",
      accessToken,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};

// called automaticly by the frontend when the access token expires
const refresh = async (req: Request, res: Response) => {
  // read the refresh token stored in the browser's cookie
  const token = req.cookies?.refreshToken;

  if (!token) {
    return res.status(401).json({ error: "No refresh token provided" });
  }

  try {
    // check that the refresh token is real and not expired
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string,
    ) as any;
    //if doesn't fall on the catch so refresh token is valid so it'll just create an new access token, the refresh token untouched 
    const accessToken = generateAccessToken(decoded.id);
    res.status(200).json({ accessToken });
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired refresh token" });
  }
};

// used to restore the user's session from the cookie when the page is refreshed, or the user closes the tab and reopen it...
const me = async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    // check that the cookie's refresh token is valid
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string,
    ) as any;

    // fetch this user's info from the db (without the password)
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, firstName: true, lastName: true },
    });

    if (!user) {
      return res.status(401).json({ error: "User no longer exists" });
    }

    // give the user a fresh access token
    const accessToken = generateTokens(user.id, res);
    res.status(200).json({ accessToken, user });
  } catch (err) {
    return res.status(401).json({ error: "Session expired" });
  }
};

//if he logs out we just remove the refresh token cookie
const logout = async (req: Request, res: Response) => {
  try {
    // overwrite the cookie with an empty value and a past expiry date so the browser automaticaly delete it
    res.cookie("refreshToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res
      .status(200)
      .json({ status: "success", message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Server error during logout" });
  }
};

export { register, login, logout, refresh, me };
