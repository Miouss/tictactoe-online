import { MovePosition, Player } from "@types";
import { io } from "@server";
import { Lobby } from "@database";

export async function makeMove(movePosition: MovePosition, currentPlayerId: string) {
  try {
    const lobby = await Lobby.findOne()
      .where("players")
      .elemMatch({ id: currentPlayerId });
    if (!lobby) throw "Lobby not found";

    const players = lobby.players as Player[];
    players.forEach((player) => {
      io.to(player.id).emit("moveMade", currentPlayerId, movePosition);
    });
  } catch (e) {
    console.error(e);
  }
}
