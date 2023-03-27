import { Response, NextFunction } from "express";
import { AccountBody } from "./types";
import { TokenRequest } from "@types";
import { getJWT } from "@utils";

export function createJWT(
  req: TokenRequest,
  res: Response,
  next: NextFunction
) {
  const { username } = req.body as AccountBody;

  const { token, refreshToken } = getJWT(username);

  req.token = token;
  req.refreshToken = refreshToken;

  next();
}
