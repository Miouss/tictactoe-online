import { Dispatch, SetStateAction, useEffect } from "react";
import { Player } from "@types";
import { Socket } from "socket.io-client";

export function useLobbyListeners(
  socket: Socket,
  setPlayers: Dispatch<SetStateAction<Player[]>>,
  setCurrentLobbyId: Dispatch<SetStateAction<string>>
) {
  useEffect(() => {
    socket.on("lobbyCreated", (player: Player) => {
      setPlayers([player]);
      setCurrentLobbyId(player.id);
    });

    socket.on("lobbyAlreadyExists", () => {
      alert("Lobby already exists");
    });

    socket.on("LobbyNotFound", () => {
      alert("Lobby not found");
    });

    socket.on("playerAlreadyJoined", () => {
      alert("You already joined");
    });

    socket.on("playerNameTaken", () => {
      alert("Player name taken");
    });

    socket.on("anotherPlayerLeft", (playersInLobby: Player[]) => {
      setPlayers(playersInLobby);
      setCurrentLobbyId(playersInLobby[0].id);
    });

    socket.on("playerJoined", (playersInLobby: Player[], lobbyId: string) => {
      setPlayers(playersInLobby);
      setCurrentLobbyId(lobbyId);
    });
  }, []);
}
