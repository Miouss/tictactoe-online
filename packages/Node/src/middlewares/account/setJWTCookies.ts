import { NextFunction, Response } from "express";
import { TokenRequest } from "@types";

export function setJWTCookies(
  req: TokenRequest,
  res: Response,
  next: NextFunction
) {
  const { token, refreshToken } = req;

  const isTokenMissing = !token || !refreshToken;

  if (isTokenMissing)
    return next(new Error("Token or refreshToken is missing"));

  const isProductionEnv = process.env.NODE_ENV === "production";

  const getCookieOptions = (maxAge: number) => ({
    httpOnly: true,
    secure: isProductionEnv,
    maxAge,
  });

  res.cookie(
    "refreshToken",
    refreshToken,
    getCookieOptions(24 * 60 * 60 * 1000)
  );

  res.cookie("token", token, getCookieOptions(10 * 60 * 1000));

  next();
}
