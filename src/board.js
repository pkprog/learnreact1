import React from 'react';
import {Square} from "./square";
import {MAX_STEPS} from "./game";

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
            cellNumber = {cellNumber}
            onClick = {() => this.props.onClick(cellNumber, x,y)}
            win = {winSquare}
        />);
    }

    renderRow(cellsCount, y) {
        const result = Array(cellsCount);
        for (let j = 0; j < cellsCount; j++) {
            result.push(
                this.renderSquare(j + y * cellsCount, j, y)
            )
        }
        return result;
    }

    renderRowsList() {
        const rows = Math.sqrt(MAX_STEPS);
        const result = Array(rows);
        for (let y = 0; y < rows; y++) {
            result.push(
                <div className="board-row">
                    {this.renderRow(rows, y)}
                </div>
            );
        }
        return result;
    }

    render() {
        const rows = this.renderRowsList();
        return (
            <div>
                {rows}
            </div>
        );
    }
}

export { Board };
