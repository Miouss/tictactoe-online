import { Account } from "../database";
import { Request, Response } from "express";

interface AccountBody {
  username: string;
  password: string;
  email: string;
}

export async function handleAccountCreation(req: Request, res: Response) {
  const { username, password, email } = req.body as unknown as AccountBody;

  try {
    const isAccountAvailable = await findAccount(username) ? true : false;

    if (isAccountAvailable) {
      res.status(400).send("Account already exists");
      return;
    }

    await addAccountToDatabase(username, password, email);
    res.status(200).send("Account created");
  } catch (e) {
    console.error(e);
    res.status(409).send("Error creating account");
  }
}

export async function addAccountToDatabase(
  username: string,
  password: string,
  email: string
) {
  await Account.create({
    username,
    password,
    email,
  });
}

export async function findAccount(username: string) {
  const account = await Account.findOne().where("username").equals(username);
  return account;
}
