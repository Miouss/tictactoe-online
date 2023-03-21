import { Dispatch, SetStateAction, useEffect } from "react";
import { SideSign, GameIssue, SquareId, SquareState, ResetBoard } from "@types";
import { Socket } from "socket.io-client";
import { resetFields } from "../../utils";

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
