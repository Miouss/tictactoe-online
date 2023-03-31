import { Response, NextFunction } from "express";
import { decodeJWT, isObjectEmpty, refreshJWT } from "@utils";
import { TokenRequest } from "@types";
import { TokenInvalidError } from "@classes";

export function verifyJWT(
  req: TokenRequest,
  res: Response,
  next: NextFunction
) {
  const isQuery = !isObjectEmpty(req.query);

  const { token } = isQuery ? req.query : req.cookies;

  const { ACCESS_JWT_SECRET } = process.env;

  let decodedToken = decodeJWT(token as string, ACCESS_JWT_SECRET as string);

  const needRefresh = decodedToken === null;

  if (needRefresh && !isQuery) {
    const { refreshToken } = req.cookies;
    const newToken = refreshJWT(refreshToken);
    decodedToken = decodeJWT(newToken, ACCESS_JWT_SECRET as string);
  }

  if (decodedToken === null) {
    res.status(403);
    return next(new TokenInvalidError());
  }

  req.decodedToken = decodedToken;

  next();
}
