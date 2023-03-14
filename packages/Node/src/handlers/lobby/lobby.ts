import { io } from "@server";
import { createLobby } from "./createLobby";
import { joinLobby } from "./joinLobby";
import { leaveLobby } from "./leaveLobby";

export function handleLobby() {
  io.on("connection", (socket) => {
    socket.on("createddLobby", createLobby);
    socket.on("joinLobby", joinLobby);
    socket.on("leaveLobby", leaveLobby);
  });
}
