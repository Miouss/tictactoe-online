import jsonfile from "jsonfile";
import ip from "ip"; // To add ip address to the player object, i'll prog it for production build later
import { promises as fs } from "fs";
import { Player } from "../../types";

const lobbyPath = (lobbyId: string) => `./src/assets/lobbies/${lobbyId}.json`;

export async function createLobbyFile(player: Player) {
  await jsonfile.writeFile(lobbyPath(player.id), [player], { flag: "w" });
}

export async function updateLobbyFile(
  lobbyId: string,
  players: Player[],
  changeOwner = false
) {
  if (players.length === 0) return await fs.unlink(lobbyPath(lobbyId));
  await jsonfile.writeFile(lobbyPath(lobbyId), players, {
    flag: "w",
  });

  if (changeOwner) {
    await fs.rename(lobbyPath(lobbyId), lobbyPath(players[0].id));
  }
}

export async function readLobbyFile(lobbyId: string) {
  return await jsonfile.readFile(lobbyPath(lobbyId));
}
