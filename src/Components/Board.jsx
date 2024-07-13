import React, { useState } from "react"
import Square from "./Square"
import JSConfetti from "js-confetti"
import { useEffect } from "react"

export default function Board({ nextValue, squares, handleOnClick }) {
  const { winner, whichWinners, positionLineWin } = calculateWinner(squares)
  const [table , setTable] = useState(false)

  const confetti = React.useRef(null)




  useEffect(() => {
    confetti.current = new JSConfetti();

  }, [])

  useEffect(() => {
    const empties = squares.filter((e) => e === "");
    if (empties.length === 0) {
      setTable(true)
    }
    else{
      setTable(false)
    }

  }, [squares])



  useEffect(() => {
    if (winner){
      confetti.current.addConfetti();
    }
  }, [winner])

  function handleClick(i) {
    if (squares[i] === "" && winner == null) {
      const nextSquares = squares.slice()
      nextSquares[i] = nextValue
      handleOnClick(nextSquares)
    }
  }

  function calculateWinner(squares) {
    const result = {
      winner: null,
      whichWinners: Array(9).fill(false),
      positionLineWin: {
        top: 0,
        left: 0,
        angulo: 0,

      }
    }
    const lines = [
      { winner: [0, 1, 2], positionLineWin: { top: 42, left: 0, angulo: 0 } },
      { winner: [3, 4, 5], positionLineWin: { top: 142, left: 0, angulo: 0 } },
      { winner: [6, 7, 8], positionLineWin: { top: 242, left: 0, angulo: 0 } },
      { winner: [0, 3, 6], positionLineWin: { top: 140, left: -103, angulo: 90 } },
      { winner: [1, 4, 7], positionLineWin: { top: 140, left: 0, angulo: 90 } },
      { winner: [2, 5, 8], positionLineWin: { top: 140, left: 100, angulo: 90 } },
      { winner: [0, 4, 8], positionLineWin: { top: 134, left: -8, angulo: 45 } },
      { winner: [6, 4, 2], positionLineWin: { top: 134, left: 3, angulo: 135 } },


    ]
    for (let i = 0; i < lines.length && !result.winner; i++) {
      const a = lines[i].winner[0]
      const b = lines[i].winner[1]
      const c = lines[i].winner[2]
      if (squares[a] !== "" && squares[a] === squares[b] && squares[a] === squares[c]) {
        result.winner = squares[a];
        result.whichWinners[a] = true;
        result.whichWinners[b] = true;
        result.whichWinners[c] = true;
        result.positionLineWin = lines[i].positionLineWin

      }
    }
    return result
  }

  function calcuteWinner(){
    if(winner)
      return <h3 className="status" >El ganador es: <span className="status-value" >{winner}</span></h3>
    else if (table)
      return <h3 className="status" >El juego a quedado en tablas</h3>
    else 
      return <h3 className="status" >Siguiente jugador: <span className="status-value" >{nextValue}</span></h3>

  }

  return <>

    {
      calcuteWinner()
    }
    <div className="game-table">
      <hr className="game-hr hr1" />
      <hr className="game-hr hr2" />
      <hr className="game-hr hr3" />
      <hr className="game-hr hr4" />
      <hr className="game-hr hrWinner"
        style={
          !winner ?
            { display: "none" }
            : {
              top: positionLineWin.top + "px",
              left: positionLineWin.left + "px",
              transform: "rotate(" + positionLineWin.angulo + "deg)",
            }
        } />

      {(Array(3).fill(null)).map((_, rowIndex) => (
        <div className="board-row" key={rowIndex}>
          {
            (Array(3).fill(null).map((_, columnIndex) => {
              const squareIndex = rowIndex * 3 + columnIndex;
              return <Square key={squareIndex} isWin={whichWinners[squareIndex]} value={squares[squareIndex]} handleFunction={() => handleClick(squareIndex)} />
            }))
          }
        </div>
      ))}
    </div>
  </>;
}
