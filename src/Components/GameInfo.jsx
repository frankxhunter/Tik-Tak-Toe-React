
export default function GameInfo({ history, jumpToMove, currentMove, restartAction }) {

    function handleBack() {
        if (currentMove > 0) {
            jumpToMove(currentMove - 1)
        }
    }
    function handleNext() {
        if (history[currentMove + 1]) {
            jumpToMove(currentMove + 1)
        }
    }


    return <>
        {/* <div className="game-info">
            <ul>
                {history.map((squares, i) => {
                    return <li key={i}>
                        <button onClick={() => jumpToMove(i)}>
                            {(i > 0) ?
                                "Ir al movimiento: #" + i :
                                "Ir al comienzo del juego"
                            }
                        </button>
                    </li>
                })}
            </ul>

        </div> */}
        <div className="container_buttons_info">
            <button className="button_info" onClick={handleBack} > {"<"}Back </button>
            <button className="button_info" onClick={restartAction} > Restart </button>
            <button className="button_info" onClick={handleNext} >Next{">"}</button>
        </div>

    </>
}