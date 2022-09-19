import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { gameState, gameEvent, diceRoll, hurl, useDestiny, usePotatoes, useOrcs, useDanger } from "../game/game-logic"

const Header = () => {
    const [gameRules, setGameRules] = useState(false)
    let gameRulesCls = gameRules ? "bg-slate-100 absolute top-52 left-[40vw] w-96 h-72" : "hidden"

    function showGameRules() {
        setGameRules(!gameRules)
    }

    const [about, setAbout] = useState(false)
    let aboutCls = about ? "bg-slate-100 absolute top-52 left-[40vw] h-64 w-96" : "hidden"

    function showAbout() {
        setAbout(!about)
    }

    return (
        <header className='ml-auto mt-5 w-3/4 lg:w-2/5'>
            <header className="flex gap-5 mr-64 text-xl font-semibold">
                <button className="hover:underline" onClick={showAbout}>What is this?</button>
                <div className={aboutCls}>
                    <div className="flex flex-col font-normal"> Potato game is a game developed by muddv based on one page RPG by Oliver Darkshire
                    you can contact muddv on twitter @null_preference, source code as on <Link href="https://github.com/muddv/potato-game">github</Link>
                    you can contact Oliver on <Link href="https://twitter.com/deathbybadger">twitter @deathbybadger </Link>
                        <button onClick={showAbout} className="border-2 border-black hover:bg-slate-400 w-14 mx-auto">close</button>
                    </div>
                </div>
                <div className={gameRulesCls}>
                    <div className="flex flex-col font-normal"> You start a game by rolling the dice, which simulates a two d6 dice rolls,
                        a dice roll determines an event you will face that day, game ends when one of your parameters reaches 10
                        At any point during the game you can hurl at the
                        back garden, that will remove one orc for a cost
                        of some potatoes, the cost may increase as game
                        progresses.
                        <button onClick={showGameRules} className="border-2 border-black hover:bg-slate-400 w-14 mx-auto">close</button>
                    </div>
                </div>
                <button className="hover:underline" onClick={showGameRules}>Rules</button>
            </header>
        </header>
    )
}

const Footer = () => {
    return (
        <footer className="mt-auto">
            <div>Developed by muddv based on tabletopp game by <span className='underline'><Link href="https://twitter.com/deathbybadger" >Oliver Darkshire</Link></span></div>
            <div className='underline'><Link href="https://github.com/muddv/potato-game">Source code on GitHub</Link></div>
        </footer>
    )
}

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
    let containerClass = showEvent ? "mt-14 absolute z-10 bg-white border-2 border-black w-64 h-fit" : "hidden"

    const [gameOver, setGameOver] = useState(false)

    function endGame() {
        if (destiny > 9 || potatoes > 9 || orcs > 9) {
            setGameOver(true)
            if (destiny > 1) {
                setGameOverText("You are going on an adventure")
            }
            if (potatoes > 1) {
                setGameOverText("You are waiting for everything to be over in your basement with our potatoes")
            }
            if (orcs > 1) {
                setGameOverText("too many orcs, you have to leave the farm")
            }

        }
    }

    let gameContainerClass = gameOver ? "hidden" : "flex flex-col h-screen w-screen items-center"


    const [hurlTooltip, setHurlTooltip] = useState(false)

    function showHurlTooltip() {
        setHurlTooltip(!hurlTooltip)
    }

    const [diceTooltip, setDiceTooltip] = useState(false)

    function showDiceTooltip() {
        setDiceTooltip(!diceTooltip)
    }

    let gameOverCls = gameOver ? "flex flex-col h-screen w-screen items-center" : "hidden"

    const [gameOverText, setGameOverText] = useState("")


    return (
        <>
            <Head>
                <title>Potato Game</title>
                <meta name="description" content="A gardening game" />
            </Head>
            <div className={gameOverCls}>
                <Header></Header>
                GAME OVER
                <div>{gameOverText}</div>
                <Footer></Footer>
            </div>
            <div className={gameContainerClass}>
                <Header></Header>
                <h1 className="text-xl font-semibold mt-10">
                    POTATO GAME
                </h1>
                <div className="w-3/4 lg:w-2/5">
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
                            <button className="border-2 border-black hover:bg-slate-400 ml-24 w-16 h-10 mb-5 text-lg" onClick={() => { showEventWindow(true); endGame(); }}>ok</button>
                        </div>
                    </div>
                </div>
                {/* END OF EVENT ~MODAL WINDOW */}

                <div className="border-2 border-black w-48 h-20 top-24 mt-5">
                    <div>Destiny {destiny}/10</div>
                    <div>Potatoes {potatoes}/10</div>
                    <div>Orcs {orcs}/10</div>
                </div>

                <div>
                    <div className="flex flex-row gap-10 mt-10">
                        <button onMouseOver={showHurlTooltip} onMouseOut={showHurlTooltip} onClick={() => { hurl(); potChange(); orcChange(); }} className="border-2 border-black hover:bg-slate-400">
                            Hurl in the backgarden</button>
                        <div className={hurlTooltip ? "absolute bottom-[640px] text-gray-600" : "hidden"}>trade {danger} potato for -1 orc</div>
                        <button onMouseOver={showDiceTooltip} onMouseOut={showDiceTooltip} onClick={handleDiceRoll} className="border-2 border-black hover:bg-slate-400">
                            roll dice
                        </button>
                        <div className={diceTooltip ? "absolute bottom-[640px] text-gray-600" : "hidden"}>try growing some potatoes...</div>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className={dice1ClassResolver()}></div>
                    <div className={dice2ClassResolver()}></div>
                </div>
                <Footer></Footer>
            </div>
        </>
    )
}

export default Home
