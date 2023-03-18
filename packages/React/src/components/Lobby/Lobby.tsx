import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LobbyFormJoinLobby as FormJoinLobby } from "./LobbyFormJoinLobby";
import { LobbyActionButtonCreateLobby as ButtonCreateLobby } from "./LobbyActionButtonCreateLobby";
import { LobbyActionButtonLeaveLobby as ButtonLeaveLobby } from "./LobbyActionButtonLeaveLobby";
import { LobbyPlayersList as PlayersList } from "./LobbyPlayersList";
import { socket } from "../../main";
import { useLobbyListeners } from "../../hooks";
import { Container, Actions } from "../../styles";
import { Player, LobbyAction, PlayerSign } from "@types";

interface Props {
  playerName: string;
  setPlayerSign: Dispatch<SetStateAction<PlayerSign | undefined>>;
  setHasGameStarted: Dispatch<SetStateAction<boolean>>;
}

export function Lobby({ playerName, setPlayerSign, setHasGameStarted }: Props) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [joinedLobbyId, setJoinedLobbyId] = useState("");
  const [lobbyTriggerAction, setLobbyTriggerAction] = useState<LobbyAction>();
  const [joiningLobbyId, setJoiningLobbyId] = useState("");

  const currentPlayer: Player = {
    name: playerName,
    id: socket.id,
  };

  const hasJoinedLobby = joinedLobbyId !== "";

  useLobbyListeners(socket, setPlayers, setJoinedLobbyId, setPlayerSign, setHasGameStarted);

  useEffect(() => {
    if (!lobbyTriggerAction) return;

    const createLobby = () => {
      socket.emit("createLobby", currentPlayer);
    };

    const joinLobby = (joiningLobbyId: string) => {
      socket.emit("joinLobby", currentPlayer, joiningLobbyId);
    };

    const leaveLobby = () => {
      return new Promise((res) => {
        socket.emit("leaveLobby", currentPlayer, joinedLobbyId);
        socket.on("playerLeft", () => {
          setPlayers([]);
          setJoinedLobbyId("");
          setPlayerSign(undefined);
          setHasGameStarted(false);
          res(true);
        });
      });
    };

    const lobbyAction = async (
      action: LobbyAction,
      joiningLobbyId?: string
    ) => {
      const hasJoinedLobby = joinedLobbyId !== "";

      if (
        hasJoinedLobby &&
        joiningLobbyId !== joinedLobbyId &&
        action !== "leave"
      ) {
        await leaveLobby();
      }

      switch (action) {
        case "create":
          createLobby();
          break;
        case "join":
          joinLobby(joiningLobbyId!);
          break;
        case "leave":
          await leaveLobby();
          break;
      }
    };

    lobbyAction(lobbyTriggerAction, joiningLobbyId);

    return () => {
      if (joinedLobbyId) {
        lobbyAction("leave", joiningLobbyId);
        console.log("joiningLobbyId : ", joiningLobbyId);
      }
    };
  }, [lobbyTriggerAction, joiningLobbyId]);

  useEffect(() => {
    return () => {
      socket.emit("leaveLobby", currentPlayer);
    };
  }, []);

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
          <ButtonLeaveLobby setLobbyTriggerAction={setLobbyTriggerAction} />
        ) : (
          <ButtonCreateLobby setLobbyTriggerAction={setLobbyTriggerAction} />
        )}
        <FormJoinLobby
          setLobbyTriggerAction={setLobbyTriggerAction}
          setJoiningLobbyId={setJoiningLobbyId}
        />
      </Actions>
    </Container>
  );
}
