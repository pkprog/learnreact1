import React from 'react';

function Square(props) {
    const baseClass = "square";
    const highlightClass = props.win ? "win-square" : "";
    return (
        <button className={[baseClass, highlightClass].join(" ")} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export { Square };

/*
class Square extends React.Component {
    render() {
        return (
            <button
                className="square"
                onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>
        );
    }
}
*/
