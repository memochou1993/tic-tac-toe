import React, { useState } from 'react';
import Board from './../Board';
import './style.css';

const Game = () => {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);

  const [step, setStep] = useState(0);

  const judge = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  }

  const handleClick = (i) => {
    const slice = history.slice(0, step + 1);
    const current = slice[slice.length - 1];
    const squares = [...current.squares];

    if (judge(squares) || squares[i]) {
      return;
    }

    squares[i] = step % 2 ? 'O' : 'X';

    setHistory([...slice, { squares }]);
    setStep(slice.length);
  }

  const current = history[step];
  const winner = judge(current.squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${step % 2 ? 'O' : 'X'}`;
  const moves = history.map((move, index) => {
    return (
      <li
        key={index}
      >
        <button
          onClick={() => setStep(index)}
        >
          {`Go to move #${index}`}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => { handleClick(i) }}
        />
      </div>
      <div className="game-info">
        <div>
          {status}
        </div>
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  );
};

export default Game;
