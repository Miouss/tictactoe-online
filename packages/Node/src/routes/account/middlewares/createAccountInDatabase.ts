import { Request, Response, NextFunction } from "express";
import { addAccount } from "@utils";
import { AccountBody } from "@types";

export async function createAccountInDatabase(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const { username, password, email } = req.body as AccountBody;

  try {
    await addAccount(username, password, email);
    next();
  } catch (err) {
    next(err);
  }
}
