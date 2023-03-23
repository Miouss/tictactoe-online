import { Dispatch, SetStateAction, useEffect } from "react";
import { Socket } from "socket.io-client";
import { resetFields } from "../utils";
import { GameIssue, ResetBoard, SquareId, SquareState } from "../types";
import { SideSign } from "@types";

export function useGameListeners(
  socket: Socket,
  playerSign: SideSign,
  opponentSign: SideSign,
  setCanPlay: Dispatch<SetStateAction<boolean>>,
  setSquaresStates: Dispatch<SetStateAction<SquareState[]>>,
  setGameIssue: Dispatch<SetStateAction<GameIssue>>,
  setResetBoard: Dispatch<SetStateAction<ResetBoard>>
) {
  useEffect(() => {
    socket.on("replayGame", () =>
      resetFields(setSquaresStates, setGameIssue, setResetBoard)
    );

    socket.on("moveMade", (socketId: string, squareId: SquareId) => {
      const isMoveMadeByOpponent = socket.id !== socketId;
      if (isMoveMadeByOpponent) {
        setCanPlay(true);
        setSquaresStates((previousStates) => {
          const newSquaresStates = previousStates;
          newSquaresStates[squareId] = opponentSign;
          return newSquaresStates;
        });
      } else {
        setCanPlay(false);
        setSquaresStates((previousStates) => {
          const newSquaresStates = previousStates;
          newSquaresStates[squareId] = playerSign;
          return newSquaresStates;
        });
      }
    });

    socket.on("gameEnded", (gameIssue: GameIssue) => {
      setGameIssue(gameIssue);
    });
  }, []);
}
