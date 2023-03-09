import { io } from "@server";
import { Player } from "@types";
import { handleNewLobbySize } from "./handleNewLobbySize";
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
