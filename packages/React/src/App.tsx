import { useEffect, useState } from "react";
import { socket } from "./main";
import { Player, LobbyAction } from "@types";
import { CopyIcon, CopyDoneIcon, OwnerIcon } from "./assets";
import { copyLobbyId, createLobby, joinLobby, leaveLobby } from "./utils";
import { useLobbyListeners, useSwitchLobbyIdCopyContainer } from "./hooks";

export default function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>();
  const [currentLobbyId, setCurrentLobbyId] = useState("");
  const [hasCopiedLobbyId, setHasCopiedLobbyId] = useState(false);

  const flexGap = {
    display: "flex",
    gap: "0.5rem",
  };

  const handleSubmitPlayerName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = e.currentTarget.playerName.value;

    if (name.length < 3)
      return alert("Name must be at least 3 characters long");

    setCurrentPlayer({ name, id: socket.id });
  };

  const generatePlayersContainers = () => {
    return players.map((player) => (
      <li key={player.id}>
        {player.name} {player.name === currentPlayer?.name && "(You)"}{" "}
        {player.id === currentLobbyId && <OwnerIcon fontSize={"1.3rem"} />}
      </li>
    ));
  };

  const lobbyAction = (
    action: LobbyAction,
    e?: React.FormEvent<HTMLFormElement>
  ) => {
    e?.preventDefault();

    const joiningLobbyId = e?.currentTarget.lobbyId.value;
    const hasJoinedLobby = currentLobbyId;
    const isJoiningOwnLobby = joiningLobbyId === currentLobbyId;

    if (hasJoinedLobby && !isJoiningOwnLobby)
      leaveLobby(
        socket,
        currentPlayer!,
        currentLobbyId,
        setPlayers,
        setCurrentLobbyId
      );

    switch (action) {
      case "create":
        createLobby(socket, currentPlayer!);
        break;
      case "join":
        joinLobby(socket, currentPlayer!, joiningLobbyId);
        break;
    }
  };

  const handleCopy = () => {
    copyLobbyId(currentLobbyId, setHasCopiedLobbyId);
  };

  useLobbyListeners(socket, setPlayers, setCurrentLobbyId);
  useSwitchLobbyIdCopyContainer(hasCopiedLobbyId, setHasCopiedLobbyId);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      {players.length > 0 && (
        <div>
          <div>Lobby Id : {currentLobbyId}</div>
          <button
            onClick={handleCopy}
            style={{ width: "100%", marginTop: "0.5rem" }}
          >
            {hasCopiedLobbyId ? (
              <CopyDoneIcon fontSize={"1.3rem"} />
            ) : (
              <CopyIcon fontSize={"1.3rem"} />
            )}
          </button>
          <ul>{generatePlayersContainers()}</ul>
        </div>
      )}

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
            {currentLobbyId ? (
              <button onClick={() => lobbyAction("leave")}>Leave Lobby</button>
            ) : (
              <button onClick={() => lobbyAction("create")}>
                Create Lobby
              </button>
            )}
            <form onSubmit={(e) => lobbyAction("join", e)} style={flexGap}>
              <input placeholder="Enter Lobby ID" name="lobbyId" />
              <button type="submit">Join Lobby</button>
            </form>
          </>
        ) : (
          <form onSubmit={handleSubmitPlayerName} style={flexGap}>
            <input placeholder="Enter your player name" name="playerName" />
            <button type="submit">Create Session</button>
          </form>
        )}
      </div>
    </div>
  );
}
