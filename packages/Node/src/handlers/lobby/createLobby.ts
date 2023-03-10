import { Lobby } from "@database";
import { io } from "@server";
import { Player } from "@types";

export async function createLobby(player: Player) {
  try {
    const { id } = await Lobby.create({ players: player });
    console.log("Lobby created");

    io.to(player.id).emit("lobbyCreated", player, id);
  } catch (e) {
    console.error(e);
  }
}
