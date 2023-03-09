import { getPlayerBy } from "./getPlayerBy";
import { describe, it, expect } from "vitest";

describe("getPlayerBy", () => {
  const players = [
    {
      id: "1",
      name: "Miouss",
    },
    {
      id: "2",
      name: "Samir",
    },
  ];

  it("should return player with id '1' if the id exists", () => {
    const player = getPlayerBy("id", "1", players);
    expect(player).toEqual(players[0]);
  });

  it("should return player with name Miouss if the name exists", () => {
    const player = getPlayerBy("name", "Samir", players);
    expect(player).toEqual(players[1]);
  });

  it("should return undefined if player with the id 'Miouss' doesn't exist ", () => {
    const player = getPlayerBy("id", "Miouss", players);
    expect(player).toBeUndefined();
  });

  it("should return undefined if no player with the name '1' doesn't exist", () => {
    const player = getPlayerBy("name", "1", players);
    expect(player).toBeUndefined();
  });
});
