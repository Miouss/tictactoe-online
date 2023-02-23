import { Dispatch, SetStateAction } from "react";

export const copyLobbyId = (currentLobbyId: string, setHasCopiedLobbyId: Dispatch<SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(currentLobbyId);
    setHasCopiedLobbyId(true);
  };