import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";
import { Player } from "@types";

export const leaveLobby = async (
  socket: Socket,
  currentPlayer: Player,
  currentLobbyId: string,
  setPlayers: Dispatch<SetStateAction<Player[]>>,
  setCurrentLobbyId: Dispatch<SetStateAction<string>>,
  setPlayerSide: Dispatch<SetStateAction<"X" | "O" | undefined>>
) => {
  await new Promise((res) => {
    socket.emit("leaveLobby", currentPlayer, currentLobbyId);
    socket.on("playerLeft", () => {
      setPlayers([]);
      setCurrentLobbyId("");
      setPlayerSide(undefined);
      res;
    });
  });
};
