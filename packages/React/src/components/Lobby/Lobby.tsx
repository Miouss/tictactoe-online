import { useEffect, useState } from "react";
import { LobbyFormCreateSession as FormCreateSession } from "./LobbyFormCreateSession";
import { LobbyFormJoinLobby as FormJoinLobby } from "./LobbyFormJoinLobby";
import { LobbyActionButtonCreateLobby as ActionButtonCreateLobby } from "./LobbyActionButtonCreateLobby";
import { LobbyActionButtonLeaveLobby as ActionButtonLeaveLobby } from "./LobbyActionButtonLeaveLobby";
import { LobbyPlayersList as PlayersList } from "./LobbyPlayersList";
import { socket } from "../../main";
import { useLobbyListeners, usePlayerSide } from "../../hooks";
import { createLobby, joinLobby, leaveLobby } from "../../utils";
import { Container, Actions } from "../../styles";
import { Player, LobbyAction } from "@types";

export function Lobby() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>();
  const [joinedLobbyId, setjoinedLobbyId] = useState("");
  const { setPlayerSide } = usePlayerSide();

  const hasJoinedLobby = joinedLobbyId;

  const lobbyAction = (
    action: LobbyAction,
    e?: React.FormEvent<HTMLFormElement>
  ) => {
    e?.preventDefault();

    const joiningLobbyId = e?.currentTarget.lobbyId.value;
    const isJoiningOwnLobby = joiningLobbyId === joinedLobbyId;

    if (hasJoinedLobby && !isJoiningOwnLobby)
      leaveLobby(
        socket,
        currentPlayer!,
        joinedLobbyId,
        setPlayers,
        setjoinedLobbyId
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

  useLobbyListeners(socket, setPlayers, setjoinedLobbyId);

  useEffect(() => {
    if (joinedLobbyId) {
      const isLobbyOwner = joinedLobbyId === currentPlayer?.id;
      const isLobbyFull = players.length === 2;
      if (isLobbyFull) setPlayerSide(isLobbyOwner ? "X" : "O");
    } else {
      setPlayerSide(undefined);
    }
  }, [joinedLobbyId, players]);

  return (
    <Container>
      <PlayersList
        joinedLobbyId={joinedLobbyId}
        players={players}
        currentPlayer={currentPlayer}
      />

      <Actions>
        {currentPlayer ? (
          <>
            <label>{currentPlayer.name}</label>
            {hasJoinedLobby ? (
              <ActionButtonLeaveLobby lobbyAction={lobbyAction} />
            ) : (
              <ActionButtonCreateLobby lobbyAction={lobbyAction} />
            )}
            <FormJoinLobby lobbyAction={lobbyAction} />
          </>
        ) : (
          <FormCreateSession setCurrentPlayer={setCurrentPlayer} />
        )}
      </Actions>
    </Container>
  );
}
