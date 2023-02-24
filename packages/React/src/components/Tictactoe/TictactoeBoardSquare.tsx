import { useState } from "react";
import { CrossIcon, CircleIcon } from "../../assets";
import { Square } from "../../styles";
import { usePlayerSide } from "../../hooks";

export function TictactoeBoardSquare() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { playerSide } = usePlayerSide();

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
