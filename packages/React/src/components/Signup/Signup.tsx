import { useRef, useState } from "react";
import {
  SignupContainer as Container,
  ButtonCreateAccount,
  FormAccount as Form,
  InputUsername as Username,
  InputPassword as Password,
  InputPasswordConfirm as PasswordConfirm,
  InputEmail as Email,
  ButtonSubmit as Submit,
  ConditionalContainer,
} from "../../styles";

export function Signup() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const validatePassword = () => {
    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      passwordConfirmRef.current?.setCustomValidity("Passwords do not match");
    } else {
      passwordConfirmRef.current?.setCustomValidity("");
    }
  };

  const createAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const method = "POST";
    const headers = { "Content-Type": "application/json" };

    const username = event.currentTarget.username.value;
    const password = event.currentTarget.password.value;
    const email = event.currentTarget.email.value;

    const body = JSON.stringify({
      username,
      password,
      email,
    });

    const url = "http://localhost:3001/api/create-account";
    const options = { method, headers, body };

    try {
      const response = await fetch(url, options);

      const responseText = await response.text();
      const alertMessage = response.ok
        ? responseText
        : `Error ${response.status}: ${responseText}`;

      alert(alertMessage);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <ButtonCreateAccount
        onClick={() => setIsCreatingAccount(!isCreatingAccount)}
      >
        Create New Account
      </ButtonCreateAccount>
      <ConditionalContainer displayed={isCreatingAccount}>
        <Form onSubmit={createAccount}>
          <Username />
          <Password ref={passwordRef} />
          <PasswordConfirm
            ref={passwordConfirmRef}
            onChange={validatePassword}
          />
          <Email />
          <Submit> Create Account </Submit>
        </Form>
      </ConditionalContainer>
    </Container>
  );
}
