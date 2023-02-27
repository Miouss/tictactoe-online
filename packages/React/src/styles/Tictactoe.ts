import styled from "@emotion/styled";

export const TicTacToe = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Board = styled("div", {
  shouldForwardProp: (prop) => prop !== "playing",
})(({ playing }: { playing: boolean }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1px",
  pointerEvents: playing ? "unset" : "none",
}));

export const Square = styled("div", {
  shouldForwardProp: (prop) => prop !== "played",
})(({ played }: { played: boolean }) => ({
  width: "50px",
  height: "50px",
  background: played ? "lightgray" : "black",
  pointerEvents: played ? "none" : "unset",
  "&:hover": {
    background: "lightgray",
    cursor: "pointer",
  },
}));