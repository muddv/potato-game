import type { NextPage } from 'next'
import { useState } from 'react'
import { gameState, gameEvent, diceRoll, burrow, useDestiny, usePotatoes, useOrcs, useDanger } from "../game/game-logic"

const Wow: NextPage = () => {

    const { destiny, desChange } = useDestiny()
    const { potatoes, potChange } = usePotatoes()
    const { orcs, orcChange } = useOrcs()
    const { danger, dangerChange } = useDanger()

    const [gameEventDescription, setGameEventDescription] = useState("")
    const [gameEventEffect, setGameEventEffect] = useState([0, 0, 0])

    function displayEventDescription() {
        setGameEventDescription(gameEvent.description)
    }
    function displayEventEffect() {
        setGameEventEffect(gameEvent.effect)
    }
    return (
        <>
            <div className="flex flex-col h-screen w-screen justify-center items-center">
                <div>
                    <div>Destiny {destiny}</div>
                    <div>Potatoes {potatoes}</div>
                    <div>Orcs {orcs}</div>
                </div>
                <div>
                    <div>
                        <button onClick={() => { burrow(); potChange(); orcChange(); }} className="border-2 border-black hover:bg-slate-400">
                            BURROW: trade {danger} potato for -1 orc
                        </button>
                    </div>
                    <div>
                        <button onClick={() => { diceRoll(); potChange(); orcChange(); desChange(); dangerChange(); displayEventDescription(); displayEventEffect();}} className="border-2 border-black hover:bg-slate-400">
                            roll dice
                        </button>
                    </div>
                </div>
                <div>
                    EVENT:
                    <div>description {gameEventDescription}</div>
                    <div>effect {gameEventEffect}</div>
                </div>
            </div>
        </>
    )
}

export default Wow
