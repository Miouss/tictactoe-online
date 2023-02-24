import { useState } from "react";
import { CrossIcon, CircleIcon } from "../../assets";
import { Square } from "../../styles";
import { PlayerSide } from "@types";

interface Props {
  playerSide: PlayerSide | undefined;
}

export function TictactoeBoardSquare({ playerSide }: Props) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const Sign = playerSide === "X" ? CrossIcon : CircleIcon;

  return (
    <Square
      confirmed={isConfirmed}
      onClick={() => setIsConfirmed(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {(isConfirmed || isHovered) && (
        <Sign
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      )}
    </Square>
  );
}
