import { declareWinner } from "./declareWinner";
import { makeMove } from "./makeMove";
import { replayGame } from "./replayGame";
import { io } from "@server";

export function handleGame() {
  io.on("connection", (socket) => {
    socket.on("makeMove", makeMove);
    socket.on("gameWin", declareWinner);
    socket.on("replayGame", replayGame);
  });
}
