import { Dispatch, SetStateAction } from "react";
import { fetchServer } from "../../utils";
import { SideSign } from "@types";

interface Props {
  playerName: string;
  setPlayerName: Dispatch<SetStateAction<string>>;
  setPlayerSign: Dispatch<SetStateAction<SideSign | undefined>>;
}

export function PlayerMenuDelAccountButton({
  playerName,
  setPlayerName,
  setPlayerSign,
}: Props) {
  const delAccount = async () => {
    const username = playerName;
    let password = prompt("Enter your password to delete your account");

    const method = "DELETE";
    const headers = { "Content-Type": "application/json" };
    const credentials = "include" as RequestCredentials;
    const body = JSON.stringify({ username, password });
    const url = "http://localhost:3001/api/account";
    const options = { method, headers, body, credentials };

    try {
      const data = await fetchServer(url, options);
      setPlayerName("");
      setPlayerSign(undefined);
      alert(data.message);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return <button onClick={delAccount}>Delete Account</button>;
}
