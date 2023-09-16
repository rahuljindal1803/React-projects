import React, { useState } from "react";
import Board from "./component/Board";
import Player from "./component/Player";
import "./App.css";
const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (square) => {
    const lines = [
      [0, 1, 2], // 1st row
      [3, 4, 5], // 2st row
      [6, 7, 8], // 3st row
      [0, 3, 6], // 1st column
      [1, 4, 7], //2nd column
      [2, 5, 8], // 3rd column
      [0, 4, 8], //first diagonal
      [2, 4, 6], //second diagonal
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      if (square[a] === square[b] && square[a] === square[c]) {
        return square[a];
      }
    }
    return null;
  };
  const handleClick = (i) => {
    if (calculateWinner(board) || board[i]) {
      return;
    }
    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };
  let winner = calculateWinner(board);
  let status;
  if (winner) {
    status = `Winner : ${winner}`;
  } else {
    status = `Next Player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board squares={board} onClick={handleClick} />
        </div>
        <div className="player-info">
          <Player player={status} />
        </div>
      </div>
    </>
  );
};

export default App;
