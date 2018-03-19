import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider, connect } from "react-redux";
import store from "./store/index";
import { setMark } from "./actions/index";

window.store = store;
window.setMark = setMark;

function Square(props) {
    return (
    <button className="square" onClick={() => props.onClick()}>
        {props.value}
    </button>
    );
}

const mapStateToProps = state => {
  return {
    squares: state.squares,
    xIsNext: state.xIsNext
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setMark: (mark, square) => dispatch(setMark(mark, square))
  };
};

class ConnectedBoard extends React.Component {
  renderSquare(i) {
    return <Square value={ this.props.squares[i] } onClick={() => this.handleClick(i)}/>;
  }

  handleClick(i) {
      if(this.props.squares[i] !== null  || this.calculateWinner(this.props.squares)) {
          return;
      }

      this.props.setMark(this.props.xIsNext ? "x" : "o", i);
      // squares[i] = this.props.xIsNext ? 'x' : 'o';
      // this.setState({
      //     squares: squares,
      //     xIsNext: !this.state.xIsNext
      // });
  }

  calculateWinner(squares) {
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
  };

  render() {
      const winner = this.calculateWinner(this.props.squares);
      let status;

      if(winner) {
          status = 'Winner: ' + winner;
      } else {
          status = 'Next player: ' + (this.props.xIsNext ? 'x' : 'o');
      }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

const Board = connect(mapStateToProps, mapDispatchToProps)(ConnectedBoard);

  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  // ========================================

  ReactDOM.render(
    <Provider store={store}>
      <Game />
    </Provider>,
    document.getElementById('root')
  );
