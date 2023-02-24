import { LobbyAction } from "@types";

interface Props {
  action: LobbyAction;
  label: string;
  lobbyAction: (
    action: LobbyAction,
    e?: React.FormEvent<HTMLFormElement>
  ) => void;
}

export function LobbyActionButton({ action, label, lobbyAction }: Props) {
  return <button onClick={() => lobbyAction(action)}>{label}</button>;
}
