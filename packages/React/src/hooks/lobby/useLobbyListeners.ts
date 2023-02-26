import { Dispatch, SetStateAction, useEffect } from "react";
import { Player } from "@types";
import { Socket } from "socket.io-client";

export function useLobbyListeners(
  socket: Socket,
  setPlayers: Dispatch<SetStateAction<Player[]>>,
  setJoinedLobbyId: Dispatch<SetStateAction<string>>,
  setPlayerSign: Dispatch<SetStateAction<"X" | "O" | undefined>>
) {
  useEffect(() => {
    socket.on("lobbyCreated", (player: Player, lobbyId: string) => {
      setPlayers([player]);
      setJoinedLobbyId(lobbyId);
    });

    socket.on("lobbyFull", () => {
      alert("Lobby is full");
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
    });

    socket.on(
      "playerJoined",
      (playersInLobby: Player[], lobbyId: string, position: 0 | 1) => {
        const sign = position ? "O" : "X";
        setPlayers(playersInLobby);
        setJoinedLobbyId(lobbyId);
        setPlayerSign(sign);
      }
    );
  }, []);
}
