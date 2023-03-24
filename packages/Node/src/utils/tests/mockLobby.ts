import { Player } from "@types";

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
