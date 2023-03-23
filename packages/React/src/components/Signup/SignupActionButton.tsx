import { Dispatch, SetStateAction } from "react";
import { Button } from "./styles";
import { SubMenu } from "./types";

interface Props {
  label: string;
  submenuName: SubMenu;
  setOpenSubmenu: Dispatch<SetStateAction<SubMenu | undefined>>;
}

export function SignupActionButton({
  label,
  submenuName,
  setOpenSubmenu,
}: Props) {
  return <Button onClick={() => setOpenSubmenu(submenuName)}>{label}</Button>;
}
