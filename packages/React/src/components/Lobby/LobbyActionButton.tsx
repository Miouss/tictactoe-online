import { LobbyAction } from "@types";
import { Dispatch, SetStateAction } from "react";

interface Props {
  action: LobbyAction;
  label: string;
  setLobbyTriggerAction: Dispatch<SetStateAction<LobbyAction | undefined>>;
}

export function LobbyActionButton({ action, label, setLobbyTriggerAction }: Props) {
  return <button onClick={() => setLobbyTriggerAction(action)}>{label}</button>;
}
