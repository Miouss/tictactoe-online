import { Dispatch, SetStateAction } from "react";
import { login } from "../../utils";
import {
  FormAccount as Form,
  InputUsername as Username,
  InputPassword as Password,
  ButtonSubmit as Submit,
} from "../../styles";

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
