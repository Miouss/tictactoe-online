import { getCredentials, fetchServer } from "../";

export async function createAccount(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const method = "POST";
  const headers = { "Content-Type": "application/json" };

  const { username, password, email } = getCredentials(event);

  const body = JSON.stringify({
    username,
    password,
    email,
  });

  const url = "http://localhost:3001/api/account";
  const options = { method, headers, body };

  try {
    const data = await fetchServer(url, options);
    console.log(data);
    alert(`Account created for ${username} !`);
  } catch (error: any) {
    alert(`Error ${error.status}: ${error.message}`);
  }
}
