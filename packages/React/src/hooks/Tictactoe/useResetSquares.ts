import { Dispatch, SetStateAction, useEffect } from "react";
import { ResetBoard } from "@types";

export function useResetSquares(
  resetBoard: ResetBoard,
  setResetBoard: Dispatch<SetStateAction<ResetBoard>>
) {
  useEffect(() => {
    if (resetBoard === "pending") return;
    setResetBoard("pending");
  }, [resetBoard]);
}
