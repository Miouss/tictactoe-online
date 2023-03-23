import { LobbyFormContents as Contents } from "./LobbyFormContents";
import { Dispatch, SetStateAction } from "react";
import { LobbyAction } from "./types";

interface Props {
  setLobbyTriggerAction: Dispatch<SetStateAction<LobbyAction | undefined>>;
  setJoiningLobbyId: Dispatch<SetStateAction<string>>;
}

export function LobbyFormJoinLobby({
  setLobbyTriggerAction,
  setJoiningLobbyId,
}: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLobbyTriggerAction("join");
        setJoiningLobbyId(e.currentTarget.lobbyId.value);
      }}
    >
      <Contents
        placeholder="Enter Lobby ID"
        name="lobbyId"
        buttonLabel="Join Lobby"
      />
    </form>
  );
}
