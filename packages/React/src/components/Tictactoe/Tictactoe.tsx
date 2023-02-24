import { TicTacToe } from "../../styles";
import { TictactoeBoard as Board } from "./TictactoeBoard";
import { usePlayerSide } from "../../hooks";

export function Tictactoe() {
  const { playerSide } = usePlayerSide();
  const isGameStarted = playerSide !== undefined;

  if (!isGameStarted) return null;

  return (
    <TicTacToe>
      <Board />
    </TicTacToe>
  );
}
