export default function GameOverScreen(props:{statIndex:number}) {
    let txt:string
    if (props.statIndex == 0) {
        txt = "You are going on an adventure"
    }
    if (props.statIndex == 1) {
        txt = "You are waiting for everything to be over in your basement with our potatoes"
    }
    if (props.statIndex == 2) {
        txt = "too many orcs, you have to leave the farm"
    }
    return (
        <div>{txt!}</div>
    )
}