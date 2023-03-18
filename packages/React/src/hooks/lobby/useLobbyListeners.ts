import { Dispatch, SetStateAction, useEffect } from "react";
import { Player } from "@types";
import { Socket } from "socket.io-client";

export function useLobbyListeners(
  socket: Socket,
  setPlayers: Dispatch<SetStateAction<Player[]>>,
  setJoinedLobbyId: Dispatch<SetStateAction<string>>,
  setPlayerSign: Dispatch<SetStateAction<"X" | "O" | undefined>>,
  setHasGameStarted: Dispatch<SetStateAction<boolean>>
) {
  useEffect(() => {
    socket.on("lobbyCreated", (player: Player, lobbyId: string) => {
      setPlayers([player]);
      setJoinedLobbyId(lobbyId);
      setPlayerSign("X");
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

    socket.on("opponentLeft", (remainingPlayer: Player) => {
      setPlayers([remainingPlayer]);
      setPlayerSign("X");
      setHasGameStarted(false);
      alert("The opponent left the lobby");
    });

    socket.on("playerJoined", (playersInLobby: Player[], lobbyId: string) => {
      console.log(`socket id : ${socket.id}`)
      setPlayers(playersInLobby);
      setJoinedLobbyId(lobbyId);
      setPlayerSign((sign) => (sign === "X" ? sign : "O"));
      setHasGameStarted(true);
    });
  }, []);
}
