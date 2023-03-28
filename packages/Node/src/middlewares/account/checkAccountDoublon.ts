import { Request, Response, NextFunction } from "express";
import { findAccountByUsername } from "@utils";
import { AccountBody } from "@types";
import { AccountAlreadyExistsError } from "@classes";

export async function checkAccountDoublon(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username } = req.body as AccountBody;
  try {
    const isAccountExists = await findAccountByUsername(username);

    if (isAccountExists) throw new AccountAlreadyExistsError();

    next();
  } catch (err) {
    next(err);
  }
}
