import { Request, Response, NextFunction } from "express";
import { findAccountByCredentials } from "@utils";
import { AccountBody } from "@types";
import { CredentialsIncorrectError } from "@classes";

export async function verifyCredentials(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const { username, password } = req.body as AccountBody;

  try {
    const isAccountFound = await findAccountByCredentials(username, password);
    
    if (!isAccountFound) throw new CredentialsIncorrectError();
    
    next();
  } catch (err) {
    next(err);
  }
}
