import { Response } from "express";
import { TokenRequest } from "@types";

export function sendJWT(req: TokenRequest, res: Response) {
  const { token } = req;
  res.status(200).json({ token });
}
