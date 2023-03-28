import { Account } from "@database";

export async function findAccountByUsername(username: string) {
  const isAccountExists = await Account.exists({
    username,
  });

  return isAccountExists;
}

export async function findAccountByCredentials(
  username: string,
  password: string
) {
  const isAccountExists = await Account.exists({
    username,
    password,
  });

  return isAccountExists;
}
