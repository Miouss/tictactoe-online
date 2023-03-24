import { Request, Response, NextFunction } from "express";
import { addAccountInDatabase } from "./utils";
import { AccountBody } from "./types";

export async function createAccountInDatabase(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, password, email } = req.body as AccountBody;

  try {
    await addAccountInDatabase(username, password, email);
    next();
  } catch (err) {
    next(err);
  }
}
