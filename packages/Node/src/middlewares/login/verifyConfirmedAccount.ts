import { Request, Response, NextFunction } from "express";
import { getAccount } from "@utils";
import { AccountNotConfirmedError } from "@classes";

export async function verifyConfirmedAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username } = req.body;

  try {
    const account = await getAccount(username);

    if (!account.isConfirmed) throw new AccountNotConfirmedError();

    next();
  } catch (err) {
    next(err);
  }
}
