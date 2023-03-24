import { Player } from "@types";

export function getPlayerBy(
  key: "id" | "name",
  value: String,
  players: Player[]
) {
  return players.find((player) => player[key] === value);
}
