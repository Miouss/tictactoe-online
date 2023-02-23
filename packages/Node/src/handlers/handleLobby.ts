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
    const players = await readLobbyFile(lobbyId);

    if (getPlayerBy("id", player.id, players))
      return io.to(player.id).emit("playerAlreadyJoined");
    if (getPlayerBy("name", player.name, players))
      return io.to(player.id).emit("playerNameTaken");

    players.push(player);

    updateLobbyFile(lobbyId, players);

    players.forEach((player: Player) => {
      io.to(player.id).emit("playerJoined", players, lobbyId);
    });
  } catch (e) {
    io.to(player.id).emit("LobbyNotFound");
  }
}

async function leaveLobby(currentPlayer: Player, lobbyId: string) {
  try {
    const players: Player[] = await readLobbyFile(lobbyId);
    const updatedPlayers = players.filter(
      (player) => player.id !== currentPlayer.id
    );

    const changeOwner = currentPlayer.id === lobbyId;
    updateLobbyFile(lobbyId, updatedPlayers, changeOwner);

    updatedPlayers.forEach((player: Player) => {
      io.to(player.id).emit("anotherPlayerLeft", updatedPlayers);
    });

    io.to(currentPlayer.id).emit("playerLeft", players);
  } catch (e) {
    console.log(e);
  }
}
