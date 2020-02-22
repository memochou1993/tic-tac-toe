import React, { Component } from 'react';
import Board from './../Board';
import './style.css';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      step: 0,
    };
  }

  judge(squares) {
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

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.step + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];

    if (this.judge(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.step % 2 ? 'O' : 'X';

    this.setState({
      history: [...history, { squares }],
      step: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      step: step,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.step];
    const winner = this.judge(current.squares);
    const status = winner
      ? `Winner: ${winner}`
      : `Next player: ${this.state.step % 2 ? 'O' : 'X'}`;
    const moves = history.map((move, index) => {
      return (
        <li
          key={index}
        >
          <button
            onClick={() => this.jumpTo(index)}
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
            onClick={(i) => { this.handleClick(i) }}
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
  }
}

export default Game;
