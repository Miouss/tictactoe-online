import { useEffect, useState } from "react";
import { Tictactoe, Lobby, Signup, PlayerMenu } from "./components";
import { SideSign } from "@types";
import { fetchServer } from "./utils";

export default function App() {
  const [playerName, setPlayerName] = useState("");
  const [playerSign, setPlayerSign] = useState<SideSign>();
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
    const url = "http://localhost:3001/api/login/refresh";
    const options = { method, credentials };

    const reconnect = async () => {
      try {
        const data = await fetchServer(url, options);
        const { username } = data;
        console.log("reconnected");
        setPlayerName(username);
      } catch (err) {
        console.log("not reconnected");
        console.log(err);
      }
    };

    reconnect();
  }, []);

  return (
    <div style={style}>
      {isPlayerConnected ? (
        <>
          {hasGameStarted && <Tictactoe playerSign={playerSign} />}
          <PlayerMenu
            playerName={playerName}
            setPlayerName={setPlayerName}
            setPlayerSign={setPlayerSign}
          >
            <Lobby
              playerName={playerName}
              setPlayerSign={setPlayerSign}
              setHasGameStarted={setHasGameStarted}
            />
          </PlayerMenu>
        </>
      ) : (
        <Signup setPlayerName={setPlayerName} />
      )}
    </div>
  );
}
