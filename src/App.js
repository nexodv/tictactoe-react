import { useState } from 'react';

function Square({ value, onSquareClick }) {
    return <button className="square" onClick={ onSquareClick }>{ value }</button>;
}

export default function Board() {

    // Declare shared state & handler in parent component to pass down to children
    const [xIsNext, setXisNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));

    function handleClick(i) {

        if (squares[i] || calculateWinner(squares)) {
            return;
          }

        // Using constants over variables to prevent constant re-rendering, among other things
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? "X" : "O";

        setSquares(nextSquares);
        setXisNext(!xIsNext);
    }

    function onResetClick() {
        const nextSquares = Array(9).fill(null);
        setSquares(nextSquares);
        setXisNext(true);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner == "tie") {
        status = "It's a tie!";
    }
    else if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    // Passing () => function, since otherwise, function would be called on render, resulting in infinite loop

    return (  
        <>
            <div id="container">
                <h1>TicTacToe</h1>
                <div className="board-row">
                    <Square value={ squares[0] } onSquareClick={ () => handleClick(0) } />
                    <Square value={ squares[1] } onSquareClick={ () => handleClick(1) } />
                    <Square value={ squares[2] } onSquareClick={ () => handleClick(2) } />
                </div>
                <div className="board-row">
                    <Square value={ squares[3] } onSquareClick={ () => handleClick(3) } />
                    <Square value={ squares[4] } onSquareClick={ () => handleClick(4) } />
                    <Square value={ squares[5] } onSquareClick={ () => handleClick(5) } />
                </div>
                <div className="board-row">
                    <Square value={ squares[6] } onSquareClick={ () => handleClick(6) } />
                    <Square value={ squares[7] } onSquareClick={ () => handleClick(7) } />
                    <Square value={ squares[8] } onSquareClick={ () => handleClick(8) } />
                </div>
                <div className="status">{status}</div>
                <button className="resetButton" onClick={ onResetClick }>Restart</button>
            </div>
        </>
    );
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
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    for (let i = 0; i <= 8; i++) {
        if (!squares[i]) {
            return null;
        }
    }
    return "tie";
}