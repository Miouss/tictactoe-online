import { Dispatch, SetStateAction } from "react";
import { SquareState, GameIssue, ResetBoard } from "../types";

export function resetFields(
  setSquaresStates: Dispatch<SetStateAction<Array<SquareState>>>,
  setGameIssue: Dispatch<SetStateAction<GameIssue>>,
  setResetSquares: Dispatch<SetStateAction<ResetBoard>>
) {
  setSquaresStates(Array(9).fill(null));
  setGameIssue("running");
  setResetSquares(true);
}
