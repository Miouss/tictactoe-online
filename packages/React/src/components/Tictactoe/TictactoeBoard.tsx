import { TictactoeBoardSquare as Square } from "./TictactoeBoardSquare";
import { Board } from "../../styles";
import { PlayerSide } from "@types";

interface Props {
  playerSide: PlayerSide | undefined;
}

export function TictactoeBoard({ playerSide }: Props) {
  const board = Array(9)
    .fill(null)
    .map((_, i) => {
      return <Square key={`square${i}`} playerSide={playerSide} />;
    });

  return <Board>{board}</Board>;
}
