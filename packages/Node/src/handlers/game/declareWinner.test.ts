import { declareWinner } from "./declareWinner";
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { initializeSocketConnection, io, stopServer } from "@server";
import { Player } from "@types";
import { mockPlayers, mockLobby, resolveWhenSignalEmitted } from "@utils";
import { Socket } from "socket.io";
import { Lobby } from "@database";

describe("declareWinner", () => {
  let sockets: Socket[] = [];

  const players: Player[] = mockPlayers("Miouss", "Samir");

  beforeAll(async () => {
    sockets = await initializeSocketConnection(sockets, players);
  });

  afterAll(async () => {
    await stopServer();
  });

  let action, signal, expectedArgs;

  it("should emit 'gameEnded' event with 'win' arg to the winner and 'lose' arg to the loser", async () => {
    const lobby = mockLobby(players[0], players[1]);

    vi.spyOn(Lobby, "findOne").mockReturnValue({
      where: () => ({
        elemMatch: () => Promise.resolve(lobby),
      }),
    } as any);

    action = () => declareWinner(players[0].id);
    signal = "gameEnded";
    expectedArgs = ["win", "lose"];

    const hasSignalEmitted = await resolveWhenSignalEmitted(
      action,
      sockets,
      signal,
      ...expectedArgs
    );

    expect(hasSignalEmitted).toBe(true);
  });
});
