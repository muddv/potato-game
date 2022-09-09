import { useState } from "react"

let parameters = [10, 10, 10]

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

function gameEventPlacer(roll:number) {
    if (roll < 2 ) {
        eventPlace = "In the Garden..."
        return(eventPlace)
    }
    else {
        eventPlace = "A knock at the door..."
        return(eventPlace)
    }
}

export function gameEvent() {
    interface gameEvent {
        location: string,
        description: string
        effect: number[]
    }
    let gardenEvent1:gameEvent = {
        location: "In the Garden",
        description: "you meet a friendly cat",
        effect: [5, 5, 5]
    }
    countScores(parameters, gardenEvent1.effect)
    txt = gardenEvent1.description
    eventPlace = gardenEvent1.location
    eventDescription = gardenEvent1.description
    eventEffect = gardenEvent1.effect

    return  [eventPlace, txt, eventDescription, eventEffect]
}

function countScores(parameters:number[], parametersChange:number[]) {
    for (let i = 0; i < 3; i++) {
        parameters[i] -= parametersChange[i]
    }
    return parameters
}

export const useDestiny = () => {
    const [destiny, setDestiny] = useState(10)

    const desChange = () => {
        setDestiny(parameters[0])
        console.log(destiny)
    }

    return {destiny, desChange}
}

export const usePotatoes = () => {
    const [potatoes, setPotatoes] = useState(10)

    const potChange = () => {
        setPotatoes(parameters[0])
        console.log(potatoes)
    }

    return {potatoes, potChange}
}

export const useOrcs = () => {
    const [orcs, setOrcs] = useState(10)

    const orcChange = () => {
        setOrcs(parameters[0])
        console.log(orcs)
    }

    return {orcs, orcChange}
}
