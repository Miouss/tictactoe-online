import { useState } from "react";
import { Tictactoe, Lobby, Signup } from "./components";
import { PlayerSign } from "@types";

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
