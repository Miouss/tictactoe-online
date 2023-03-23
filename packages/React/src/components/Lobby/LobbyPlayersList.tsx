import { useState } from "react";
import { copyLobbyId } from "./utils";
import { useSwitchCopyLobbyIdIcon } from "./hooks";
import { CopyIcon, CopyDoneIcon, OwnerIcon } from "../../assets";
import { Player } from "@types";

interface Props {
  joinedLobbyId: string;
  players: Player[];
  currentPlayer: Player | undefined;
}

export function LobbyPlayersList({
  joinedLobbyId,
  players,
  currentPlayer,
}: Props) {
  if (!joinedLobbyId) return null;

  const [hasCopiedLobbyId, setHasCopiedLobbyId] = useState(false);

  const generatePlayersContainers = () =>
    players.map((player, index) => {
      const isCurrentPlayer = player.name === currentPlayer!.name;
      const isLobbyOwner = index === 0;

      return (
        <li key={player.id}>
          {player.name} {isCurrentPlayer && "(You)"}{" "}
          {isLobbyOwner && <OwnerIcon fontSize={"1.3rem"} />}
        </li>
      );
    });

  useSwitchCopyLobbyIdIcon(hasCopiedLobbyId, setHasCopiedLobbyId);

  return (
    <div>
      <div>Lobby Id : {joinedLobbyId}</div>
      <button
        onClick={() => copyLobbyId(joinedLobbyId, setHasCopiedLobbyId)}
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
