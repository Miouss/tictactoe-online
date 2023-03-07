import { io } from "../server";
import { getPlayerBy } from "@utils";
import { LobbyDoc, Player } from "@types";
import { Lobby } from "../database";

export function handleLobby() {
  io.on("connection", (socket) => {
    socket.on("createLobby", createLobby);
    socket.on("joinLobby", joinLobby);
    socket.on("leaveLobby", leaveLobby);
  });
}

async function createLobby(player: Player) {
  try {
    const { id } = await Lobby.create({ players: player });
    console.log("Lobby created");

    io.to(player.id).emit("lobbyCreated", player, id);
  } catch (e) {
    console.log(e);
  }
}

async function joinLobby(joiningPlayer: Player, lobbyId: string) {
  try {
    const lobby = await Lobby.findById(lobbyId);
    if (!lobby) throw "Lobby not found";
    const players = lobby.players as Player[];

    const isLobbyFull = players.length === 2;
    if (isLobbyFull) return io.to(joiningPlayer.id).emit("lobbyFull");

    const isPlayerAlreadyInLobby = getPlayerBy("id", joiningPlayer.id, players);
    if (isPlayerAlreadyInLobby)
      return io.to(joiningPlayer.id).emit("playerAlreadyJoined");

    const isPlayerNameTaken = getPlayerBy("name", joiningPlayer.name, players);
    if (isPlayerNameTaken)
      return io.to(joiningPlayer.id).emit("playerNameTaken");

    lobby.players.push(joiningPlayer);
    await lobby.save();
    console.log("Player added to lobby");

    players.forEach((player: Player, index) => {
      io.to(player.id).emit("playerJoined", players, lobbyId, index as 0 | 1);
    });
  } catch (e) {
    io.to(joiningPlayer.id).emit("LobbyNotFound");
  }
}

async function leaveLobby(currentPlayer: Player, lobbyId: string) {
  try {
    const lobby = await removePlayerFromLobby(currentPlayer, lobbyId);

    await handleNewLobbySize(lobby);

    io.to(currentPlayer.id).emit("playerLeft");
  } catch (e) {
    console.error(e);
  }
}

async function handleNewLobbySize(lobby: LobbyDoc) {
  const isLobbyEmpty = lobby.players.length === 0;

  if (isLobbyEmpty) {
    await lobby.delete();
    console.log("Lobby deleted");
  } else {
    const opponent = lobby.players[0] as Player;
    io.to(opponent.id).emit("opponentLeft", opponent);
  }
}

async function removePlayerFromLobby(currentPlayer: Player, lobbyId: string) {
  const filter = { _id: lobbyId };
  const update = { $pull: { players: currentPlayer } };
  const options = { new: true };

  const lobby = await Lobby.findByIdAndUpdate(filter, update, options);
  if (!lobby) throw "Lobby not found";

  console.log("Player removed from lobby");

  return lobby;
}
