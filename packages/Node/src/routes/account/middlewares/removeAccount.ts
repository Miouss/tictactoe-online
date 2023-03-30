import { Request, Response, NextFunction } from "express";
import { deleteAccount } from "@utils";
import { AccountBody } from "@types";

export async function removeAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, password } = req.body as AccountBody;

  try {
    await deleteAccount(username, password);
    res.status(200).json({ message: "Account removed" });
  } catch (err) {
    next(err);
  }
}
