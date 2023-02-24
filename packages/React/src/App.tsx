import { Tictactoe, Lobby } from "./components";
import { PlayerSideProvider } from "./hooks";

export default function App() {
  const style = {
    display: "flex",
    flexDirection: "column" as "column",
    gap: "2rem",
  };
  return (
    <div style={style}>
      <PlayerSideProvider>
        <Tictactoe />
        <Lobby />
      </PlayerSideProvider>
    </div>
  );
}
