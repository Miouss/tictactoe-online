import { Request, Response } from "express";
import { findAccount, getJWT } from "@middlewares";
import { LoginBody } from "@types";

export async function login(req: Request, res: Response) {
  const { username, password } = req.body as unknown as LoginBody;

  try {
    const account = await findAccount(username);

    if (!account) {
      res.status(400).json({ message: "Account does not exist" });
      return;
    }

    const isPasswordIncorrect = account.password !== password;

    if (isPasswordIncorrect) {
      res.status(401).json({ message: "Incorrect Password" });
      return;
    }

    const JWT = getJWT(username);

    res.status(200).json({
      message: "Logged in",
      token: JWT,
    });
  } catch (e) {
    console.error(e);
    res.status(409).json({ message: "Error logging in" });
  }
}
