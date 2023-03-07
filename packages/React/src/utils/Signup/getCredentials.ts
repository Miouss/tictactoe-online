export function getCredentials(event: React.FormEvent<HTMLFormElement>) {
    return {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
      email: event.currentTarget.email?.value,
    };
  }