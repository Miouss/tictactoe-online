import { Response, NextFunction } from "express";
import { AccountBody, TokenRequest } from "@types";
import { getJWT } from "@utils";

export function createJWT(
  req: TokenRequest,
  _: Response,
  next: NextFunction
) {
  const { username } = req.body as AccountBody;

  const { token, refreshToken } = getJWT(username);

  req.token = token;
  req.refreshToken = refreshToken;

  next();
}
