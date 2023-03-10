import { Account } from "@database";

export async function getAccountInDatabase(username: string) {
  const account = await Account.findOne().where("username").equals(username);
  return account;
}
