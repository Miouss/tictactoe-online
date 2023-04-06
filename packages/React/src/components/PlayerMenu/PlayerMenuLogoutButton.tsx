import { SideSign } from "@types";
import { Dispatch, SetStateAction } from "react";
import { fetchServer } from "../../utils";

interface Props {
  setPlayerName: Dispatch<SetStateAction<string>>;
  setPlayerSign: Dispatch<SetStateAction<SideSign | undefined>>;
}

export function PlayerMenuLogoutButton({
  setPlayerName,
  setPlayerSign,
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

  return <button onClick={logout}>Disconnect</button>;
}
