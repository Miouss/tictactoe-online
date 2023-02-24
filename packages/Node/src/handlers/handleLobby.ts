import { io } from "../server";
import {
  getPlayerBy,
  createLobbyFile,
  readLobbyFile,
  updateLobbyFile,
} from "@utils";

import { Player } from "@types";

export function handleLobby() {
  io.on("connection", (socket) => {
    socket.on("createLobby", createLobby);
    socket.on("joinLobby", joinLobby);
    socket.on("leaveLobby", leaveLobby);
  });
}

async function createLobby(player: Player) {
  try {
    await readLobbyFile(player.id);
    io.to(player.id).emit("lobbyAlreadyExists");
  } catch (e) {
    console.log("Lobby not found, creating new lobby");
    await createLobbyFile(player);
    io.to(player.id).emit("lobbyCreated", player);
  }
}

async function joinLobby(player: Player, lobbyId: string) {
  try {
    const playersInLobby = await readLobbyFile(lobbyId);

    const isLobbyFull = playersInLobby.length >= 2;
    if (isLobbyFull) return io.to(player.id).emit("lobbyFull");

    const isPlayerAlreadyInLobby = getPlayerBy("id", player.id, playersInLobby);
    if (isPlayerAlreadyInLobby)
      return io.to(player.id).emit("playerAlreadyJoined");

    const isPlayerNameTaken = getPlayerBy("name", player.name, playersInLobby);
    if (isPlayerNameTaken) return io.to(player.id).emit("playerNameTaken");

    playersInLobby.push(player);

    updateLobbyFile(lobbyId, playersInLobby);

    playersInLobby.forEach((player: Player) => {
      io.to(player.id).emit("playerJoined", playersInLobby, lobbyId);
    });
  } catch (e) {
    io.to(player.id).emit("LobbyNotFound");
  }
}

async function leaveLobby(currentPlayer: Player, lobbyId: string) {
  try {
    const playersInLobby: Player[] = await readLobbyFile(lobbyId);
    const updatedPlayers = playersInLobby.filter(
      (player) => player.id !== currentPlayer.id
    );

    const changeOwner = currentPlayer.id === lobbyId;
    updateLobbyFile(lobbyId, updatedPlayers, changeOwner);

    updatedPlayers.forEach((player: Player) => {
      io.to(player.id).emit("anotherPlayerLeft", updatedPlayers);
    });

    io.to(currentPlayer.id).emit("playerLeft", playersInLobby);
  } catch (e) {
    console.log(e);
  }
}
