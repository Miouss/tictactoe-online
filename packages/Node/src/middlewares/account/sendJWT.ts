import { Request, Response } from "express";
import { getJWT } from "@utils";
import { AccountBody } from "./types";

export function sendJWT(req: Request, res: Response) {
  const { username } = req.body as AccountBody;

  const { token, refreshToken } = getJWT(username);

  const isProductionEnv = process.env.NODE_ENV === "production";

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProductionEnv,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProductionEnv,
    maxAge: 10 * 60 * 1000,
  });
  res.status(200).json({ token });
}
