import { SideSign } from "@types";

export function isGameWin(squaresStates: any[], playerSign: SideSign) {
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
