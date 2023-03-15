import { Account } from "@database";

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
