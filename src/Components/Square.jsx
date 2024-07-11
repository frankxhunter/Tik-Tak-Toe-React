export default function Square({ value, handleFunction, isWin }) {
    return <div className={"square " + (isWin ? "squareWin" : "")} onClick={handleFunction} >{value}</div>
  }
  
 