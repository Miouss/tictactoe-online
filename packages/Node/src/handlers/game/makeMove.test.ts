import { makeMove } from "./makeMove";
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { initializeSocketConnection, io, stopServer } from "@server";
import { mockLobby, mockPlayers, resolveWhenSignalEmitted } from "@utils";
import { Socket } from "socket.io";
import { MovePosition, Player } from "@types";
import { Lobby } from "@database";

describe("makeMove", () => {
  let sockets: Socket[] = [];
  const players: Player[] = mockPlayers("Miouss", "Samir");

  beforeAll(async () => {
    sockets = await initializeSocketConnection(sockets, players);
  });

  afterAll(async () => {
    await stopServer();
  });

  it("should emit 'moveMade' event to the player and opponent", async () => {
    const lobby = mockLobby(players[0], players[1]);

    vi.spyOn(Lobby, "findOne").mockReturnValue({
      where: () => ({
        elemMatch: () => Promise.resolve(lobby),
      }),
    } as any);

    const movePosition: MovePosition = 3;
    const currentPlayerId = players[0].id;
    const action = () => makeMove(movePosition, currentPlayerId);

    const expectedArgs = Array(2).fill([players[0].id, 3]);
    console.log(expectedArgs);

    const hasSignalEmitted = await resolveWhenSignalEmitted(
      action,
      sockets,
      "moveMade",
      ...expectedArgs
    );

    expect(hasSignalEmitted).toBe(true);
  });
});
