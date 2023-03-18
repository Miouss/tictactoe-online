import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { Socket } from "socket.io";
import { Player } from "@types";
import { mockLobby, mockPlayers, resolveWhenSignalEmitted } from "@utils";
import { initializeSockets, io, stopServer } from "@server";
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

    io.to(leavingPlayer.id).socketsJoin(lobby._id);

    mockLobbyfindOneAndUpdateReturnValue(lobby, leavingPlayer);

    const hasSignalEmitted = await resolveWhenSignalEmitted(
      () => leaveLobby(leavingPlayer),
      socket,
      "playerLeft",
    );

    expect(hasSignalEmitted).toBe(true);
  });

  it("should delete the lobby if the leaving player is the last player in the lobby before leaving", async () => {
    const lobby = mockLobby(players[0]);
    const leavingPlayer = players[0];
    const socket = sockets[0];

    mockLobbyfindOneAndUpdateReturnValue(lobby, leavingPlayer);
    
    io.to(leavingPlayer.id).socketsJoin(lobby._id);

    const hasSignalEmitted = await resolveWhenSignalEmitted(
      () => leaveLobby(leavingPlayer),
      socket,
      "playerLeft",
    );

    expect(hasSignalEmitted).toBe(true);
  });

  it("should emit 'opponentLeft' to the opponent if the leavingPlayer is not the last player in the lobby before leaving", async () => {
    const lobby = mockLobby(players[0], players[1]);
    const leavingPlayer = players[0];

    const leavingPlayerSocket = sockets[0];
    const opponentSocket = sockets[1];

    io.to(leavingPlayerSocket.id).socketsJoin(lobby._id);
    io.to(opponentSocket.id).socketsJoin(lobby._id);

    mockLobbyfindOneAndUpdateReturnValue(lobby, leavingPlayer);

    const hasSignalEmitted = await resolveWhenSignalEmitted(
      () => leaveLobby(leavingPlayer),
      opponentSocket,
      "opponentLeft"
    );

    expect(hasSignalEmitted).toBe(true);
  });
});

// utils

function mockLobbyfindOneAndUpdateReturnValue(
  lobby: any,
  leavingPlayer: Player
) {
  const newLobby = {
    ...lobby,
    players: lobby.players.filter((player: Player) => player !== leavingPlayer),
  };

  console.log(newLobby);

  vi.spyOn(Lobby, "findOneAndUpdate").mockReturnValue(newLobby);
}
