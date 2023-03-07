import { useRef } from "react";
import { createAccount } from "../../utils";
import {
  FormAccount as Form,
  InputUsername as Username,
  InputPassword as Password,
  InputPasswordConfirm as PasswordConfirm,
  InputEmail as Email,
  ButtonSubmit as Submit,
} from "../../styles";

export function SignupCreateAccount() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const validatePassword = () => {
    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      passwordConfirmRef.current?.setCustomValidity("Passwords do not match");
    } else {
      passwordConfirmRef.current?.setCustomValidity("");
    }
  };

  return (
    <Form onSubmit={createAccount}>
      <Username />
      <Password ref={passwordRef} />
      <PasswordConfirm ref={passwordConfirmRef} onChange={validatePassword} />
      <Email />
      <Submit> Create Account </Submit>
    </Form>
  );
}
