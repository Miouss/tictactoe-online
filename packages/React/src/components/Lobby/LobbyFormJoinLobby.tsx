import { LobbyActionProps } from "@types";
import { LobbyFormContents as Contents } from "./LobbyFormContents";

interface Props {
  lobbyAction: LobbyActionProps;
}

export function LobbyFormJoinLobby({ lobbyAction }: Props) {
  return (
    <form onSubmit={(e) => lobbyAction("join", e)}>
      <Contents
        placeholder="Enter Lobby ID"
        name="lobbyId"
        buttonLabel="Join Lobby"
      />
    </form>
  );
}
