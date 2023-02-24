import { TicTacToe } from "../../styles";
import { TictactoeBoard as Board } from "./TictactoeBoard";
import { PlayerSide } from "@types";

interface Props {
  playerSide: PlayerSide | undefined;
}
export function Tictactoe({ playerSide }: Props) {
  const isGameStarted = playerSide !== undefined;

  if (!isGameStarted) return null;

  return (
    <TicTacToe>
      <Board playerSide={playerSide} />
    </TicTacToe>
  );
}
