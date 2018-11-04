import React, { Component } from "react";
import { connect } from "react-redux";
import { newGameStep, jumpTo } from "../store/reducers/tictactoe";

import Board from "../components/Board";
import "./TicTacToe.css";

class TicTacToe extends Component {
  constructor(props) {
    super(props);
    this.handleClick.bind(this);
  }

  handleClick(i) {
    const history = this.props.history.slice(0, this.props.step + 1);
    const current = history[this.props.step];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = this.props.xIsNext ? "X" : "O";
    const newHistory = history.concat([
      {
        squares
      }
    ]);
    this.props.newGameStep(newHistory);
  }

  render() {
    const history = this.props.history;
    const step = this.props.step;
    const current = history[step];
    const winner = calculateWinner(current.squares);

    const moves = history.map((_, move) => {
      const desc = move ? `Jump to move #${move}` : "Jump to Game Start";

      return (
        <li key={move}>
          <button onClick={() => this.props.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    const status = winner
      ? `Winner is ${winner}`
      : step === 9
        ? "Game end in a draw"
        : `Next player: ${this.props.xIsNext ? "X" : "O"}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

const calculateWinner = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const mapStateToProps = state => {
  return state.tictactoe;
};

const mapDispatchToProps = {
  newGameStep,
  jumpTo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicTacToe);
