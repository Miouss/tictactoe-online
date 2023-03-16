import { Request, Response, NextFunction } from "express";
import { addAccountToDatabase, getAccountFromDatabase, getJWT } from "@utils";
import { AccountBody } from "@types";

export async function checkAccountDoublon(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username } = req.body as AccountBody;
  try {
    const account = await getAccountFromDatabase(username);

    if (account) throw new Error("Account already exists");

    next();
  } catch (err) {
    next(err);
  }
}

export async function createUnconfirmedAccountToDatabase(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, password, email } = req.body as AccountBody;

  try {
    await addAccountToDatabase(username, password, email);
    next();
  } catch (err) {
    next(err);
  }
}

export function sendConfirmationToken(req: Request, res: Response) {
  const { username } = req.body as AccountBody;

  const token = getJWT(username);

  res.status(200).json({ message: "Account created", token });
}
