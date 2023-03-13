import { Socket } from "socket.io";
import { createLobby, joinLobby, leaveLobby } from "@handlers";
import { Player } from "@types";
import { createPlayer, wait } from "@utils";

export function resolveWhenSignalEmitted(
  action: "createLobby" | "joinLobby" | "leaveLobby",
  sockets: Socket | Socket[],
  signal: string,
  player: Player
) {
  return new Promise((resolve) => {
    const socketsList = Array.isArray(sockets) ? sockets : [sockets];

    Promise.all(
      socketsList.map((socket) => listenToSignal(signal, socket))
    ).then(() => resolve(true));

    switch (action) {
      case "createLobby":
        createLobby(player);
        break;
      case "joinLobby":
        joinLobby(player, "1");
        break;
      case "leaveLobby":
        leaveLobby(player, "1");
        break;
    }

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

export function createMockLobby(...players: Player[]) {
  return {
    players,
    save() {
      return Promise.resolve;
    },
    delete() {
      return Promise.resolve;
    },
  };
}
