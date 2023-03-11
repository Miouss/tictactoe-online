import { joinLobby } from "./joinLobby";
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { Socket } from "socket.io";
import { startServer, getSocketConnection, stopServer } from "@server";
import { Lobby } from "@database";
import { createPlayer, wait } from "@utils";
import { Player } from "@types";

describe("joinLobby", () => {
  let sockets: Socket[];

  const players = createPlayers("Miouss", "Samir", "Sonia", "Miouss");

  beforeAll(async () => {
    startServer();

    sockets = await Promise.all(players.map(() => getSocketConnection()));

    players.forEach((player, index) => {
      player.id = sockets[index].id;
    });
  });

  afterAll(() => {
    stopServer();
  });

  it("should emit 'lobbyFull' to the joining player if the lobby joining is full", async () => {
    const joiningPlayer = players[2];
    const socket = sockets[2];
    const lobby = createLobby(players[0], players[1]);

    mockLobbyFindByIdReturnValue(lobby);

    const signalEmitted = await resolveWhenSignalEmitted(
      socket,
      "lobbyFull",
      joiningPlayer
    );

    expect(signalEmitted).toBe(true);
  });

  it("should emit 'playerAlreadyJoined' to the joining player if the player is already in the lobby", async () => {
    const joiningPlayer = players[0];
    const socket = sockets[0];
    const lobby = createLobby(players[0], players[1]);

    mockLobbyFindByIdReturnValue(lobby);

    const signalEmitted = await resolveWhenSignalEmitted(
      socket,
      "playerAlreadyJoined",
      joiningPlayer
    );

    expect(signalEmitted).toBe(true);
  });

  it("should emit 'playerNameTaken' to the joining player if the player name is already taken", async () => {
    const joiningPlayer = players[3];
    const socket = sockets[3];
    const lobby = createLobby(players[0]);

    mockLobbyFindByIdReturnValue(lobby);

    const signalEmitted = await resolveWhenSignalEmitted(
      socket,
      "playerNameTaken",
      joiningPlayer
    );

    expect(signalEmitted).toBe(true);
  });

  it("should emit 'playerJoined' to all players in the lobby", async () => {
    const joiningPlayer = players[1];
    const socket = sockets[1];
    const lobby = createLobby(players[0]);

    mockLobbyFindByIdReturnValue(lobby);

    const signalEmittedToAllPlayers = await Promise.all([
      resolveWhenSignalEmitted(socket, "playerJoined", joiningPlayer),
      resolveWhenSignalEmitted(sockets[0], "playerJoined", players[0]),
    ]);

    const hasSignalEmittedToAllPlayers = signalEmittedToAllPlayers.every(
      (signal) => signal === true
    );

    expect(hasSignalEmittedToAllPlayers).toBe(true);
  });

  it("should emit 'LobbyNotFound' to the joining player if the lobby is not found", async () => {
    const joiningPlayer = players[1];
    const socket = sockets[1];

    mockLobbyFindByIdReturnValue(null);

    const signalEmitted = await resolveWhenSignalEmitted(
      socket,
      "LobbyNotFound",
      joiningPlayer
    );

    expect(signalEmitted).toBe(true);
  });
});

// utils

function createPlayers(...names: string[]) {
  return names.map((name) => createPlayer(name));
}

function createLobby(...players: Player[]) {
  return {
    players,
    save() {
      return true;
    },
  };
}

function resolveWhenSignalEmitted(
  socket: Socket,
  signal: string,
  joiningPlayer: Player
) {
  return new Promise((resolve) => {
    socket.on(signal, () => {
      resolve(true);
    });

    joinLobby(joiningPlayer, "1");
    wait(1000).then(() => resolve(false));
  });
}

function mockLobbyFindByIdReturnValue(lobby: any) {
  vi.spyOn(Lobby, "findById").mockReturnValue(lobby as any);
}
