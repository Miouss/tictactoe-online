import { Account } from "@database";

export function createAccount(
  username: string,
  password: string,
  email: string
) {
  return Account.create({
    username,
    password,
    email,
    isConfirmed: false,
  });
}
