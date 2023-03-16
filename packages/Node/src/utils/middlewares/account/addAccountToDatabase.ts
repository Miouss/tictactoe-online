import { Account } from "@database";

export function addAccountToDatabase(
  username: string,
  password: string,
  email: string
) {
  return Account.create({
    username,
    password,
    email,
  });
}
