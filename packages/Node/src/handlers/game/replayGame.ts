import { Lobby } from "@database";
import { getPlayerNotMatching } from "@utils";
import { io } from "@server";
import { Player } from "@types";

export async function replayGame(socketId: string) {
  try {
    const lobby = await Lobby.findOne()
      .where("players")
      .elemMatch({ id: socketId });
    if (!lobby) throw "Lobby not found";

    const players = lobby.players as Player[];
    const opponent = getPlayerNotMatching("id", socketId, players);
    io.to(opponent!.id).emit("replayGame");
  } catch (e) {
    console.error(e);
  }
}
