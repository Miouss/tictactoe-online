import { useState } from "react";
import { socket } from "../../main";
import { TictactoeBoardSquare as Square } from "./TictactoeBoardSquare";
import { createBoard, replayGame } from "./utils";
import { useGameListeners, useGameEmitters, useResetSquares } from "./hooks";
import { TicTacToe, Board, GameStatus } from "./styles";
import { GameIssue, ResetBoard } from "./types";
import { SideSign } from "@types";

interface Props {
  playerSign: SideSign | undefined;
}

export function Tictactoe({ playerSign }: Props) {
  const isGameOwner = playerSign === "X";
  const [canPlay, setCanPlay] = useState(isGameOwner);
  const [gameIssue, setGameIssue] = useState<GameIssue>("running");
  const [squaresStates, setSquaresStates] = useState(Array(9).fill(null));
  const [resetBoard, setResetBoard] = useState<ResetBoard>("pending");

  const opponentSign = playerSign === "X" ? "O" : "X";
  const isGameRunning = gameIssue === "running";
  const isGameRunningAndCanPlay = canPlay && isGameRunning;

  const handleReplayButtonClick = () => {
    replayGame(socket, setSquaresStates, setGameIssue, setResetBoard);
  };

  const handleBoardCreation = () => {
    if (resetBoard === "pending") {
      return createBoard(playerSign, Square);
    }
  };

  useResetSquares(resetBoard, setResetBoard);

  useGameListeners(
    socket,
    playerSign,
    opponentSign,
    setCanPlay,
    setSquaresStates,
    setGameIssue,
    setResetBoard
  );

  useGameEmitters(socket, squaresStates, playerSign, canPlay);

  return (
    <>
      <GameStatus hidden={isGameRunning}>
        <h3>{`You ${gameIssue} the game!`}</h3>
        {isGameOwner && (
          <button onClick={handleReplayButtonClick}>Replay ?</button>
        )}
      </GameStatus>

      <TicTacToe>
        <Board playing={isGameRunningAndCanPlay}>{handleBoardCreation()}</Board>
      </TicTacToe>
    </>
  );
}
