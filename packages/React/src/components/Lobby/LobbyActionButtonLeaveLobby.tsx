import { LobbyActionButton as ActionButton } from "./LobbyActionButton";
import { LobbyActionProps } from "@types";

interface Props {
  lobbyAction: LobbyActionProps;
}

export function LobbyActionButtonLeaveLobby({ lobbyAction }: Props) {
  return (
    <ActionButton
      lobbyAction={lobbyAction}
      label="Leave Lobby"
      action="leave"
    />
  );
}
