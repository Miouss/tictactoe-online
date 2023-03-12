import { leaveLobby } from "./leaveLobby";
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { Socket } from "socket.io";

import { Player } from "@types";
import { createLobby, createPlayers, resolveWhenSignalEmitted } from "@utils";
import { initializeSocketConnection, startServer } from "@server";
import { Lobby } from "@database";

describe("leaveLobby", () => {
  let sockets: Socket[];

  const players = createPlayers("Miouss", "Samir", "Sonia", "Miouss");

  beforeAll(async () => {
    const port = "3003";
    startServer(port);
    sockets = await initializeSocketConnection(sockets, players, port);
  });

  afterAll(() => {
    sockets.forEach((socket) => socket.disconnect());
  });

  it("should emit 'playerLeft' to the leaving player", async () => {
    const lobby = createLobby(players[0]);
    const leavingPlayer = players[0];
    const socket = sockets[0];

    mockLobbyfindByIdAndUpdateReturnValue(lobby, leavingPlayer);

    const hasSignalEmitted = await resolveWhenSignalEmitted(
      leaveLobby,
      socket,
      "playerLeft",
      leavingPlayer
    );

    expect(hasSignalEmitted).toBe(true);
  });

  it("should delete the lobby if the leaving player is the last player in the lobby before leaving", async () => {
    const lobby = createLobby(players[0]);
    const leavingPlayer = players[0];
    const socket = sockets[0];

    mockLobbyfindByIdAndUpdateReturnValue(lobby, leavingPlayer);

    const hasSignalEmitted = await resolveWhenSignalEmitted(
      leaveLobby,
      socket,
      "playerLeft",
      leavingPlayer
    );

    expect(hasSignalEmitted).toBe(true);
  });

  it("should emit 'opponentLeft' to the opponent if the leavingPlayer is not the last player in the lobby before leaving", async () => {
    const lobby = createLobby(players[0], players[1]);
    const leavingPlayer = players[0];

    const opponentSocket = sockets[1];
    const opponentPlayer = players[1];

    mockLobbyfindByIdAndUpdateReturnValue(lobby, leavingPlayer);

    const hasSignalEmitted = await resolveWhenSignalEmitted(
      leaveLobby,
      opponentSocket,
      "opponentLeft",
      opponentPlayer
    );

    expect(hasSignalEmitted).toBe(true);
  });
});

// utils

function mockLobbyfindByIdAndUpdateReturnValue(
  lobby: any,
  leavingPlayer: Player
) {
  const newLobby = {
    ...lobby,
    players: lobby.players.filter((player: Player) => player !== leavingPlayer),
  };

  vi.spyOn(Lobby, "findByIdAndUpdate").mockReturnValue(newLobby);
}
