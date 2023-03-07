import jwt from "jsonwebtoken";
import process from "process";
import { Account } from "../database";

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

export function getJWT(username: string) {
  const { JWT_PRIVATE_KEY } = process.env;

  return jwt.sign({ username }, JWT_PRIVATE_KEY as string);
}
