import React from 'react';
import ReactDOM from 'react-dom';

import Board from './board.js';
import './index.css';

const backLine = ['R', 'k', 'B', 'K', 'Q', 'B', 'k', 'R'];

function InitialState() {
  var squares = new Array(8).fill(null).map(i => new Array(8).fill(null));

  // black side
  backLine.forEach((x, i) => {
    squares[0][i] = {
      color: 'black',
      type: x
    };
  });

  for (let i = 0; i < 8; i++) {
    squares[1][i] = {
      color: 'black',
      type: 'p'
    };
  };

  //middle
  for (let i = 2; i < 6; i++) {
    for (let j = 0; j < 8; j++) {
      squares[i][j] = {
        color: null,
        type: null
      };
    }
  }

  // white side
  for (let i = 0; i < 8; i++) {
    squares[6][i] = {
      color: 'white',
      type: 'p'
    };
  };

  backLine.forEach((x, i) => {
    squares[7][i] = {
      color: 'white',
      type: x
    };
  });

  return squares;
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: InitialState(),
        moveMade: null
      }],
      stepNumber: 0,
      blackIsNext: false,
      isSelectState: true,
      selectedSquare: null,
      status: 'White\'s Turn'
    };
  }

  movePiece(squares, originalLoc, newLoc) {
    squares[newLoc.row][newLoc.column] = squares[originalLoc.row][originalLoc.column];
    squares[originalLoc.row][originalLoc.column] = {
      color: null,
      type: null
    }
    return squares;
  }

  setStatus(message) {
    this.setState({
      status: message
    });
  }

  handleClick(i, j) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const isSelectState = this.state.isSelectState;
    const selectedSquare = this.state.selectedSquare;

    var squares = current.squares.slice();
    var status;
    var newSquares;

    if (isSelectState) {
      if (!squares[i][j].type) {
        this.setStatus("That piece doesn't exist!");
        return;
      }
      status = 'Square (' + i + ', ' + j + ') Selected';
      newSquares = squares;
    }
    else {
      if (i === selectedSquare) {
        return;
      }
      else if (selectedSquare != null) {
        newSquares = this.movePiece(squares, selectedSquare, { row: i, column: j });
      }
    }

    this.setState({
      history: history.concat([{
        squares: newSquares,
        moveMade: {
          row: i,
          column: j
        }
      }]),
      stepNumber: history.length,
      blackIsNext: !this.state.blackIsNext,
      isSelectState: !this.state.isSelectState,
      selectedSquare: isSelectState ? { row: i, column: j } : null,
      status: status
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const status = this.state.status;
    // const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move + ' (' + step.moveMade.column + ', ' + step.moveMade.row + ')' :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    });

    // if (winner) {
    //   status = 'Winner: ' + winner;
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // }


    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i, j) => this.handleClick(i, j)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


