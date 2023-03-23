import { useRef } from "react";
import { createAccount } from "./utils";
import {
  Form,
  Username,
  Password,
  PasswordConfirm,
  Email,
  Submit,
} from "./styles";

export function SignupCreateAccount() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const validatePassword = () => {
    const hasSamePasswords =
      passwordRef.current?.value === passwordConfirmRef.current?.value;

    if (hasSamePasswords) {
      passwordConfirmRef.current?.setCustomValidity("");
    } else {
      passwordConfirmRef.current?.setCustomValidity("Passwords do not match");
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
