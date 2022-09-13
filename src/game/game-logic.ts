import { useState } from "react"

let parameters = [0, 0, 0]

//MAKE THIS AN OBJECT

export let txt = "the day is new"

export let eventPlace = "Somewhere"

export let eventDescription = "Something happened"

export let eventEffect = [0, 0, 0]

export function diceRoll() {
    // Rolls a d6
    let roll = Math.floor(Math.random() * 7)
    console.log("roll:" + roll)
    gameEventPlacer(roll)
    return (roll)
}

export function locationDiceRoll() {
    let evRoll = Math.floor(Math.random() * 7)
    gameEvent(evRoll)
}

function gameEventPlacer(roll: number) {
    if (roll < 2) {
        eventPlace = "In the Garden..."
        return (eventPlace)
    }
    else {
        eventPlace = "A knock at the door..."
        return (eventPlace)
    }
}

export function gameEvent(evRoll: number) {
    interface gameEvent {
        location: string,
        description: string
        effect: number[]
    }
    let gardenEvent1: gameEvent = {
        location: "In the Garden",
        description: "You happily root about all day in your garden.",
        effect: [0, 1, 0]
    }
    let gardenEvent2: gameEvent = {
        location: "In the Garden",
        description: "You narrowly avoid a visitor by hiding in a potato sack.",
        effect: [1, 1, 0]
    }
    let gardenEvent3: gameEvent = {
        location: "In the Garden",
        description: "A hooded stranger lingers outside your farm.",
        effect: [1, 0, 1]
    }
    let gardenEvent4: gameEvent = {
        location: "In the Garden",
        description: "Your field is rabaged in the night by unseen enemies.",
        effect: [0, -1, 1]
    }
    let gardenEvent5: gameEvent = {
        location: "In the Garden",
        description: "You trade potatoes for other delicious foodstuffs.",
        effect: [0, -1, 0]
    }
    let gardenEvent6: gameEvent = {
        location: "In the Garden",
        description: "You burrown into a bumper crop of potatoes. Do you cry with joy? Possibly.",
        effect: [0, 2, 0]
    }
    let gardenEvent7: gameEvent = {
        location: "In the Garden",
        description: "you meet a friendly cat",
        effect: [5, 5, 5]
    }
    let doorEvent1: gameEvent = {
        location: "A Knock at the Door",
        description: "A distant cousin. They are after your potatoes. They may snitch on you.",
        effect: [0, 0, 1]
    }
    let doorEvent2: gameEvent = {
        location: "A Knock at the Door",
        description: "A dwarven stranger. You refuse them entry. Ghastly creatures",
        effect: [1, 0, 0]
    }
    let doorEvent3: gameEvent = {
        location: "A Knock at the Door",
        description: "A wizard strolls by. You pointedly draw the curtains.",
        effect: [1, 0, 1]
    }
    let doorEvent4: gameEvent = {
        location: "A Knock at the Door",
        description: "There are rumours of war in the reaches. You eat some potatoes.",
        effect: [0, -1, 2]
    }
    let doorEvent5: gameEvent = {
        location: "A Knock at the Door",
        description: "It's an elf. They are not seriouse people.",
        effect: [1, 0, 0]
    }
    let doorEvent6: gameEvent = {
        location: "A Knock at the Door",
        description: "It's a sack of potatoes from a generous neighbour. You really must remember to pay them a visit one of these years.",
        effect: [0, 2, 0]
    }
    let doorEvent7: gameEvent = {
        location: "A Knock at the Door",
        description: "you meet a friendly cat",
        effect: [5, 5, 5]
    }

    if (eventPlace == "In the Garden...") {
        if (evRoll == 0) {
            countScores(parameters, gardenEvent1.effect)
            txt = gardenEvent1.description
            eventPlace = gardenEvent1.location
            eventDescription = gardenEvent1.description
            eventEffect = gardenEvent1.effect
            return [eventPlace, txt, eventDescription, eventEffect]
        }
        if (evRoll == 1) {
            countScores(parameters, gardenEvent2.effect)
            txt = gardenEvent2.description
            eventPlace = gardenEvent2.location
            eventDescription = gardenEvent2.description
            eventEffect = gardenEvent2.effect
            return [eventPlace, txt, eventDescription, eventEffect]
        }
        if (evRoll == 2) {
            countScores(parameters, gardenEvent3.effect)
            txt = gardenEvent3.description
            eventPlace = gardenEvent3.location
            eventDescription = gardenEvent3.description
            eventEffect = gardenEvent3.effect
            return [eventPlace, txt, eventDescription, eventEffect]
        }
        if (evRoll == 3) {
            countScores(parameters, gardenEvent4.effect)
            txt = gardenEvent4.description
            eventPlace = gardenEvent4.location
            eventDescription = gardenEvent4.description
            eventEffect = gardenEvent4.effect
            return [eventPlace, txt, eventDescription, eventEffect]
        }
        if (evRoll == 4) {
            countScores(parameters, gardenEvent5.effect)
            txt = gardenEvent5.description
            eventPlace = gardenEvent5.location
            eventDescription = gardenEvent5.description
            eventEffect = gardenEvent5.effect
            return [eventPlace, txt, eventDescription, eventEffect]
        }
        if (evRoll == 5) {
            countScores(parameters, gardenEvent6.effect)
            txt = gardenEvent6.description
            eventPlace = gardenEvent6.location
            eventDescription = gardenEvent6.description
            eventEffect = gardenEvent6.effect
            return [eventPlace, txt, eventDescription, eventEffect]
        }

    }
    else {
        if (evRoll == 0) {
            countScores(parameters, doorEvent1.effect)
            txt = doorEvent1.description
            eventPlace = doorEvent1.location
            eventDescription = doorEvent1.description
            eventEffect = doorEvent1.effect
            return [eventPlace, txt, eventDescription, eventEffect]
        }
        if (evRoll == 1) {
            countScores(parameters, doorEvent2.effect)
            txt = doorEvent2.description
            eventPlace = doorEvent2.location
            eventDescription = doorEvent2.description
            eventEffect = doorEvent2.effect
            return [eventPlace, txt, eventDescription, eventEffect]
        }
        if (evRoll == 2) {
            countScores(parameters, doorEvent3.effect)
            txt = doorEvent3.description
            eventPlace = doorEvent3.location
            eventDescription = doorEvent3.description
            eventEffect = doorEvent3.effect
            return [eventPlace, txt, eventDescription, eventEffect]
        }
        if (evRoll == 3) {
            countScores(parameters, doorEvent4.effect)
            txt = doorEvent4.description
            eventPlace = doorEvent4.location
            eventDescription = doorEvent4.description
            eventEffect = doorEvent4.effect
            return [eventPlace, txt, eventDescription, eventEffect]
        }
        if (evRoll == 4) {
            countScores(parameters, doorEvent5.effect)
            txt = doorEvent5.description
            eventPlace = doorEvent5.location
            eventDescription = doorEvent5.description
            eventEffect = doorEvent5.effect
            return [eventPlace, txt, eventDescription, eventEffect]
        }
        if (evRoll == 5) {
            countScores(parameters, doorEvent6.effect)
            txt = doorEvent6.description
            eventPlace = doorEvent6.location
            eventDescription = doorEvent6.description
            eventEffect = doorEvent6.effect
            return [eventPlace, txt, eventDescription, eventEffect]
        }
    }

    countScores(parameters, gardenEvent1.effect)
    txt = gardenEvent1.description
    eventPlace = gardenEvent1.location
    eventDescription = gardenEvent1.description
    eventEffect = gardenEvent1.effect

    return [eventPlace, txt, eventDescription, eventEffect]
}

function countScores(parameters: number[], parametersChange: number[]) {
    for (let i = 0; i < 3; i++) {
        parameters[i] += parametersChange[i]
        if (parameters[i] < 0) {
            parameters[i] = 0
        }
        if (parameters[i] >= 10) {
            endGame(i)
        }
    }
    return parameters
}

function endGame(index: number) {
    if (index === 0) {
        return
    }
}

export const useDestiny = () => {
    const [destiny, setDestiny] = useState(0)

    const desChange = () => {
        setDestiny(parameters[0])
        console.log(destiny)
    }

    return { destiny, desChange }
}

export const usePotatoes = () => {
    const [potatoes, setPotatoes] = useState(0)

    const potChange = () => {
        setPotatoes(parameters[1])
        console.log(potatoes)
    }

    return { potatoes, potChange }
}

export const useOrcs = () => {
    const [orcs, setOrcs] = useState(0)

    const orcChange = () => {
        setOrcs(parameters[2])
        console.log(orcs)
    }

    return { orcs, orcChange }
}


export function burrow() {
    if (parameters[1] > 0 && parameters[2] > 0) {
        parameters[1] -= 1
        parameters[2] -= 1
        return parameters
    }
}