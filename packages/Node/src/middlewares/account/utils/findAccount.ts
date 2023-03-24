import { Account } from "@database";

export async function findAccountByUsername(username: string) {
  return !!await Account.exists({
    username,
  });
}

export async function findAccountByCredentials(username: string, password: string) {
  return !!await Account.exists({
    username,
    password,
  });
}
