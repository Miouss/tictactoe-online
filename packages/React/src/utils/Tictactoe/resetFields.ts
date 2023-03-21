import { SquareState, GameIssue, ResetSquares } from "@types";
import { Dispatch, SetStateAction } from "react";

export function resetFields(
  setSquaresStates: Dispatch<SetStateAction<Array<SquareState>>>,
  setGameIssue: Dispatch<SetStateAction<GameIssue>>,
  setResetSquares: Dispatch<SetStateAction<ResetSquares>>
) {
  setSquaresStates(Array(9).fill(null));
  setGameIssue("running");
  setResetSquares(true);
}
