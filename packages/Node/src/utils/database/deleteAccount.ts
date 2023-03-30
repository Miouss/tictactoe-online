import { Account } from "@database";

export function deleteAccount(
  username: string,
  password: string,
) {
  return Account.deleteOne({
    username,
    password,
  });
}
