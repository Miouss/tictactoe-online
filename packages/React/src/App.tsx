import { useState } from "react";
import { Tictactoe, Lobby } from "./components";
import { PlayerSide } from '@types';

export default function App() {
  const [playerSide, setPlayerSide] = useState<PlayerSide | undefined>(undefined);
  const style = {
    display: "flex",
    flexDirection: "column" as "column",
    gap: "2rem",
  };
  return (
    <div style={style}>
        <Tictactoe playerSide={playerSide} />
        <Lobby setPlayerSide={setPlayerSide} />
    </div>
  );
}
