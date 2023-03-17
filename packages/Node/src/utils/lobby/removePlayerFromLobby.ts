import { Lobby } from "@database";
import { Player } from "@types";

export async function removePlayerFromLobby(currentPlayer: Player) {
  const filter = {
    players: { $elemMatch: currentPlayer },
  };
  const update = { $pull: { players: currentPlayer } };
  const options = { new: true };

  const lobby = await Lobby.findOneAndUpdate(filter, update, options);
  if (!lobby) throw "Lobby not found";

  console.log(`${currentPlayer.name} removed from lobby`);

  return lobby;
}
