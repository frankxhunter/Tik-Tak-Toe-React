import { useState } from "react";
import Board from "./Board"

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill("")]);
  const [currentMove, setCurrentMove] = useState(0)
  const currentBoard = history[currentMove];
  const next = currentMove % 2 === 0 ? "X" : "O"

  const [isAscending, setAscending] = useState(true)


  function invertDirection() {
      setAscending(!isAscending)
  }

  function handlePlay(squares) {
    setHistory([...history.slice(0, currentMove + 1), squares])
    setCurrentMove(currentMove + 1)
  }

  function jumpToMove(i) {
    setCurrentMove(i);
  }

  const moves = history.map((squares, i) => {
    let description = "";
    if (i > 0) {
      description = "Ir al movimiento: #" + i;
    } else {
      description = "Ir al inicio del juego"
    }
    return <li key={i}>
      <button onClick={() => jumpToMove(i)} >{description}</button>
    </li>
  })


  return <div className="game">
    <h1>Tik Tak Toe </h1>
    <div className="game-board">
      <Board nextValue={next} squares={currentBoard} handleOnClick={handlePlay} />
    </div>
    <div className="game-info">
        <button onClick={invertDirection}>{isAscending ? "Ascendiente" : "Descendiente"}</button>
        <ul>
            {isAscending ? moves : moves.reverse()}
        </ul>

    </div>


  </div>
}




