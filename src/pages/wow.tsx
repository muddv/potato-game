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
    const [rollingDice, setRolling] = useState(false)

    function displayEventDescription() {
        setGameEventDescription(gameEvent.description)
    }
    function displayEventEffect() {
        setGameEventEffect(gameEvent.effect)
    }

    function handleDiceRoll() {
        diceRoll(); 
        potChange(); 
        orcChange(); 
        desChange(); 
        dangerChange(); 
        displayEventDescription(); 
        displayEventEffect();
        animateDice()
    }

    function animateDice() {
        setRolling(true)
        setTimeout(() => {
            setRolling(false)
        }, 1000)
    }

    function dice1ClassResolver() {
        if (rollingDice) {
            return "dice1"
        }
        else if (gameState.currentRolls != undefined) {
            if (gameState.currentRolls[0] == 1) {
                return "dice-static1"
            }
            if (gameState.currentRolls[0] == 2) {
                return "dice-static2"
            }
            if (gameState.currentRolls[0] == 3) {
                return "dice-static3"
            }
            if (gameState.currentRolls[0] == 4) {
                return "dice-static4"
            }
            if (gameState.currentRolls[0] == 5) {
                return "dice-static5"
            }
            if (gameState.currentRolls[0] == 6) {
                return "dice-static6"
            }
        }
        else if (gameState.currentRolls == undefined) {
            return "dice-static1"
        }
    }

    function dice2ClassResolver() {
        if (rollingDice) {
                return "dice2"
        }
        else if (gameState.currentRolls != undefined) {
            if (gameState.currentRolls[1] == 1) {
                return "dice-static1"
            }
            if (gameState.currentRolls[1] == 2) {
                return "dice-static2"
            }
            if (gameState.currentRolls[1] == 3) {
                return "dice-static3"
            }
            if (gameState.currentRolls[1] == 4) {
                return "dice-static4"
            }
            if (gameState.currentRolls[1] == 5) {
                return "dice-static5"
            }
            if (gameState.currentRolls[1] == 6) {
                return "dice-static6"
            }
        }
        else if (gameState.currentRolls == undefined) {
            return "dice-static2"
        }
    }

    return (
        <>
            <div className="flex flex-col h-screen w-screen items-center">
                <h1 className="text-xl font-semibold mt-10">
                    POTATO GAME
                </h1>

                <div className="w-3/4">
                    You are a halfing, just trying to exist meanwhile, the dark
                    lord rampages across the world. You do not care about this.
                    You are trying to farm potatoes because what could a halfling
                    possibly do about it anyway? Roll the dice and see what
                    new day brings to you!
                </div>


                <div className="border-2 border-black w-48 h-20 mt-5">
                    <div>Destiny {destiny}/10</div>
                    <div>Potatoes {potatoes}/10</div>
                    <div>Orcs {orcs}/10</div>
                </div>

                <div>
                    <div className="flex flex-row gap-10 mt-10">
                        <button onClick={() => { burrow(); potChange(); orcChange(); }} className="border-2 border-black hover:bg-slate-400">
                            BURROW: trade {danger} potato for -1 orc
                        </button>
                        <button onClick={handleDiceRoll} className="border-2 border-black hover:bg-slate-400">
                            roll dice
                        </button>
                    </div>
                </div>
                <div className={dice1ClassResolver()}></div>
                <div className={dice2ClassResolver()}></div>
            </div>
        </>
    )
}

export default Wow
