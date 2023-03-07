import { Dispatch, SetStateAction, useState } from "react";
import { SignupLogin as LoginForm } from "./SignupLogin";
import { SignupCreateAccount as CreateAccountForm } from "./SignupCreateAccount";
import {
  SignupContainer as Container,
  SignupActions as Actions,
  Button,
  ConditionnalSubMenu,
} from "../../styles";

type SubMenu = "createAccount" | "login";

export function Signup({
  setPlayerName,
}: {
  setPlayerName: Dispatch<SetStateAction<string>>;
}) {
  const [openSubmenu, setOpenSubmenu] = useState<SubMenu>();

  const isSubMenuOpen = openSubmenu !== undefined;
  const isCreatingAccount = openSubmenu === "createAccount";

  return (
    <Container>
      <Actions>
        <Button onClick={() => setOpenSubmenu("createAccount")}>
          Create New Account
        </Button>
        <Button onClick={() => setOpenSubmenu("login")}>
          Connect with account
        </Button>
      </Actions>
      <ConditionnalSubMenu displayed={isSubMenuOpen}>
        {isCreatingAccount ? (
          <CreateAccountForm />
        ) : (
          <LoginForm setPlayerName={setPlayerName} />
        )}
      </ConditionnalSubMenu>
    </Container>
  );
}
