import { Request, Response } from "express";
import { addAccountToDatabase, findAccount } from "@middlewares";
import { AccountBody } from "@types";

export async function accountCreation(req: Request, res: Response) {
  const { username, password, email } = req.body as unknown as AccountBody;

  try {
    const isAccountAvailable = (await findAccount(username)) ? true : false;

    if (isAccountAvailable) {
      res.status(400).json({ message: "Account already exists" });
      return;
    }

    await addAccountToDatabase(username, password, email);
    res.status(200).json({ message: "Account created" });
  } catch (e) {
    console.error(e);
    res.status(409).json({ message: "Error creating account" });
  }
}
