import { Socket } from "socket.io-client";
import { Player } from "@types";

export const createLobby = (socket: Socket, currentPlayer: Player) => {
  socket.emit("createLobby", currentPlayer);
};
