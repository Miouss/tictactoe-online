import { Player } from "@types";
import { createPlayer } from "@utils";

export function mockPlayers(...names: string[]): Player[] {
  return names.map((name, index) => createPlayer(name, `${index}`));
}

export function mockLobby(...players: Player[]) {
  return {
    _id: "123",
    players,
    save() {
      return Promise.resolve;
    },
    delete() {
      return Promise.resolve;
    },
  };
}
