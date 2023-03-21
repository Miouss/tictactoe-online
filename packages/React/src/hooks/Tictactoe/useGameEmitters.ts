import { useEffect } from "react";
import { isGameWin } from "../../utils";
import { SquareState, SideSign } from "@types";
import { Socket } from "socket.io-client";

export function useGameEmitters(
  socket: Socket,
  squaresStates: SquareState[],
  playerSign: SideSign,
  canPlay: boolean
) {
  useEffect(() => {
    const hasWon = isGameWin(squaresStates, playerSign);

    if (hasWon) {
      socket.emit("gameWin", socket.id);
    }
  }, [canPlay]);
}
