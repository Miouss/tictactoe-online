import { Dispatch, SetStateAction } from "react";
import { fetchServer } from "../../utils";
import { Container } from "./styles";
import { SideSign } from "@types";

interface Props {
  playerName: string;
  setPlayerName: Dispatch<SetStateAction<string>>;
  setPlayerSign: Dispatch<SetStateAction<SideSign | undefined>>;
  children?: React.ReactNode;
}

export function PlayerMenu({
  playerName,
  setPlayerName,
  setPlayerSign,
  children,
}: Props) {
  const logout = async () => {
    const method = "DELETE";
    const credentials = "include" as RequestCredentials;
    const url = "http://localhost:3001/api/login";
    const options = { method, credentials };

    try {
      const data = await fetchServer(url, options);
      setPlayerName("");
      setPlayerSign(undefined);
    } catch (err) {
      console.error(err);
    }
  };

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

  return (
    <Container>
      <label style={{ textAlign: "center" }}>{playerName}</label>
      {children}
      <button onClick={delAccount}>Delete Account</button>
      <button onClick={logout}>Disconnect</button>
    </Container>
  );
}
