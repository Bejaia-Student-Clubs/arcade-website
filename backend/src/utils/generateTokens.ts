import jwt from "jsonwebtoken";
import { Response } from "express";

// creates a short-lived access token only
// used when we just need to refresh the access token (when the refresh token is already valid in the cookie that means the user is already loged in with his browser), WITHOUT touching the refresh token cookie
export const generateAccessToken = (userId: string) => {
  //we generaly need any user data like his email to generate the token, we're using here userId
  const payload = { id: userId };

  //this function from jsonwebtoken lib generates the token using these arguments: the payload (the userId), a secret key from your .env file, and finaly how long will it last
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN || "15m") as any,
  });
};

// creates BOTH tokens: only call this when starting a new session (login or register)
// the refresh token is stored in an httpOnly cookie and stays the same until user logs out/logs in again or it simply expires
export const generateTokens = (userId: string, res: Response) => {
  //this time we'll use it to generate th refresh token
  const payload = { id: userId };

  //we call directly the function already used to create an access token
  const accessToken = generateAccessToken(userId);

  //we create the refresh token the exact same way we created the access token (ofc the env variable is not the same bc it lasts longer)
  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || "7d") as any },
  );

  // we use the res because the refresh token goes in a cookie, httpOnly — the access token goes in the JSON body
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // blocks browser javascript from reading this cookie (protects from dangerous attacks)
    secure: process.env.NODE_ENV === "production", // cookie only sent over https once in production
    sameSite: "strict", // cookie only sent for requests coming from our own site
    maxAge: 1000 * 60 * 60 * 24 * 7, // cookie expires after 7 days (in ms)
  });

  return accessToken;
};
