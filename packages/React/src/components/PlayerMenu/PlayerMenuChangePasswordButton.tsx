import { fetchServer } from "../../utils";

interface Props {
  playerName: string;
}

export function PlayerMenuChangePasswordButton({ playerName }: Props) {
  const changePassword = async () => {
    const username = playerName;
    let password = prompt("Enter your current password");
    let newPassword = prompt("Enter your new password");

    const method = "PATCH";
    const headers = { "Content-Type": "application/json" };
    const credentials = "include" as RequestCredentials;
    const body = JSON.stringify({ username, password, newPassword });
    const url = "http://localhost:3001/api/account/password";
    const options = { method, headers, body, credentials };

    try {
      const data = await fetchServer(url, options);
      alert(data.message);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return <button onClick={changePassword}>Change Password</button>;
}
