import { Socket } from "socket.io-client";
import { Dispatch, SetStateAction } from "react";
import { resetFields } from "./resetFields";
import { SquareState, GameIssue, ResetBoard } from "@types";

export function replayGame(
  socket: Socket,
  setSquaresStates: Dispatch<SetStateAction<Array<SquareState>>>,
  setGameIssue: Dispatch<SetStateAction<GameIssue>>,
  setResetSquares: Dispatch<SetStateAction<ResetBoard>>
) {
  resetFields(setSquaresStates, setGameIssue, setResetSquares);
  socket.emit("replayGame", socket.id);
}
