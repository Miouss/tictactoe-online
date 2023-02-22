import { useEffect, useRef, useState } from "react";
import { socket } from "./main";

interface Player {
  name: string;
  id: string;
}

export default function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>();

  const handleSubmitPlayerName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = e.currentTarget.playerName.value;

    if (name.length < 3)
      return alert("Name must be at least 3 characters long");

    setCurrentPlayer({ name, id: socket.id });
  };

  const generatePlayersContainers = () => {
    return players.map((player) => (
      <li key={player.id}>{`${player.name} #${player.id}`}</li>
    ));
  };

  const createLobby = () => {
    socket.emit("createLobby", currentPlayer);
  };

  const joinLobby = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const lobbyId = e?.currentTarget.lobbyId.value;

    socket.emit("joinLobby", currentPlayer, lobbyId);
  };

  useEffect(() => {
    socket.on("lobbyCreated", (player) => {
      setPlayers([player]);
    });

    socket.on("lobbyAlreadyExists", () => {
      alert("Lobby already exists");
    });

    socket.on("playerAlreadyJoined", () => {
      alert("You already joined");
    });

    socket.on("playerNameTaken", () => {
      alert("Player name taken");
    });

    socket.on("playerJoined", (playersInLobby: Player[]) => {
      setPlayers(playersInLobby);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <div>
        <ul>{generatePlayersContainers()}</ul>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          textAlign: "center",
        }}
      >
        {currentPlayer ? (
          <>
            <label>{currentPlayer.name}</label>
            <label>{`Lobby ID : ${currentPlayer.id}`}</label>
            <button onClick={createLobby}>Create Lobby</button>
            <form onSubmit={joinLobby}>
              <input placeholder="Enter Lobby ID" name="lobbyId" />
              <button type="submit">Join Lobby</button>
            </form>
          </>
        ) : (
          <form onSubmit={handleSubmitPlayerName}>
            <input placeholder="Enter your player name" name="playerName" />
            <button type="submit">Create Session</button>
          </form>
        )}
      </div>
    </div>
  );
}
