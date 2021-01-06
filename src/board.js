import React from 'react';
import {Square} from "./square";

class Board extends React.Component {
    renderSquare(cellNumber, x,y) {
        let winSquare = false;
        if (this.props.winSquares) {
            const checked = this.props.winSquares.some((el) => {
                return el === cellNumber;
            });
            if (checked) {
                winSquare = true;
            }
        }

        return (<Square
            value = {this.props.squares[cellNumber].i}
            onClick = {() => this.props.onClick(cellNumber, x,y)}
            win = {winSquare}
        />);
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0, 0, 0)}
                    {this.renderSquare(1, 1, 0)}
                    {this.renderSquare(2, 2, 0)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3, 0, 1)}
                    {this.renderSquare(4, 1, 1)}
                    {this.renderSquare(5, 2, 1)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6, 0, 2)}
                    {this.renderSquare(7, 1, 2)}
                    {this.renderSquare(8, 2, 2)}
                </div>
            </div>
        );
    }
}

export { Board };
