import React from 'react';
import ReactDOM from 'react-dom';

import Board from './board.js';
import './index.css';

const backLine = ['R', 'k', 'B', 'K', 'Q', 'B', 'k', 'R'];

function InitialState() {
  var squares = Array(64);

  // black side
  backLine.forEach((x, i) => { 
    squares[i] = {
      color: 'black',
      type: x 
    };
  });

  for(let i = 0; i < 8; i++) {
    squares[8+i] = {
      color: 'black',
      type: 'p'
    };
  };

  //middle
  for(let i = 16; i < 48; i++){
    squares[i] = {
      color: null,
      type: null
    };
  }

  // white side
  for(let i = 0; i < 8; i++) {
    squares[48+i] = {
      color: 'white',
      type: 'p'
    };
  };

  backLine.forEach((x, i) => { 
    squares[56+i] = {
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
    squares[newLoc] = squares[originalLoc];
    squares[originalLoc] = {
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

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const isSelectState = this.state.isSelectState;
    const selectedSquare = this.state.selectedSquare;

    var squares = current.squares.slice();
    var status;
    var newSquares;

    if (isSelectState) {
      if(!squares[i].type) {
        this.setStatus("That piece doesn't exist!");
        return;
      }
      status = 'Square ' + i + ' Selected';
      newSquares = squares;
    }
    else {
      if(i === selectedSquare) {
        return;
      }      
      else if (selectedSquare != null) {
        newSquares = this.movePiece(squares, selectedSquare, i);
      }
    }

    this.setState({
      history: history.concat([{
        squares: newSquares,
        moveMade: {
          column: i % 3,
          row: Math.floor(i / 3)
        }
      }]),
      stepNumber: history.length,
      blackIsNext: !this.state.blackIsNext,
      isSelectState: !this.state.isSelectState,
      selectedSquare: isSelectState ? i : null,
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
    var render = Array(64);

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
            onClick={(i) => this.handleClick(i)}
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


