import { Response } from "express";
import { TokenRequest } from "@types";

export function confirmAccount(req: TokenRequest, res: Response) {
  const { decodedToken } = req;
  res.status(200).json({ decodedToken });
}
