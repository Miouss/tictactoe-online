import { Account } from "../database";
import { Request, Response } from "express";

import { findAccount } from "./handleAccount";

interface LoginBody {
  username: string;
  password: string;
}

export async function handleLogin(req: Request, res: Response) {
  const { username, password } = req.body as unknown as LoginBody;

  try {
    const account = await findAccount(username);

    if (!account) {
      res.status(400).send("Account does not exist");
      return;
    }

    const isPasswordIncorrect = account.password !== password;

    if (isPasswordIncorrect) {
      res.status(400).send("Incorrect password");
      return;
    }

    res.status(200).send("Logged in");
  } catch (e) {
    console.error(e);
    res.status(409).send("Error logging in");
  }
}
