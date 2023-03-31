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
    
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Account deleted" });
  } catch (err) {
    next(err);
  }
}
