import { Dispatch, SetStateAction } from "react";
import { SideSign } from "@types";
import { PlayerMenuLogoutButton as LogoutButton } from "./PlayerMenuLogoutButton";
import { PlayerMenuDelAccountButton as DelAccountButton } from "./PlayerMenuDelAccountButton";
import { PlayerMenuChangePasswordButton as ChangePasswordButton } from "./PlayerMenuChangePasswordButton";
import { FlexBox } from "../../styles";

interface Props {
  playerName: string;
  setPlayerName: Dispatch<SetStateAction<string>>;
  setPlayerSign: Dispatch<SetStateAction<SideSign | undefined>>;
  children?: React.ReactNode;
}

export function PlayerMenu({
  playerName,
  setPlayerName,
  setPlayerSign,
  children,
}: Props) {
  return (
    <FlexBox direction="column" gap="2rem">
      <label style={{ textAlign: "center" }}>{playerName}</label>
      {children}
      <FlexBox direction="column">
        <ChangePasswordButton playerName={playerName} />
        <LogoutButton
          setPlayerName={setPlayerName}
          setPlayerSign={setPlayerSign}
        />
        <DelAccountButton
          playerName={playerName}
          setPlayerName={setPlayerName}
          setPlayerSign={setPlayerSign}
        />
      </FlexBox>
    </FlexBox>
  );
}
