import { Response, NextFunction } from "express";
import { TokenRequest } from "@types";
import { getAccountFromDatabase } from "./utils";

export async function confirmAccount(
  req: TokenRequest,
  res: Response,
  next: NextFunction
) {
  const { username } = req.decodedToken;

  try {
    let status, message;

    const account = await getAccountFromDatabase(username);
    if (!account) {
      status = 404;
      message = "Account not found";
    } else if (account.isConfirmed) {
      status = 409;
      message = "Account already confirmed";
    } else {
      account.isConfirmed = true;
      await account.save();
      status = 200;
      message = "Account confirmed";
    }

    res.status(status).json({ message });
  } catch (err) {
    next(err);
  }
}
