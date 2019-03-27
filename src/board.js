import React from 'react';

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