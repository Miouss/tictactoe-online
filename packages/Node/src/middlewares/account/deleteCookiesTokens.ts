import { Request, Response } from "express";

export function deleteCookiesTokens(req: Request, res: Response) {
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out" });
}
