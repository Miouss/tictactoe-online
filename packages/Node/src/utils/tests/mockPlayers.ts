import { Player } from "@types";

export function mockPlayers(...names: string[]): Player[] {
  return names.map((name, index) => createPlayer(name, `${index}`));
}

function createPlayer(name: string, id: string = ""): Player {
  return {
    name,
    id,
  };
}
