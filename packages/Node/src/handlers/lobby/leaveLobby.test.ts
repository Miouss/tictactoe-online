import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { Socket } from "socket.io";
import { Player } from "@types";
import { mockLobby, mockPlayers, resolveWhenSignalEmitted } from "@utils";
import { initializeSockets, stopServer } from "@server";
import { Lobby } from "@database";
import { leaveLobby } from "@handlers";

describe("leaveLobby", () => {
  let sockets: Socket[];

  const players = mockPlayers("Miouss", "Samir", "Sonia", "Miouss");

  beforeAll(async () => {
    sockets = await initializeSockets(sockets, players);
  });

  afterAll(async () => {
    await stopServer();
  });

  it("should emit 'playerLeft' to the leaving player", async () => {
    const lobby = mockLobby(players[0]);
    const leavingPlayer = players[0];
    const socket = sockets[0];

    mockLobbyfindByIdAndUpdateReturnValue(lobby, leavingPlayer);

    const hasSignalEmitted = await resolveWhenSignalEmitted(
      () => leaveLobby(leavingPlayer, lobby.id),
      socket,
      "playerLeft",
    );

    expect(hasSignalEmitted).toBe(true);
  });

  it("should delete the lobby if the leaving player is the last player in the lobby before leaving", async () => {
    const lobby = mockLobby(players[0]);
    const leavingPlayer = players[0];
    const socket = sockets[0];

    mockLobbyfindByIdAndUpdateReturnValue(lobby, leavingPlayer);

    const hasSignalEmitted = await resolveWhenSignalEmitted(
      () => leaveLobby(leavingPlayer, lobby.id),
      socket,
      "playerLeft",
    );

    expect(hasSignalEmitted).toBe(true);
  });

  it("should emit 'opponentLeft' to the opponent if the leavingPlayer is not the last player in the lobby before leaving", async () => {
    const lobby = mockLobby(players[0], players[1]);
    const leavingPlayer = players[0];

    const opponentSocket = sockets[1];

    mockLobbyfindByIdAndUpdateReturnValue(lobby, leavingPlayer);

    const hasSignalEmitted = await resolveWhenSignalEmitted(
      () => leaveLobby(leavingPlayer, lobby.id),
      opponentSocket,
      "opponentLeft"
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
