import { useState } from "react";
import Board from "./Board"
import GameInfo from "./GameInfo"

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill("")]);
  const [currentMove, setCurrentMove] = useState(0)
  const currentBoard = history[currentMove];
  const next = currentMove % 2 === 0 ? "X" : "O"


  function handlePlay(squares) {
    setHistory([...history.slice(0, currentMove + 1), squares])
    setCurrentMove(currentMove + 1)
  }

  function jumpToMove(i) {
    setCurrentMove(i);
  }
  function restartAction() {
    setHistory([Array(9).fill("")]);
    setCurrentMove(0);
  }



  return <div className="game">
    <h1>Tik Tak Toe </h1>
    <div className="game-board">
      <Board nextValue={next} squares={currentBoard} handleOnClick={handlePlay} />
    </div>
    <GameInfo 
    jumpToMove={jumpToMove} 
    history={history} 
    currentMove={currentMove} 
    restartAction={restartAction}
    />
  </div>
}




