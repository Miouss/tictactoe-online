import { Response, NextFunction } from "express";
import { decodeJWT } from "@utils";
import { TokenRequest } from "@types";

export function verifyJWT(
  req: TokenRequest,
  res: Response,
  next: NextFunction
): void {
  const { token } = req.query;

  const { decodedToken } = decodeJWT(token as string);

  if (decodedToken === null) return next(new Error("Invalid token"));

  req.decodedToken = decodedToken;
  next();
}

export function confirmAccount(req: TokenRequest, res: Response) {
  const { decodedToken } = req;
  res.status(200).json({ decodedToken });
}
