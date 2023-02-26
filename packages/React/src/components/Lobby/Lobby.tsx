import { Dispatch, SetStateAction, useState } from "react";
import { LobbyFormCreateSession as FormCreateSession } from "./LobbyFormCreateSession";
import { LobbyFormJoinLobby as FormJoinLobby } from "./LobbyFormJoinLobby";
import { LobbyActionButtonCreateLobby as ActionButtonCreateLobby } from "./LobbyActionButtonCreateLobby";
import { LobbyActionButtonLeaveLobby as ActionButtonLeaveLobby } from "./LobbyActionButtonLeaveLobby";
import { LobbyPlayersList as PlayersList } from "./LobbyPlayersList";
import { socket } from "../../main";
import { useLobbyListeners } from "../../hooks";
import { Container, Actions } from "../../styles";
import { Player, LobbyAction, PlayerSide } from "@types";

interface Props {
  setPlayerSide: Dispatch<SetStateAction<PlayerSide | undefined>>;
}

export function Lobby({ setPlayerSide }: Props) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>();
  const [joinedLobbyId, setJoinedLobbyId] = useState("");

  const hasJoinedLobby = joinedLobbyId;

  const lobbyAction = async (
    action: LobbyAction,
    e?: React.FormEvent<HTMLFormElement>
  ) => {
    e?.preventDefault();

    const joiningLobbyId = e?.currentTarget.lobbyId.value;
    const isJoiningOwnLobby = joiningLobbyId === joinedLobbyId;

    if (hasJoinedLobby && !isJoiningOwnLobby) {
      await new Promise((res) => {
        socket.emit("leaveLobby", currentPlayer, joinedLobbyId);
        socket.on("playerLeft", () => {
          setPlayers([]);
          setJoinedLobbyId("");
          setPlayerSide(undefined);
          res(true);
        });
      });
    }

    switch (action) {
      case "create":
        socket.emit("createLobby", currentPlayer);
        break;
      case "join":
        socket.emit("joinLobby", currentPlayer, joiningLobbyId);
        break;
    }
  };

  useLobbyListeners(socket, setPlayers, setJoinedLobbyId, setPlayerSide);

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
