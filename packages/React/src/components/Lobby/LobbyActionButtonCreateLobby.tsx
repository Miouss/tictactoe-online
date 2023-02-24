import { LobbyActionButton as ActionButton } from "./LobbyActionButton";
import { LobbyActionProps } from "@types";

interface Props {
  lobbyAction: LobbyActionProps;
}

export function LobbyActionButtonCreateLobby({ lobbyAction }: Props) {
  return (
    <ActionButton
      lobbyAction={lobbyAction}
      label="Create Lobby"
      action="create"
    />
  );
}
