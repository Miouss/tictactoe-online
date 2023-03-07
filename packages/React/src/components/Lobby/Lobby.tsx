import { Dispatch, SetStateAction, useState } from "react";
import { LobbyFormJoinLobby as FormJoinLobby } from "./LobbyFormJoinLobby";
import { LobbyActionButtonCreateLobby as ActionButtonCreateLobby } from "./LobbyActionButtonCreateLobby";
import { LobbyActionButtonLeaveLobby as ActionButtonLeaveLobby } from "./LobbyActionButtonLeaveLobby";
import { LobbyPlayersList as PlayersList } from "./LobbyPlayersList";
import { socket } from "../../main";
import { useLobbyListeners } from "../../hooks";
import { Container, Actions } from "../../styles";
import { Player, LobbyAction, PlayerSign } from "@types";

interface Props {
  playerName: string;
  setPlayerSign: Dispatch<SetStateAction<PlayerSign | undefined>>;
}

export function Lobby({ playerName, setPlayerSign }: Props) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [joinedLobbyId, setJoinedLobbyId] = useState("");

  const currentPlayer: Player = {
    name: playerName,
    id: socket.id,
  };

  console.log(currentPlayer);

  const hasJoinedLobby = joinedLobbyId !== "";

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
          setPlayerSign(undefined);
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

  useLobbyListeners(socket, setPlayers, setJoinedLobbyId, setPlayerSign);

  return (
    <Container>
      <PlayersList
        joinedLobbyId={joinedLobbyId}
        players={players}
        currentPlayer={currentPlayer}
      />

      <Actions>
        <label>{currentPlayer.name}</label>
        {hasJoinedLobby ? (
          <ActionButtonLeaveLobby lobbyAction={lobbyAction} />
        ) : (
          <ActionButtonCreateLobby lobbyAction={lobbyAction} />
        )}
        <FormJoinLobby lobbyAction={lobbyAction} />
      </Actions>
    </Container>
  );
}
