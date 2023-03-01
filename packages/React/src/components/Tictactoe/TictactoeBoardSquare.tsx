import { useState } from "react";
import { CrossIcon, CircleIcon } from "../../assets";
import { Square, fullSize } from "../../styles";
import { PlayerSign, squareId } from "@types";

import { socket } from "../../main";

interface Props {
  playerSign: PlayerSign | undefined;
  squareId: squareId;
}

export function TictactoeBoardSquare({ playerSign, squareId }: Props) {
  const [isPlayedByPlayer, setIsPlayedByPlayer] = useState(false);
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
    if (squareIdPlayed !== squareId) return;
    if (socket.id === socketId) setIsPlayedByPlayer(true);
    else setIsPlayedByOpponent(true);
  });

  return (
    <Square
      played={isPlayedByPlayer || isPlayedByOpponent}
      onClick={handleMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isPlayedByOpponent && <OpponentSign style={fullSize} />}

      {(isPlayedByPlayer || isHovered) && !isPlayedByOpponent && (
        <Sign style={fullSize} />
      )}
    </Square>
  );
}
