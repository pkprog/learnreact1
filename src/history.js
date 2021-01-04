import React from 'react';

class History extends React.Component {

    render() {
        const history = this.props.history;

        const moves = history.map((step, move) => {
            const dsc = move ? 'Шаг №' + move : 'Начало'
            return (
                <li key={move}>
                    <button onClick={() => this.props.jumpTo(move)}>{dsc}</button>
                </li>
            );
        });

        return (
            <ol>{moves}</ol>
        );
    }

}

export { History };
