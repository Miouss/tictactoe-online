import { Player } from "@types";

export function createPlayer(name: string, id: string = ""): Player {
  return {
    name,
    id,
  };
}
