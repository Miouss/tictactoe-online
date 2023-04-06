import styled from "@emotion/styled";

interface Props {
  direction?: "row" | "column";
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  gap?: string;
}

export const FlexBox = styled("div", {
  shouldForwardProp: (prop) =>
    !["direction", "justify", "align", "gap"].includes(prop),
})(({ direction, justify, align, gap }: Props) => ({
  display: "flex",
  flexDirection: direction ?? "initial",
  justifyContent: justify ?? "initial",
  alignItems: align ?? "initial",
  gap: gap ?? "0.5rem",
}));
