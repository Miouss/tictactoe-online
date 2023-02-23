import { Player } from "@types";
import { Socket } from "socket.io-client";

export const joinLobby = (
  socket: Socket,
  currentPlayer: Player,
  lobbyIdJoining: string
) => {
  socket.emit("joinLobby", currentPlayer, lobbyIdJoining);
};
