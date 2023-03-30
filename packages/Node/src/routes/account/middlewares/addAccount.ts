import { Request, Response, NextFunction } from "express";
import { createAccount } from "@utils";
import { AccountBody } from "@types";

export async function addAccount(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const { username, password, email } = req.body as AccountBody;

  try {
    await createAccount(username, password, email);
    next();
  } catch (err) {
    next(err);
  }
}
