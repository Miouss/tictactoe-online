import { Lobby } from "@database";
import { Player } from "@types";

export async function removePlayerFromLobby(
  currentPlayer: Player,
  lobbyId: string
) {
  const filter = { _id: lobbyId };
  const update = { $pull: { players: currentPlayer } };
  const options = { new: true };

  const lobby = await Lobby.findByIdAndUpdate(filter, update, options);
  if (!lobby) throw "Lobby not found";

  console.log("Player removed from lobby");

  return lobby;
}
