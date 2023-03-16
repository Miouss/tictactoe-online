import { Request, Response, NextFunction } from "express";
import { addAccountToDatabase, getAccountFromDatabase, getJWT } from "@utils";
import { AccountBody } from "@types";

export async function checkAccountDoublon(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username } = req.body as unknown as AccountBody;
    const account = await getAccountFromDatabase(username);
    throw new Error("Account already exists");
    //if (account) throw new Error("Account already exists");

    next();
  } catch (err: any) {
    next(err);
  }
}

export function createUnconfirmedAccountToDatabase(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, password, email } = req.body as unknown as AccountBody;

  addAccountToDatabase(username, password, email);

  next();
}

export function sendConfirmationToken(req: Request, res: Response) {
  const { username } = req.body as unknown as AccountBody;

  const token = getJWT(username);

  res.status(200).json({ message: "Account created", token });
}

export function handleAccountCreationError(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  res.status(409).json({ message: err.message });
}
