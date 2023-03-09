import { io } from "@server";
import { LobbyDoc, Player } from "@types";

export async function handleNewLobbySize(lobby: LobbyDoc) {
  const isLobbyEmpty = lobby.players.length === 0;

  if (isLobbyEmpty) {
    await lobby.delete();
    console.log("Lobby deleted");
  } else {
    const opponent = lobby.players[0] as Player;
    io.to(opponent.id).emit("opponentLeft", opponent);
  }
}
