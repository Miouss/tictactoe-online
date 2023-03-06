import styled from "@emotion/styled";
import { flexColumn } from "./shorthands";

export const SignupContainer = styled("div")({
    ...flexColumn,
    gap               : "2rem",
});

export const Button = styled("button")({
});

export const ConditionalContainer = styled("div", {
    shouldForwardProp: (prop) => prop !== "display",
})(({displayed} : {displayed: boolean}) => ({
    display: displayed ? "block" : "none",
}));

export const FormAccount = styled("form")({
    ...flexColumn,
    gap               : "1rem",
    textAlign         : "center",
});

export const InputUsername = styled("input")({
});

InputUsername.defaultProps = {
    type: "text",
    name: "username",
    placeholder: "Enter your username",
    required: true,
};

export const InputPassword = styled("input")({
});

InputPassword.defaultProps = {
    type: "password",
    name: "password",
    placeholder: "Enter your password",
    required: true,
};

export const InputPasswordConfirm = styled("input")({
});

InputPasswordConfirm.defaultProps = {
    type: "password",
    placeholder: "Confirm your password",
    required: true,
};

export const InputEmail = styled("input")({
});

InputEmail.defaultProps = {
    type: "email",
    name: "email",
    placeholder: "Enter your email",
    required: true,
};


export const ButtonSubmit = styled("button")({
});

ButtonSubmit.defaultProps = {
    type: "submit",
};

