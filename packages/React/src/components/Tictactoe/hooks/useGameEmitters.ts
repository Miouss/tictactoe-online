import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { isGameWin } from "../utils";
import { SquareState } from "../types";
import { SideSign } from "@types";

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
