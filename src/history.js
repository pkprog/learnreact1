import React from 'react';
import { ArrowUpSquare, ArrowDownSquare  } from "react-bootstrap-icons";

class History extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortDirection: true //true - по возрастанию
        }
    }

    changeSortDirection() {
        this.setState({
            sortDirection: !this.state.sortDirection
        });
    }

    render() {
        const history = this.props.history;
        const direction = this.state.sortDirection;
        const lastSelected = this.props.lastSelected;

        const moves = history.map((step, move) => {
            const dsc = move !== 0 ? 'Шаг №' + move : 'Начало';

            let coord = "";
            if (step.stepSquare.i != null && step.stepSquare.x != null && step.stepSquare.y != null) {
                coord = '(' + step.stepSquare.x + ', ' + step.stepSquare.y + ')';
            }

            const baseClass = "col-6";
            let highlightClass = "";
            if (lastSelected >= 0 && move === lastSelected) {
                highlightClass = "text-info bg-dark";
            }

            return {
                move: move,
                jsx: (
                    <li key={move}>
                        <div className="row">
                            <div className="col-6">
                                <button onClick={() => this.props.jumpTo(move)}>{dsc}</button>
                            </div>
                            <div className={[baseClass, highlightClass].join(" ")}>
                                <label>{coord}</label>
                            </div>
                        </div>
                    </li>
                )
            }
        });

        moves.sort((v1, v2) => {
            if (direction) {
                return v1.move >= v2.move;
            } else {
                return v1.move < v2.move;
            }
        })

        const sortedMoves = moves.map((move) => {
            return move.jsx;
        })

        function SortButton(props) {
            if (props.direction) {
                return (
                    <button onClick={props.sort} title="По возрастанию" type="button" className="btn btn-secondary">
                        <ArrowUpSquare/>
                    </button>
                );
            } else {
                return (
                    <button onClick={props.sort} title="По убыванию" type="button" className="btn btn-secondary">
                        <ArrowDownSquare/>
                    </button>
                );
            }
        }

        return (
            <div>
                <SortButton
                    direction = {this.state.sortDirection}
                    sort = {() => this.changeSortDirection()}
                />
                <ul className="list-unstyled">{sortedMoves}</ul>
            </div>
        );
    }

}

export { History };
