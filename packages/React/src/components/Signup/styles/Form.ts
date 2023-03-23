import styled from "@emotion/styled";
import { flexColumn } from "../../../styles/shorthands";

export const ConditionnalSubMenu = styled("div", {
  shouldForwardProp: (prop) => prop !== "display",
})(({ displayed }: { displayed: boolean }) => ({
  display: displayed ? "block" : "none",
}));

export const Form = styled("form")({
  ...flexColumn,
  gap: "1rem",
  textAlign: "center",
});

export const Username = styled("input")({});

Username.defaultProps = {
  type: "text",
  name: "username",
  placeholder: "Enter your username",
  required: true,
};

export const Password = styled("input")({});

Password.defaultProps = {
  type: "password",
  name: "password",
  placeholder: "Enter your password",
  required: true,
};

export const PasswordConfirm = styled("input")({});

PasswordConfirm.defaultProps = {
  type: "password",
  placeholder: "Confirm your password",
  required: true,
};

export const Email = styled("input")({});

Email.defaultProps = {
  type: "email",
  name: "email",
  placeholder: "Enter your email",
  required: true,
};

export const Submit = styled("button")({});

Submit.defaultProps = {
  type: "submit",
};
