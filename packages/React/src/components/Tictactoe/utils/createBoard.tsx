import { SquareId } from "../types";
import { SideSign } from "@types";

export function createBoard(playerSign: SideSign, Square: any) {
  return Array(9)
    .fill(null)
    .map((_, i) => {
      return (
        <Square
          key={`square${i}`}
          playerSign={playerSign}
          squareId={i as SquareId}
        />
      );
    });
}
