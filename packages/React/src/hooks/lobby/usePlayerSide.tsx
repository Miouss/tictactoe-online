import { Dispatch, createContext, useContext, useReducer } from "react";
import { PlayerSide } from "@types";

type Action = { type: "SET_PLAYER_SIDE"; payload: PlayerSide | undefined };

interface PlayerSideContextType {
  playerSide: PlayerSide | undefined;
  setPlayerSide: (payload: PlayerSide | undefined) => void;
}

const PlayerSideContext = createContext<PlayerSideContextType>({
  playerSide: undefined,
  setPlayerSide: () => {},
});

interface Props {
  children: React.ReactNode;
}

function reducer(state: PlayerSide | undefined, action: Action) {
  switch (action.type) {
    case "SET_PLAYER_SIDE":
      return action.payload;
    default:
      return state;
  }
}
function createAction(payload: PlayerSide | undefined): Action {
  return { type: "SET_PLAYER_SIDE", payload };
}
export function PlayerSideProvider({ children }: Props) {
  const [playerSide, dispatch] = useReducer(reducer, undefined);

  return (
    <PlayerSideContext.Provider
      value={{
        playerSide,
        setPlayerSide: (payload: PlayerSide | undefined) =>
          dispatch(createAction(payload)),
      }}
    >
      {children}
    </PlayerSideContext.Provider>
  );
}

export function usePlayerSide() {
  return useContext(PlayerSideContext);
}
