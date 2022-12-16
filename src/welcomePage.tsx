import data from "./words.json";

interface propInterface {
    userCountSet: (count: number) => void
}

export default function WelcomePage (props: propInterface): JSX.Element{
    return ( <div>
        <p> English to Spanish flashcard game</p>
        <p> Please select how many cards you would like to test!</p>
        <button onClick = {() => props.userCountSet(10)}> 10 </button>
        <button onClick = {() => props.userCountSet(15)}> 15 </button>
        <button onClick = {() => props.userCountSet(20)}> 20 </button>
        <button onClick = {() => props.userCountSet(data.length)}> All cards </button>
    </div>)
}