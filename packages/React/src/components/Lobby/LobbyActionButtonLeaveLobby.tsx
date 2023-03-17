import { Dispatch, SetStateAction } from "react";
import { LobbyActionButton as ActionButton } from "./LobbyActionButton";
import { LobbyAction } from "@types";

interface Props {
  setLobbyTriggerAction: Dispatch<SetStateAction<LobbyAction | undefined>>;
}

export function LobbyActionButtonLeaveLobby({ setLobbyTriggerAction }: Props) {
  return (
    <ActionButton
      label="Leave Lobby"
      action="leave"
      setLobbyTriggerAction={setLobbyTriggerAction}
    />
  );
}
