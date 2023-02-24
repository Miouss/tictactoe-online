import { useState } from "react";
import { copyLobbyId } from "../../utils";
import { useSwitchLobbyIdCopyContainer } from "../../hooks";
import { CopyIcon, CopyDoneIcon, OwnerIcon } from "../../assets";
import { Player } from "@types";

interface Props {
  joinedLobbyId: string;
  players: Player[];
  currentPlayer: Player | undefined;
}

export function LobbyPlayersList({ joinedLobbyId, players, currentPlayer }: Props) {
  const [hasCopiedLobbyId, setHasCopiedLobbyId] = useState(false);

  const generatePlayersContainers = () => {
    return players.map((player) => (
      <li key={player.id}>
        {player.name} {player.name === currentPlayer?.name && "(You)"}{" "}
        {player.id === joinedLobbyId && <OwnerIcon fontSize={"1.3rem"} />}
      </li>
    ));
  };

  const handleCopy = () => {
    copyLobbyId(joinedLobbyId, setHasCopiedLobbyId);
  };

  useSwitchLobbyIdCopyContainer(hasCopiedLobbyId, setHasCopiedLobbyId);

  if (!joinedLobbyId) return null;

  return (
    <div>
      <div>Lobby Id : {joinedLobbyId}</div>
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
  );
}
