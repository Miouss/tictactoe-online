import { createPlayer } from "./createPlayer";
import { describe, it, expect } from "vitest";

describe("createPlayer", () => {
  it("should create a player object", () => {
    const player = createPlayer("Sonia", "1");

    expect(player).toEqual({
      name: "Sonia",
      id: "1",
    });
  });

  it("should create a player object with a empty id", () => {
    const player = createPlayer("Sonia");

    expect(player).toEqual({
      name: "Sonia",
      id: "",
    });
  });
});
