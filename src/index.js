import React from 'react';
import ReactDOM from 'react-dom';
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

function Square(props) {
  return (
    <button className={"square " + props.pieceColor} onClick={props.onClick}>
      {props.value}
    </button>
  )
}

function BlackSquare(props) {
  return (
    <button className={"blacksquare " + props.pieceColor} onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i].type}
        pieceColor={this.props.squares[i].color}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderBlackSquare(i) {
    return (
      <BlackSquare
        value={this.props.squares[i].type}
        pieceColor={this.props.squares[i].color}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderBlackSquare(1)}
          {this.renderSquare(2)}
          {this.renderBlackSquare(3)}
          {this.renderSquare(4)}
          {this.renderBlackSquare(5)}
          {this.renderSquare(6)}
          {this.renderBlackSquare(7)}
        </div>
        <div className="board-row">
          {this.renderBlackSquare(8)}
          {this.renderSquare(9)}
          {this.renderBlackSquare(10)}
          {this.renderSquare(11)}
          {this.renderBlackSquare(12)}
          {this.renderSquare(13)}
          {this.renderBlackSquare(14)}
          {this.renderSquare(15)}
        </div>
        <div className="board-row">
          {this.renderSquare(16)}
          {this.renderBlackSquare(17)}
          {this.renderSquare(18)}
          {this.renderBlackSquare(19)}
          {this.renderSquare(20)}
          {this.renderBlackSquare(21)}
          {this.renderSquare(22)}
          {this.renderBlackSquare(23)}
        </div>
        <div className="board-row">
          {this.renderBlackSquare(24)}
          {this.renderSquare(25)}
          {this.renderBlackSquare(26)}
          {this.renderSquare(27)}
          {this.renderBlackSquare(28)}
          {this.renderSquare(29)}
          {this.renderBlackSquare(30)}
          {this.renderSquare(31)}
        </div>
        <div className="board-row">
          {this.renderSquare(32)}
          {this.renderBlackSquare(33)}
          {this.renderSquare(34)}
          {this.renderBlackSquare(35)}
          {this.renderSquare(36)}
          {this.renderBlackSquare(37)}
          {this.renderSquare(38)}
          {this.renderBlackSquare(39)}
        </div>
        <div className="board-row">
          {this.renderBlackSquare(40)}
          {this.renderSquare(41)}
          {this.renderBlackSquare(42)}
          {this.renderSquare(43)}
          {this.renderBlackSquare(44)}
          {this.renderSquare(45)}
          {this.renderBlackSquare(46)}
          {this.renderSquare(47)}
        </div>
        <div className="board-row">
          {this.renderSquare(48)}
          {this.renderBlackSquare(49)}
          {this.renderSquare(50)}
          {this.renderBlackSquare(51)}
          {this.renderSquare(52)}
          {this.renderBlackSquare(53)}
          {this.renderSquare(54)}
          {this.renderBlackSquare(55)}
        </div>
        <div className="board-row">
          {this.renderBlackSquare(56)}
          {this.renderSquare(57)}
          {this.renderBlackSquare(58)}
          {this.renderSquare(59)}
          {this.renderBlackSquare(60)}
          {this.renderSquare(61)}
          {this.renderBlackSquare(62)}
          {this.renderSquare(63)}
        </div>
      </div>
    );
  }
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
      xIsNext: true,
      isSelectState: true,
      selectedSquare: null
    };
  }



  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const isSelectState = this.state.isSelectState;
    const selectedSquare = this.state.selectedSquare;

    var squares = current.squares.slice();

    if (!squares[i].type && isSelectState) {
      return;
    }

    if(i === selectedSquare && !isSelectState){
      return;
    }

    if (!isSelectState && selectedSquare != null) {
      squares[i] = squares[selectedSquare];
      squares[selectedSquare] = {
        color: null,
        type: null
      };
    }

    this.setState({
      history: history.concat([{
        squares: squares,
        moveMade: {
          column: i % 3,
          row: Math.floor(i / 3)
        }
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      isSelectState: !this.state.isSelectState,
      selectedSquare: isSelectState ? i : null
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

    let status;
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

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];

//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }

// ========================================


var isWhite = true;
var outputString = '';
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    var position = (i * 8) + j;
    if (isWhite)
      outputString += '{this.renderSquare(' + position + ')} \n';
    else
      outputString += '{this.renderBlackSquare(' + position + ')} \n';
    isWhite = !isWhite;
  }
  isWhite = !isWhite;
}
console.log(outputString);

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


