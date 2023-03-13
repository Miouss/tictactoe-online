import { describe, it, expect, afterAll, beforeAll, vi } from "vitest";
import { createLobby } from "./createLobby";
import { initializeSocketConnection, io, stopServer } from "@server";
import { createPlayers, resolveWhenSignalEmitted } from "@utils";
import { Socket } from "socket.io";
import { Lobby } from "@database";

describe("createLobby", () => {
  let sockets: Socket[];

  const players = createPlayers("Miouss");

  beforeAll(async () => {
    sockets = await initializeSocketConnection(sockets, players);
  });

  afterAll(async () => {
    await stopServer();
  });

  it("should emit 'lobbyCreated' to the player after the lobby was created", async () => {
    vi.spyOn(Lobby, "create").mockResolvedValue({ id: "123" } as any);

    const hasSignalEmitted = await resolveWhenSignalEmitted(
      "createLobby",
      sockets[0],
      "lobbyCreated",
      players[0]
    );

    expect(hasSignalEmitted).toBe(true);
  });

  it("should throw an error if the lobby was not created", async () => {
    const err = "Lobby Not Created";

    vi.spyOn(Lobby, "create").mockRejectedValue(err);
    
    const spyError = vi.spyOn(console, "error");

    await createLobby(players[0]);


    expect(spyError).toHaveBeenCalledWith(err);
  });
});
