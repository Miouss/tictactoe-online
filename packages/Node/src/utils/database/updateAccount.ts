import { Account } from "@database";

export async function updateAccount(
  username: string,
  update: any
) {
  const filter = { username };
  const account = await Account.findOneAndUpdate(filter, update);

  return account;
}
