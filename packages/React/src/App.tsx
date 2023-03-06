import { useState } from "react";
import { Tictactoe, Lobby, Signup } from "./components";
import { PlayerSign } from '@types';

export default function App() {
  const [playerSign, setPlayerSign] = useState<PlayerSign | undefined>(undefined);
  const style = {
    display: "flex",
    flexDirection: "column" as "column",
    gap: "2rem",
  };
  return (
    <div style={style}>
      <Signup />
       {/*  {playerSign && <Tictactoe playerSign={playerSign} />}
        <Lobby setPlayerSign={setPlayerSign} /> */}
    </div>
  );
}
