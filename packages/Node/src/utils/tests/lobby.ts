import { Player } from "@types";
import { createPlayer, wait } from "@utils";
import { Socket } from "socket.io";

export function resolveWhenSignalEmitted(
  lobbyFct: Function,
  socket: Socket,
  signal: string,
  player: Player
) {
  return new Promise((resolve) => {
    socket.on(signal, () => {
      resolve(true);
    });

    lobbyFct(player, "1");
    wait(1000).then(() => resolve(false));
  });
}

export function createPlayers(...names: string[]) {
  return names.map((name) => createPlayer(name));
}

export function createLobby(...players: Player[]) {
  return {
    players,
    save() {
      return true;
    },
    delete() {
      return true;
    },
  };
}
