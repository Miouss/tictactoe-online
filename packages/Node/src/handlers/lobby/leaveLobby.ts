import { io } from "@server";
import { Player } from "@types";
import { removePlayerFromLobby } from "@utils";

export async function leaveLobby(leavingPlayer: Player) {
  try {
    const lobby = await removePlayerFromLobby(leavingPlayer);

    const isLobbyEmpty = lobby.players.length === 0;

    if (isLobbyEmpty) {
      await lobby.delete();
      console.log("Lobby deleted");
    } else {
      const opponent = lobby.players[0] as Player;
      io.to(opponent.id).emit("opponentLeft", opponent);
    }

    io.to(leavingPlayer.id).emit("playerLeft");
  } catch (err) {
    console.error(err);
  }
}
