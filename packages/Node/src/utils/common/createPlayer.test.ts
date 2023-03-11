import { createPlayer } from "./createPlayer";
import { describe, it, expect } from "vitest";

describe("createPlayer", () => {
  it("should create a player object", () => {
    const player = createPlayer("1", "Sonia");

    expect(player).toEqual({
      id: "1",
      name: "Sonia",
    });
  });
});
