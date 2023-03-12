import { Player } from "@types";
import { createPlayer, wait } from "@utils";
import { Socket } from "socket.io";

export function resolveWhenSignalEmitted(
  lobbyFct: Function,
  sockets: Socket | Socket[],
  signal: string,
  player: Player
) {
  return new Promise((resolve) => {
    const socketsList = Array.isArray(sockets) ? sockets : [sockets];

    Promise.all(
      socketsList.map((socket) => listenToSignal(signal, socket))
    ).then(() => resolve(true));

    lobbyFct(player, "1");
    wait(1000).then(() => resolve(false));
  });
}

export function listenToSignal(signal: string, socket: Socket) {
  return new Promise((resolve) => {
    socket.on(signal, () => {
      resolve(true);
    });
  });
}

export function createPlayers(...names: string[]) {
  return names.map((name) => createPlayer(name));
}

export function createLobby(...players: Player[]) {
  return {
    players,
    save() {
      return new Promise((resolve) => resolve(true));
    },
    delete() {
      return new Promise((resolve) => resolve(true));
    },
  };
}
