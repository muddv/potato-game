import type { NextPage } from 'next'
import { useState } from 'react'
import { gameState, gameEvent, diceRoll, burrow, useDestiny, usePotatoes, useOrcs, useDanger } from "../game/game-logic"
import GameOverScreen from './gameOver'

const Home: NextPage = () => {

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
        animateDice();
        showEventWindow(false);
        endGame();
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

    let [showEvent, setShowEvent] = useState(false)
    function showEventWindow(closing: boolean) {
        if (!closing) {
            setTimeout(() => {
                setShowEvent(!showEvent)
            }, 900)
        }
        else {
            setShowEvent(!showEvent)
        }
    }
    let containerClass = showEvent ? "mt-14 absolute z-10 bg-white border-2 border-black w-64 h-64" : "hidden"

    const [gameOver, setGameOver] = useState(false)

    let gameOverStat: number

    function endGame() {
        if (destiny > 9 || potatoes > 9 || orcs > 9) {
            setGameOver(true)
            if (destiny > 9) {
                gameOverStat = 0
            }
            if (potatoes > 9) {
                gameOverStat = 0
            }
            if (orcs > 9) {
                gameOverStat = 0
            }
            return gameOverStat
        }
    }

    let gameContainerClass = gameOver ? "hidden" : "flex flex-col h-screen w-screen items-center"

    let gameOverContainerClass = gameOver ? "flex flex-col h-screen w-screen items-center" : "hidden"

    return (
        <>
            <div className={gameContainerClass}>
                <div className={gameOverContainerClass}> <GameOverScreen statIndex={gameOverStat!}></GameOverScreen></div>
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

                {/* EVENT ~MODAL WINDOW */}
                <div className={containerClass}>
                    <div className="flex flex-col justify-center align-center">
                        <div className="font-semibold text-lg text-center">{gameEvent.location}</div>
                        <div>
                            <div className="text-center my-5">{gameEvent.description}</div>
                            <div className={gameState.currentRolls[0] > 4 ? "hidden" : "flex gap-x-5 text-center ml-5 mb-5 font-semibold"}>
                                <div>
                                    Destiny
                                    <div className="font-normal">{gameEvent.effect[0]}</div>
                                </div>
                                <div>
                                    Potatoes
                                    <div className="font-normal">{gameEvent.effect[1]}</div>
                                </div>
                                <div>
                                    Orcs
                                    <div className="font-normal">{gameEvent.effect[2]}</div>
                                </div>
                            </div>
                            <button className="border-2 border-black hover:bg-slate-400 ml-24 w-10" onClick={() => { showEventWindow(true); }}>ok</button>
                        </div>
                    </div>
                </div>
                {/* END OF EVENT ~MODAL WINDOW */}

                <div className="border-2 border-black w-48 h-20 top-24">
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
                <div className="flex flex-row">
                    <div className={dice1ClassResolver()}></div>
                    <div className={dice2ClassResolver()}></div>
                </div>
            </div>
        </>
    )
}

export default Home
