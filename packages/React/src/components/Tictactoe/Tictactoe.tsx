import { useEffect, useState } from "react";
import { TicTacToe, Board } from "../../styles";
import { TictactoeBoardSquare as Square } from "./TictactoeBoardSquare";
import { PlayerSign, squareId } from "@types";
import { socket } from "../../main";

type GameIssue = "running" | "win" | "lose";
type ResetSquares = boolean | "pending";

interface Props {
  playerSign: PlayerSign | undefined;
}
export function Tictactoe({ playerSign }: Props) {
  const isGameOwner = playerSign === "X";
  const [canPlay, setCanPlay] = useState(isGameOwner);
  const [gameIssue, setGameIssue] = useState<GameIssue>("running");
  const [squaresStates, setSquaresStates] = useState(Array(9).fill(null));
  const [resetSquares, setResetSquares] = useState<ResetSquares>("pending");
  const opponentSign = playerSign === "X" ? "O" : "X";
  const squares = () =>
    Array(9)
      .fill(null)
      .map((_, i) => {
        return (
          <Square
            key={`square${i}`}
            playerSign={playerSign}
            squareId={i as squareId}
          />
        );
      });

  socket.on("moveMade", (socketId: string, squareId: squareId) => {
    const isMoveMadeByOpponent = socket.id !== socketId;
    if (isMoveMadeByOpponent) {
      setCanPlay(true);
      setSquaresStates((prev) => {
        const newSquaresStates = prev;
        newSquaresStates[squareId] = opponentSign;
        return newSquaresStates;
      });
    } else {
      setCanPlay(false);
      setSquaresStates((prev: any[]) => {
        const newSquaresStates = prev;
        newSquaresStates[squareId] = playerSign;
        return newSquaresStates;
      });
    }
  });

  socket.on("gameEnded", (gameIssue: GameIssue) => {
    setGameIssue(gameIssue);
  });

  useEffect(() => {
    if (gameIssue === "running") return;
    alert(`You ${gameIssue} the game!`);
  }, [gameIssue]);

  useEffect(() => {
    if (isGameWin(squaresStates, playerSign)) {
      socket.emit("gameWin", socket.id);
    }
  }, [canPlay]);

  const resetFields = () => {
    setSquaresStates(Array(9).fill(null));
    setGameIssue("running");
    setResetSquares(true);
  };

  const replayGame = () => {
    resetFields();
    socket.emit("replayGame", socket.id);
  };

  socket.on("replayGame", resetFields);

  useEffect(() => {
    if (resetSquares === "pending") return;
    setResetSquares("pending");
  }, [resetSquares]);

  socket.on("replayGame", resetFields);

  return (
    <>
      {gameIssue !== "running" && isGameOwner && (
        <button onClick={replayGame}>Replay ?</button>
      )}

      <TicTacToe>
        <Board playing={canPlay && gameIssue === "running"}>
          {resetSquares === "pending" && squares()}
        </Board>
      </TicTacToe>
    </>
  );
}

function isGameWin(squaresStates: any[], playerSign: PlayerSign) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const playerSignsPos = squaresStates.reduce((acc: any[], curr, i) => {
    if (curr === playerSign) acc.push(i);
    return acc;
  }, []);

  return winningCombinations.some((winningCombination) =>
    winningCombination.every((winningPos) =>
      playerSignsPos.includes(winningPos)
    )
  );
}
