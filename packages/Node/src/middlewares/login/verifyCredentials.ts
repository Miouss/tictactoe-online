import { Request, Response, NextFunction } from "express";
import { findAccountByCredentials } from "@utils";
import { AccountBody } from "@types";
import { AccountNotFoundError } from "@classes";

export async function verifyCredentials(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, password } = req.body as AccountBody;

  try {
    const isAccountFound = await findAccountByCredentials(username, password);

    if (!isAccountFound) throw new AccountNotFoundError();

    next();
  } catch (err) {
    next(err);
  }
}
