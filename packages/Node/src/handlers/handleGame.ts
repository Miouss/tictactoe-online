import { Player } from "@types";
import { io } from "../server";
import { Lobby } from "../database";
import { getPlayerNotMatching } from "@utils";

type MovePosition = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export function handleGame() {
  io.on("connection", (socket) => {
    socket.on("makeMove", makeMove);
    socket.on("gameWin", declareWinner);
  });
}

async function makeMove(movePosition: MovePosition, currentPlayerId: string) {
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
    console.log(e);
  }
}

async function declareWinner(socketId: string) {
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
    console.log(e);
  }
}
