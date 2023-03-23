import styled from "@emotion/styled";
import { flexCenter, flexColumn, size } from "../../../styles/shorthands";

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
  ...size("50px", "50px"),

  background: played ? "lightgray" : "black",
  pointerEvents: played ? "none" : "unset",
  "&:hover": {
    background: "lightgray",
    cursor: "pointer",
  },
}));

export const GameStatus = styled("div", {
  shouldForwardProp: (prop) => prop !== "hidden",
})(({ hidden }: { hidden: boolean }) => ({
  ...flexColumn,
  ...flexCenter,

  position: "absolute",
  visibility: hidden ? "hidden" : "visible",
  transform: "translateY(-100%)",
  paddingBottom: "1rem",
  alignSelf: "center",
}));
