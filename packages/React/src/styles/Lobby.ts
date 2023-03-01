import styled from "@emotion/styled";
import { flexColumn } from "./shorthands";

export const Container = styled("div")({
    ...flexColumn,
    gap               : "2rem",
});

export const Actions = styled("div")({
  ...flexColumn,
  gap                 : "1rem",
  textAlign           : "center",
});
