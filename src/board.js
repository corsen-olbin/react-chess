import React from 'react';

class Board extends React.Component {

  renderSquare(i, j) {
    return (
      <Square
        value={this.props.squares[i][j].type}
        pieceColor={this.props.squares[i][j].color}
        onClick={() => this.props.onClick(i, j)}
      />
    );
  }

  renderBlackSquare(i, j) {
    return (
      <BlackSquare
        value={this.props.squares[i][j].type}
        pieceColor={this.props.squares[i][j].color}
        onClick={() => this.props.onClick(i, j)}
      />
    );
  }

  render() {

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0, 0)}
          {this.renderBlackSquare(0, 1)}
          {this.renderSquare(0, 2)}
          {this.renderBlackSquare(0, 3)}
          {this.renderSquare(0, 4)}
          {this.renderBlackSquare(0, 5)}
          {this.renderSquare(0, 6)}
          {this.renderBlackSquare(0, 7)}
        </div>
        <div className="board-row">
          {this.renderBlackSquare(1, 0)}
          {this.renderSquare(1, 1)}
          {this.renderBlackSquare(1, 2)}
          {this.renderSquare(1, 3)}
          {this.renderBlackSquare(1, 4)}
          {this.renderSquare(1, 5)}
          {this.renderBlackSquare(1, 6)}
          {this.renderSquare(1, 7)}
        </div>
        <div className="board-row">
          {this.renderSquare(2, 0)}
          {this.renderBlackSquare(2, 1)}
          {this.renderSquare(2, 2)}
          {this.renderBlackSquare(2, 3)}
          {this.renderSquare(2, 4)}
          {this.renderBlackSquare(2, 5)}
          {this.renderSquare(2, 6)}
          {this.renderBlackSquare(2, 7)}
        </div>
        <div className="board-row">
          {this.renderBlackSquare(3, 0)}
          {this.renderSquare(3, 1)}
          {this.renderBlackSquare(3, 2)}
          {this.renderSquare(3, 3)}
          {this.renderBlackSquare(3, 4)}
          {this.renderSquare(3, 5)}
          {this.renderBlackSquare(3, 6)}
          {this.renderSquare(3, 7)}
        </div>
        <div className="board-row">
          {this.renderSquare(4, 0)}
          {this.renderBlackSquare(4, 1)}
          {this.renderSquare(4, 2)}
          {this.renderBlackSquare(4, 3)}
          {this.renderSquare(4, 4)}
          {this.renderBlackSquare(4, 5)}
          {this.renderSquare(4, 6)}
          {this.renderBlackSquare(4, 7)}
        </div>
        <div className="board-row">
          {this.renderBlackSquare(5, 0)}
          {this.renderSquare(5, 1)}
          {this.renderBlackSquare(5, 2)}
          {this.renderSquare(5, 3)}
          {this.renderBlackSquare(5, 4)}
          {this.renderSquare(5, 5)}
          {this.renderBlackSquare(5, 6)}
          {this.renderSquare(5, 7)}
        </div>
        <div className="board-row">
          {this.renderSquare(6, 0)}
          {this.renderBlackSquare(6, 1)}
          {this.renderSquare(6, 2)}
          {this.renderBlackSquare(6, 3)}
          {this.renderSquare(6, 4)}
          {this.renderBlackSquare(6, 5)}
          {this.renderSquare(6, 6)}
          {this.renderBlackSquare(6, 7)}
        </div>
        <div className="board-row">
          {this.renderBlackSquare(7, 0)}
          {this.renderSquare(7, 1)}
          {this.renderBlackSquare(7, 2)}
          {this.renderSquare(7, 3)}
          {this.renderBlackSquare(7, 4)}
          {this.renderSquare(7, 5)}
          {this.renderBlackSquare(7, 6)}
          {this.renderSquare(7, 7)}
        </div>
      </div>
    );
  }
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

export default Board