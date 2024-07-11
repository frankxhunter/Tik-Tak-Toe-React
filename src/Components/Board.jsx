import Square from "./Square"

export default function Board({ nextValue, squares, handleOnClick }) {
  const { winner, whichWinners } = calculateWinner(squares)

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
      whichWinners: Array(9).fill(false)
    }
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2],
    ]
    for (let i = 0; i < lines.length && !result.winner; i++) {
      const a = lines[i][0]
      const b = lines[i][1]
      const c = lines[i][2]
      if (squares[a] !== "" && squares[a] === squares[b] && squares[a] === squares[c]) {
        result.winner = squares[a];
        result.whichWinners[a] = true;
        result.whichWinners[b] = true;
        result.whichWinners[c] = true;

      }
    }
    return result
  }

  return <>

    {winner ?
      <h3 className="status" >El ganador es: <span className="status-value" >{winner}</span></h3>
      :
      <h3 className="status" >Siguiente jugador: <span className="status-value" >{nextValue}</span></h3>

    }
    <div className="game-table">
      <hr className="game-hr hr1" />
      <hr className="game-hr hr2" />
      <hr className="game-hr hr3" />
      <hr className="game-hr hr4" />
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
