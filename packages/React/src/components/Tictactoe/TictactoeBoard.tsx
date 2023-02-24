import { TictactoeBoardSquare as Square } from "./TictactoeBoardSquare";
import { Board } from "../../styles";

export function TictactoeBoard() {
  const board = Array(9)
    .fill(null)
    .map((_, i) => {
      return <Square key={`square${i}`} />;
    });

  return <Board>{board}</Board>;
}
