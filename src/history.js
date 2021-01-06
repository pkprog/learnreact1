import React from 'react';

class History extends React.Component {

    render() {
        const history = this.props.history;
        const lastSelected = this.props.lastSelected;

        const moves = history.map((step, move) => {
            const dsc = move !== 0 ? 'Шаг №' + move : 'Начало';

            let coord = "";
            if (step.stepSquare.i != null && step.stepSquare.x != null && step.stepSquare.y != null) {
                coord = '(' + step.stepSquare.x + ', ' + step.stepSquare.y + ')';
            }

            let highlightClass = "";
            if (lastSelected >= 0 && move === lastSelected) {
                highlightClass = "text-info bg-dark";
            }

            return (
                <li key={move}>
                    <div className="row">
                        <div className="col-6">
                            <button onClick={() => this.props.jumpTo(move)}>{dsc}</button>
                        </div>
                        <div className={[highlightClass].join("col-6")}>
                            <label>{coord}</label>
                        </div>
                    </div>
                </li>
            );
        });

        return (
            <ol>{moves}</ol>
        );
    }

}

export { History };
