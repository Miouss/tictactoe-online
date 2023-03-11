import { Account } from "@database";

export async function getAccountFromDatabase(username: string) {
  const account = await Account.findOne().where("username").equals(username);
  return account;
}
