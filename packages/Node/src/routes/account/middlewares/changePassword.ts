import { NextFunction, Request, Response } from "express";
import { getAccount } from "@utils";

export async function changePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, newPassword } = req.body;

  try {
    const account = await getAccount(username);
    account.password = newPassword;
    await account.save();

    res.status(200).json({ message: "Password changed" });
  } catch (err) {
    next(err);
  }
}
