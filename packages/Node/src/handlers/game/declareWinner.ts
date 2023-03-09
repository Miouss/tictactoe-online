import { Lobby } from "@database";
import { io } from "@server";
import { Player } from "@types";
import { getPlayerNotMatching } from "@utils";

export async function declareWinner(socketId: string) {
  try {
    const lobby = await Lobby.findOne()
      .where("players")
      .elemMatch({ id: socketId });
    if (!lobby) throw "Lobby not found";

    const players = lobby.players as Player[];
    const opponent = getPlayerNotMatching("id", socketId, players);
    io.to(socketId).emit("gameEnded", "win");
    io.to(opponent!.id).emit("gameEnded", "lose");
  } catch (e) {
    console.error(e);
  }
}
