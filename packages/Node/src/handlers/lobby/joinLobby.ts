import { Lobby } from "@database";
import { io } from "@server";
import { Player } from "@types";
import { getPlayerBy } from "@utils";

export async function joinLobby(joiningPlayer: Player, lobbyId: string) {
  try {
    const lobby = await Lobby.findById(lobbyId);
    if (!lobby) throw "Lobby not found";

    const players = lobby.players as Player[];

    const isPlayerAlreadyInLobby = getPlayerBy("id", joiningPlayer.id, players);
    if (isPlayerAlreadyInLobby)
      return io.to(joiningPlayer.id).emit("playerAlreadyJoined");

    const isLobbyFull = players.length === 2;
    if (isLobbyFull) return io.to(joiningPlayer.id).emit("lobbyFull");

    const isPlayerNameTaken = getPlayerBy("name", joiningPlayer.name, players);
    if (isPlayerNameTaken)
      return io.to(joiningPlayer.id).emit("playerNameTaken");

    lobby.players.push(joiningPlayer);

    await lobby.save();
    console.log("Player added to lobby");

    players.forEach((player: Player, index) => {
      io.to(player.id).emit("playerJoined", players, lobbyId, index as 0 | 1);
    });
  } catch (e) {
    io.to(joiningPlayer.id).emit("LobbyNotFound");
  }
}
