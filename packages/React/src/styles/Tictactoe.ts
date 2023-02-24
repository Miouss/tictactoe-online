import styled from "@emotion/styled";

export const TicTacToe = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Board = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1px",
});

export const Square = styled("div", {
  shouldForwardProp: (prop) => prop !== "confirmed",
})(({ confirmed }: { confirmed: boolean }) => ({
  width: "50px",
  height: "50px",
  background: confirmed ? "lightgray" : "black",
  "&:hover": {
    background: "lightgray",
    cursor: "pointer",
  },
}));