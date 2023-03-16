import { Response, NextFunction } from "express";
import { verifyJWT } from "@utils";
import { TokenRequest } from "@types";

export function decodeJWT(
  req: TokenRequest,
  res: Response,
  next: NextFunction
): void {
  const { token } = req.query;

  const { decodedToken } = verifyJWT(token as string);

  if (decodedToken === null) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  req.decodedToken = decodedToken;
  next();
}

export function confirmAccount(req: TokenRequest, res: Response) {
  const { decodedToken } = req;
  res.status(200).json({ decodedToken });
}
