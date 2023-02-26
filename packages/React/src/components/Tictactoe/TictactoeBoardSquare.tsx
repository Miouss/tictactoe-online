import { useState } from "react";
import { CrossIcon, CircleIcon } from "../../assets";
import { Square } from "../../styles";
import { PlayerSign, squareId } from "@types";

import { socket } from "../../main";

interface Props {
  playerSign: PlayerSign | undefined;
  squareId: squareId;
}

export function TictactoeBoardSquare({ playerSign, squareId }: Props) {
  const [isPlayed, setIsPlayed] = useState(false);
  const [isPlayedByOpponent, setIsPlayedByOpponent] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const Sign = playerSign === "X" ? CrossIcon : CircleIcon;
  const OpponentSign = playerSign === "X" ? CircleIcon : CrossIcon;

  const handleMove = () => {
    if (isPlayedByOpponent) return;
    makeMove();
  };

  const makeMove = () => {
    socket.emit("makeMove", squareId, socket.id);
  };

  socket.on("moveMade", (socketId: string, squareIdPlayed: squareId) => {
    if(squareIdPlayed !== squareId) return;
    if (socket.id === socketId) setIsPlayed(true);
    else setIsPlayedByOpponent(true);
  });

  const fullSize = {
    width: "100%",
    height: "100%",
  };

  return (
    <Square
      played={isPlayed || isPlayedByOpponent}
      onClick={handleMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isPlayedByOpponent && <OpponentSign style={fullSize} />}

      {((isPlayed || isHovered) && !isPlayedByOpponent) && <Sign style={fullSize} />}
    </Square>
  );
}
