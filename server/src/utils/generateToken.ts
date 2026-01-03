import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateToken = (userId: string, res: Response): string => {
  const secret = process.env.JWT_SECRET as jwt.Secret;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const payload: jwt.JwtPayload = { id: userId };
  const token = jwt.sign(payload, secret, {
    expiresIn: (process.env.JWT_EXPIRES_IN as string) || "7d",
  } as jwt.SignOptions);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * (24 * 60 * 60 * 1000),
  });

  return token;
};
