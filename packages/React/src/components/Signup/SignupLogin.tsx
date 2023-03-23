import { Dispatch, SetStateAction } from "react";
import { login } from "./utils";
import {
  Form,
  Username,
  Password,
  Submit,
} from "./styles";

interface Props {
  setPlayerName: Dispatch<SetStateAction<string>>;
}

export function SignupLogin({ setPlayerName }: Props) {
  return (
    <Form onSubmit={(event) => login(event, setPlayerName)}>
      <Username />
      <Password />
      <Submit>Login</Submit>
    </Form>
  );
}
