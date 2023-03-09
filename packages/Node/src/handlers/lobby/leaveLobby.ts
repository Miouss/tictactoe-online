import { io } from "@server";
import { LobbyDoc, Player } from "@types";
import { removePlayerFromLobby } from "./removePlayerFromLobby";

export async function leaveLobby(currentPlayer: Player, lobbyId: string) {
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
