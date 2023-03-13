import { joinLobby } from "./joinLobby";
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { Socket } from "socket.io";
import { initializeSocketConnection, stopServer } from "@server";
import { Lobby } from "@database";
import { createLobby, createPlayers, resolveWhenSignalEmitted } from "@utils";

describe("joinLobby", () => {
  let sockets: Socket[];

  const players = createPlayers("Miouss", "Samir", "Sonia", "Miouss");

  beforeAll(async () => {
    sockets = await initializeSocketConnection(sockets, players);
  });

  afterAll(async () => {
    await stopServer();
  });

  it("should emit 'lobbyFull' to the joining player if the lobby joining is full", async () => {
    const joiningPlayer = players[2];
    const socket = sockets[2];
    const lobby = createLobby(players[0], players[1]);

    mockLobbyFindByIdReturnValue(lobby);

    const signalEmitted = await resolveWhenSignalEmitted(
      joinLobby,
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
      joinLobby,
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
      joinLobby,
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

    const hasSignalEmittedToAllPlayers = await resolveWhenSignalEmitted(
      joinLobby,
      [socket, sockets[0]],
      "playerJoined",
      joiningPlayer
    );

    expect(hasSignalEmittedToAllPlayers).toBe(true);
  });

  it("should emit 'LobbyNotFound' to the joining player if the lobby is not found", async () => {
    const joiningPlayer = players[1];
    const socket = sockets[1];

    mockLobbyFindByIdReturnValue(null);

    const signalEmitted = await resolveWhenSignalEmitted(
      joinLobby,
      socket,
      "LobbyNotFound",
      joiningPlayer
    );

    expect(signalEmitted).toBe(true);
  });
});

// utils

function mockLobbyFindByIdReturnValue(lobby: any) {
  vi.spyOn(Lobby, "findById").mockReturnValue(lobby as any);
}
