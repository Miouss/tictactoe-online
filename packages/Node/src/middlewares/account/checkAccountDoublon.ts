import { Request, Response, NextFunction } from "express";
import { findAccountByUsername } from "@utils";
import { AccountBody } from "@types";

export async function checkAccountDoublon(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username } = req.body as AccountBody;
  try {
    const isAccountExists = await findAccountByUsername(username);

    if (isAccountExists) {
      res.status(409);
      throw new Error("Account already exists");
    }

    next();
  } catch (err) {
    next(err);
  }
}
