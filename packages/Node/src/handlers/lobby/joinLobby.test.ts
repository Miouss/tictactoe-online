import { joinLobby } from "./joinLobby";
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";

import { startServer, stopServer } from "@server";
import { Lobby } from "@database";
import { io } from "socket.io-client";

describe("joinLobby", () => {
  let socket: any;

  beforeAll(() => {
    startServer();
    socket = io("http://localhost:3001");
  });

  afterAll(() => {
    stopServer();
  });

  it("should emit 'lobbyFull' to the player who joined the lobby", async () => {
    const lobbyFull = {
      players: [
        {
          id: "1",
          name: "Miouss",
        },
        {
          id: "2",
          name: "Samir",
        },
      ],
    };

    vi.spyOn(Lobby, "findById").mockReturnValue(lobbyFull as any);

    const player = {
      id: socket.id,
      name: "Sonia",
    };

    let signalEmitted = false;

    socket.on("lobbyFull", () => {
      signalEmitted = true;
    });

    await joinLobby(player, "1");

    expect(signalEmitted).toBe(false);
  });
});
