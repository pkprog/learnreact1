import React from 'react';
import {Board} from "./board";
import {History} from "./history";

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [
                {
                    squares: Array(MAX_STEPS).fill({i: null, x: null, y: null}),
                    stepSquare: {i: null, x: null, y: null},
                    winSquares: null
                }
            ],
            xIsNext: true,
            stepNumber: 0,
            lastSelected: null
        }
    }

    handleClick(cellNumber, x,y) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        //Копируем всё в новый массив
        const squares = current.squares.slice();

        if (squares[cellNumber].i) {
            return;
        }
        if (current.winSquares) {
            return;
        }

        squares[cellNumber] = {
            i: this.state.xIsNext ? 'X' : 'O',
            x: x,
            y: y
        };

        const winResult = calculateWinner(squares);
        const newState = {...this.state,
            history: history.concat([{
                squares: squares,
                stepSquare: {
                    i: cellNumber,
                    x: x,
                    y: y
                },
                winSquares: winResult ? winResult.squares : null
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
            lastSelected: null
        };
        this.setState(newState);
    }

    jumpTo(stepNumber) {
        this.setState({
            stepNumber: stepNumber,
            xIsNext: (stepNumber %2) === 0,
            lastSelected: stepNumber
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares);

        // const moves = history.map((step, move) => {
        //     const dsc = move ? 'Шаг №' + move : 'Начало'
        //     return (
        //         <li key={move}>
        //             <button onClick={() => this.jumpTo(move)}>{dsc}</button>
        //         </li>
        //     );
        // });

        let gameStatus;
        if (winner) {
            gameStatus = "Победитель: " + winner.i;
        } else if (this.state.stepNumber === MAX_STEPS) {
            gameStatus = "Ничья";
        } else {
            gameStatus = 'Следующий ходит: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game row">
                <div className="game-board col-6">
                    <Board
                        squares = {current.squares}
                        winSquares = {current.winSquares}
                        onClick = {(cellNumber, x,y) => this.handleClick(cellNumber, x,y)}
                    />
                </div>
                <div className="game-info col-6">
                    <div>{gameStatus}</div>
                    <History
                        history = {this.state.history}
                        jumpTo = {(move) => this.jumpTo(move)}
                        lastSelected = {this.state.lastSelected}
                    />
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
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

    const winResult = {
        squares: null,
        i: null
    };

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a].i && squares[a].i === squares[b].i && squares[a].i === squares[c].i) {
            winResult.squares = [a, b, c];
            winResult.i = squares[a].i;
            return winResult;
        }
    }
    return null;
}

const MAX_STEPS = 9;

export { Game, MAX_STEPS };
