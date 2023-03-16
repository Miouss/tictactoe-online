import { Request, Response, NextFunction } from "express";
import { findAccountByCredentials } from "@utils";
import { AccountBody } from "@types";

export async function verifyCredentials(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, password } = req.body as AccountBody;

  const isAccountFound = await findAccountByCredentials(username, password);

  if (isAccountFound) {
    next();
  } else {
    res.status(401);
    next(new Error("Access denied"));
  }
}
