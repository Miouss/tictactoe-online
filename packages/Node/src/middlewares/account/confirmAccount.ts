import { Response, NextFunction } from "express";
import { TokenRequest } from "@types";
import { getAccount } from "@utils";

export async function confirmAccount(
  req: TokenRequest,
  res: Response,
  next: NextFunction
) {
  const { username } = req.decodedToken;

  try {
    let statusCode, message;

    const account = await getAccount(username);

    if (account.isConfirmed) {
      statusCode = 409;
      message = "Account already confirmed";
    } else {
      account.isConfirmed = true;
      await account.save();
      statusCode = 200;
      message = "Account confirmed";
    }

    res.status(statusCode).json({ message });
  } catch (err) {
    next(err);
  }
}
