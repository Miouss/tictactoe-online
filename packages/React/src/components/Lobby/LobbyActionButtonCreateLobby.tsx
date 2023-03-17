import { Dispatch, SetStateAction } from "react";
import { LobbyActionButton as ActionButton } from "./LobbyActionButton";
import { LobbyAction } from "@types";

interface Props {
  setLobbyTriggerAction: Dispatch<SetStateAction<LobbyAction | undefined>>;
}

export function LobbyActionButtonCreateLobby({ setLobbyTriggerAction }: Props) {
  return (
    <ActionButton
      label="Create Lobby"
      action="create"
      setLobbyTriggerAction={setLobbyTriggerAction}
    />
  );
}
