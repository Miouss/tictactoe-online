import { Dispatch, SetStateAction } from "react";
import { LobbyFormContents as Contents } from "./LobbyFormContents";
import { Player } from "@types";

import { socket } from "../../main";

interface Props {
  setCurrentPlayer: Dispatch<SetStateAction<Player | undefined>>;
}

export function LobbyFormCreateSession({ setCurrentPlayer }: Props) {
  const handleSubmitPlayerName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = e.currentTarget.playerName.value;

    if (name.length < 3)
      return alert("Name must be at least 3 characters long");

    setCurrentPlayer({ name, id: socket.id });
  };
  return (
    <form onSubmit={handleSubmitPlayerName}>
      <Contents
        placeholder="Enter your player name"
        name="playerName"
        buttonLabel="Create Session"
      />
    </form>
  );
}
