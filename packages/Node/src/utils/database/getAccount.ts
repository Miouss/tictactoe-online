import { Account } from "@database";
import { AccountNotConfirmedError } from "@classes";

export async function getAccount(username: string) {
  const account = await Account.findOne().where("username").equals(username);

  if (!account) throw new AccountNotConfirmedError();

  return account;
}
