interface Props {
  placeholder: string;
  name: string;
  buttonLabel: string;
}

export   const flexGap = {
  display: "flex",
  gap: "0.5rem",
};


export function LobbyFormContents({ placeholder, name, buttonLabel }: Props) {
  return (
    <>
      <input placeholder={placeholder} name={name} />
      <button type="submit">{buttonLabel}</button>
    </>
  );
}
