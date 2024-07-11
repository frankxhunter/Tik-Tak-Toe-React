export default function Square({ value, handleFunction, isWin }) {
  return <div
    className={"square " + (isWin ? "squareWin " : "") + (value? "squareUsed":"squareUnsed")}
    onClick={handleFunction}
  >
    {value}
  </div>
}

