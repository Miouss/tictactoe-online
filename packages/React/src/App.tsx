import { useEffect, useState } from "react";
import { Tictactoe, Lobby, Signup } from "./components";
import { PlayerSign } from "@types";
import { fetchServer } from "./utils";

export default function App() {
  const [playerName, setPlayerName] = useState("");
  const [playerSign, setPlayerSign] = useState<PlayerSign>();

  const isPlayerConnected = playerName !== "";
  const isGameStarted = playerSign !== undefined;

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

  return (
    <div style={style}>
      {isPlayerConnected ? (
        <>
          {isGameStarted && <Tictactoe playerSign={playerSign} />}
          <Lobby playerName={playerName} setPlayerSign={setPlayerSign} />
        </>
      ) : (
        <Signup setPlayerName={setPlayerName} />
      )}
    </div>
  );
}
