import { Account } from "@database";

export function addAccountInDatabase(
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
