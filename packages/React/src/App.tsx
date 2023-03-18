import { useEffect, useState } from "react";
import { Tictactoe, Lobby, Signup } from "./components";
import { PlayerSign } from "@types";
import { fetchServer } from "./utils";

export default function App() {
  const [playerName, setPlayerName] = useState("");
  const [playerSign, setPlayerSign] = useState<PlayerSign>();
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const isPlayerConnected = playerName !== "";

  const style = {
    display: "flex",
    flexDirection: "column" as "column",
    gap: "2rem",
  };

  useEffect(() => {
    const method = "POST";
    const credentials = "include" as RequestCredentials;
    const url = "http://localhost:3001/api/account/login/refresh";
    const options = { method, credentials };

    const test = async () => {
      try {
        const data = await fetchServer(url, options);
        const { username } = data;
        console.log(data);
        setPlayerName(username);
      } catch (err) {
        console.log(err);
      }
    };

    test();
  }, []);

  const logout = async () => {
    const method = "DELETE";
    const credentials = "include" as RequestCredentials;
    const url = "http://localhost:3001/api/account/login";
    const options = { method, credentials };

    try {
      const data = await fetchServer(url, options);
      setPlayerName("");
      setPlayerSign(undefined);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={style}>
      {isPlayerConnected ? (
        <>
          {hasGameStarted && <Tictactoe playerSign={playerSign} />}
          <Lobby playerName={playerName} setPlayerSign={setPlayerSign} setHasGameStarted={setHasGameStarted}/>
          <button onClick={logout}>Disconnect</button>
        </>
      ) : (
        <Signup setPlayerName={setPlayerName} />
      )}
    </div>
  );
}
