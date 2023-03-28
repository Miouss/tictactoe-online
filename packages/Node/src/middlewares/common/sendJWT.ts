import { Response } from "express";
import { TokenRequest } from "@types";

export function sendJWT(req: TokenRequest, res: Response) {
  const { token } = req;
  console.log("token", token);
  res.status(200).json({ token });
}
