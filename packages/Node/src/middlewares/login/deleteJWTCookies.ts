import { Request, Response } from "express";

export function deleteJWTCookies(req: Request, res: Response) {
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out" });
}
