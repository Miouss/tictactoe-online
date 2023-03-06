import { useRef, useState } from "react";
import {
  SignupContainer as Container,
  Button,
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
  const [isLoggingIn, setIsLoggingIn] = useState(false);

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

    fetchToDatabase(url, options);
  };

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const method = "POST";
    const headers = { "Content-Type": "application/json" };

    const username = event.currentTarget.username.value;
    const password = event.currentTarget.password.value;

    const body = JSON.stringify({
      username,
      password,
    });

    const url = "http://localhost:3001/api/login";
    const options = { method, headers, body };

    fetchToDatabase(url, options);
  };

  const fetchToDatabase = async (url: string, options: RequestInit) => {
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
      <Button onClick={() => setIsCreatingAccount(!isCreatingAccount)}>
        Create New Account
      </Button>
      <Button onClick={() => setIsLoggingIn(true)}>Connect with account</Button>
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
      <ConditionalContainer displayed={isLoggingIn}>
        <Form onSubmit={login}>
          <Username />
          <Password />
          <Submit>Login</Submit>
        </Form>
      </ConditionalContainer>
    </Container>
  );
}
