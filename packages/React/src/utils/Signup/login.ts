import { Dispatch, SetStateAction } from "react";
import { fetchServer, getCredentials } from "../";

export async function login(
  event: React.FormEvent<HTMLFormElement>,
  setPlayerName: Dispatch<SetStateAction<string>>
) {
  event.preventDefault();

  const method = "POST";
  const headers = { "Content-Type": "application/json" };
  const credentials = "include" as RequestCredentials;

  const { username, password } = getCredentials(event);

  const body = JSON.stringify({
    username,
    password,
  });

  const url = "http://localhost:3001/api/account/login";
  const options = { method, headers, body, credentials };

  try {
    const data = await fetchServer(url, options);

    setPlayerName(username);
  } catch (error: any) {
    alert(`Error ${error.status}: ${error.message}`);
  }
}
