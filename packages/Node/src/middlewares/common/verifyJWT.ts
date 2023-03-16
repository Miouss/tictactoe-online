import { Response, NextFunction } from "express";
import { decodeJWT, refreshJWT } from "@utils";
import { TokenRequest } from "@types";

export function verifyJWT(
  req: TokenRequest,
  res: Response,
  next: NextFunction
): void {
  const { token } = req.query ?? req.cookies;
  const { ACCESS_JWT_SECRET } = process.env;

  let decodedToken = decodeJWT(
    token as string,
    ACCESS_JWT_SECRET as string
  );

  const needRefresh = decodedToken === null;

  if (needRefresh) {
    const { refreshToken } = req.cookies;
    const newToken = refreshJWT(refreshToken);

    decodedToken = decodeJWT(newToken, ACCESS_JWT_SECRET as string);
  }

  if (decodedToken === null) {
    res.status(403);
    return next(new Error("Invalid token"));
  }

  req.decodedToken = decodedToken;

  next();
}
