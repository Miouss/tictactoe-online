import { getPlayerNotMatching } from "./getPlayerNotMatching";
import { describe, it, expect } from "vitest";

describe("getPlayerNotMatching", () => {
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

  it("should return player with name Miouss because his id is different than '1'", () => {
    const player = getPlayerNotMatching("id", "2", players);
    expect(player).toEqual(players[0]);
  });

  it("should return player with name Samir because his name is different than 'Miouss'", () => {
    const player = getPlayerNotMatching("name", "Miouss", players);
    expect(player).toEqual(players[1]);
  });

  it("should return player with name Miouss because no player with the id '3' exists", () => {
    const player = getPlayerNotMatching("id", "3", players);
    expect(player).toEqual(players[0]);
  });
});
