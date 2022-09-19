import { useState } from "react";

export let gameState = {
    danger: 1,
    stats: [0, 0, 0],
    text: "Your garden needs a lot of work",
    currentRolls: [1, 1]
}

export let gameEvent = {
    location: "Somewhere",
    description: "Something happened",
    effect: [0, 0, 0]
}

export function diceRoll() {
    // Rolls 2 d6s
    let roll1
    if ((gameState.stats[1] > 1 && gameState.danger < 3) 
    || (gameState.stats[1] > 3 && gameState.danger < 6) 
    || (gameState.stats[1] > 6 && gameState.danger < 10)) {
        roll1 = Math.floor(Math.random() * 6) + 1
        console.log("HERE")
    }
    else {
        roll1 = Math.floor(Math.random() * 4) + 1
        console.log("why")
    } 
    let roll2 = Math.floor(Math.random() * 6) + 1
    //if ((roll1 > 4) && (gameState.stats[1] > 1 && gameState.danger < 3) 
    //|| (gameState.stats[1] > 3 && gameState.danger < 6) 
    //|| (gameState.stats[1] > 6 && gameState.danger < 10)) {
      //  roll1 = Math.floor(Math.random() * 4) + 1000
       // console.log("?????")
    //}
    console.log("roll1: ", roll1, " ", "roll2 ", roll2)
    GameEventDispatcher([roll1, roll2])
    gameState.currentRolls = [roll1, roll2]
    return gameState.currentRolls
}

function GameEventDispatcher(rolls: number[]) {
    if (rolls[0] < 3) {
        gameEvent.location = "In the Garden"
        if (rolls[1] == 0) {
            gameEvent.description = "You happily root about all day in your garden."
            gameEvent.effect = [0, 1, 0]
        }
        if (rolls[1] == 1) {
            gameEvent.description = "You narrowly avoid a visitor by hiding in a potato sack."
            gameEvent.effect = [1, 1, 0]
        }
        if (rolls[1] == 2) {
            gameEvent.description = "A hooded stranger lingers outside your farm."
            gameEvent.effect = [1, 0, 1]
        }
        if (rolls[1] == 3) {
            gameEvent.description = "Your field is ravaged in the night by unseen enemies."
            gameEvent.effect = [0, -1, 1]
        }
        if (rolls[1] == 4) {
            gameEvent.description = "You trade potatoes for other delicious foodstuffs."
            gameEvent.effect = [0, -1, 0]
        }
        if (rolls[1] == 5) {
            gameEvent.description = "You burrown into a bumper crop of potatoes. Do you cry with joy? Possibly."
            gameEvent.effect = [0, 2, 0]
        }
    }
    else if (rolls[0] > 2 && rolls[0] < 5) {
        gameEvent.location = "A knock at the Door"
        if (rolls[1] == 0) {
            gameEvent.description = "A distant cousin. They are after your potatoes. They may snitch on you."
            gameEvent.effect = [0, 0, 1]
        }
        if (rolls[1] == 1) {
            gameEvent.description = "A dwarven stranger. You refuse them entry. Ghastly creatures"
            gameEvent.effect = [1, 0, 0]
        }
        if (rolls[1] == 2) {
            gameEvent.description = "A wizard strolls by. You pointedly draw the curtains."
            gameEvent.effect = [1, 0, 1]
        }
        if (rolls[1] == 3) {
            gameEvent.description = "There are rumours of war in the reaches. You eat some potatoes."
            gameEvent.effect = [0, -1, 2]
        }
        if (rolls[1] == 4) {
            gameEvent.description = "It's an elf. They are not seriouse people."
            gameEvent.effect = [1, 0, 0]
        }
        if (rolls[1] == 5) {
            gameEvent.description = "It's a sack of potatoes from a generous neighbour. You really must remember to pay them a visit one of these years."
            gameEvent.effect = [0, 2, 0]
        }
    }
    else if (rolls[0] > 4) {
        if ((gameState.stats[1] > 1 && gameState.danger < 3) || (gameState.stats[1] > 3 && gameState.danger < 6) || (gameState.stats[1] > 6 && gameState.danger < 10)) {
            gameEvent.location = "The world becomes more dangerous"
            gameEvent.description = "Everywhere you look there seems to be more signs of dark forces approaching, you will need more potatoes. (Hurling now costs more.)"
            gameEvent.effect = [0, 0, 0]
            gameState.danger += 1
        }

        //else if (rolls[1] < 3) {
        // gameEvent.location = "At your home"
        //gameEvent.description = "You find a misterious sack of potatoes under your dinner table... how did it get here"
        // gameEvent.effect = [1, 1, 0]
        // }
        // else {
        //  gameEvent.location = "At the center of the village"
        // gameEvent.description = "You decide to trade some of your potatoes for other things you need, when you come back you notice a note at your door... best ignore it"
        //gameEvent.effect = [1, -1, 0]
        // }
    }
    for (let i = 0; i < 3; i++) {
        gameState.stats[i] += gameEvent.effect[i]
        if (gameState.stats[i] < 0) {
            gameState.stats[i] = 0
        }
        if (gameState.stats[i] > 9) {
            gameOver(i)
        }
    }
    return [gameEvent, gameState]
}

export function hurl() {
    if (gameState.stats[1] - gameState.danger > -1 && gameState.stats[2] > 0) {
        gameState.stats[1] -= gameState.danger
        gameState.stats[2] -= 1
    }
    return gameState.stats
}

// IS USED WHEN PARAMETER IS 10
function gameOver(stat: number) {
    if (stat == 0) {
        gameState.text = "GAME OVER: DESTINY 10"
    }
    if (stat == 1) {
        gameState.text = "GAME OVER: POTATOES 10"
    }
    if (stat == 2) {
        gameState.text = "GAME OVER: ORCS 10"
    }
    return gameState.text
}

// HOOKS
export const useDestiny = () => {
    const [destiny, setDestiny] = useState(0)

    const desChange = () => {
        setDestiny(gameState.stats[0])
        console.log(destiny)
    }

    return { destiny, desChange }
}

export const usePotatoes = () => {
    const [potatoes, setPotatoes] = useState(0)

    const potChange = () => {
        setPotatoes(gameState.stats[1])
        console.log(potatoes)
    }

    return { potatoes, potChange }
}

export const useOrcs = () => {
    const [orcs, setOrcs] = useState(0)

    const orcChange = () => {
        setOrcs(gameState.stats[2])
        console.log(orcs)
    }

    return { orcs, orcChange }
}

export const useDanger = () => {
    const [danger, setDanger] = useState(1)

    const dangerChange = () => {
        setDanger(gameState.danger)
    }

    return { danger, dangerChange }
}