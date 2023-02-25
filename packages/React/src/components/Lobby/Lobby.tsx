import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LobbyFormCreateSession as FormCreateSession } from "./LobbyFormCreateSession";
import { LobbyFormJoinLobby as FormJoinLobby } from "./LobbyFormJoinLobby";
import { LobbyActionButtonCreateLobby as ActionButtonCreateLobby } from "./LobbyActionButtonCreateLobby";
import { LobbyActionButtonLeaveLobby as ActionButtonLeaveLobby } from "./LobbyActionButtonLeaveLobby";
import { LobbyPlayersList as PlayersList } from "./LobbyPlayersList";
import { socket } from "../../main";
import { useLobbyListeners } from "../../hooks";
import { createLobby, joinLobby, leaveLobby } from "../../utils";
import { Container, Actions } from "../../styles";
import { Player, LobbyAction, PlayerSide } from "@types";

interface Props {
  setPlayerSide: Dispatch<SetStateAction<PlayerSide | undefined>>;
}

export function Lobby({ setPlayerSide }: Props) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>();
  const [joinedLobbyId, setjoinedLobbyId] = useState("");

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
        setjoinedLobbyId,
        setPlayerSide
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

  useLobbyListeners(socket, setPlayers, setjoinedLobbyId, setPlayerSide);

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
