
import { useState } from "react";
import "./flashcard.css";

interface words {
  English: string;
  Spanish: string;
}
interface propInterface {
  flashCardWordData: words[]
}

export default function AllCards(props: propInterface): JSX.Element {
  const testingCards = props.flashCardWordData
  const startGame: words[] = [{
    "Spanish": "iniciar juego",
    "English": "Start Game"
  }]
  const [unusedCards, setUnusedCards] = useState<words[]>(startGame); 
  const randomNumber = Math.floor(Math.random() * unusedCards.length);
  const [flip, setFlip] = useState(false);
  const [currentCard, setCurrentCard] = useState<words>(unusedCards[randomNumber]);
  const [wrongCards, setWrongCards] = useState<words[]>([]);
  const [correctCards, setCorrectCards] = useState<words[]>([]);

  const wrongCount = wrongCards.length;
  const correctCount = correctCards.length;
  console.log(unusedCards, "unusedcards");
  console.log(testingCards, "testing")
  

  const handleNext = () => {
    setCurrentCard(unusedCards[randomNumber]);
  };

  const handleWrong = () => {
    setUnusedCards([...unusedCards.filter((card) => card !== currentCard)]);
    if (
      !wrongCards.includes(currentCard) &&
      !correctCards.includes(currentCard)
    ) {
      setWrongCards([...wrongCards, currentCard]);
    }
  };
  const handleCorrect = () => {
    setUnusedCards([...unusedCards.filter((card) => card !== currentCard)]);
    if (
      !correctCards.includes(currentCard) &&
      !wrongCards.includes(currentCard)
    ) {
      setCorrectCards([...correctCards, currentCard]);
    }
  };

  return (
    <div className="page">
      <h1> Spanish/English flashcard game</h1>
      <button onClick = {() => setUnusedCards(testingCards)}> Start Game</button>
      <div className="card">
        <p className="text">
          {flip ? (
            <img className="flags" src="./utils/englishflag.png" alt="" />
          ) : (
            <img className="flags" src="./utils/spanishflag.png" alt="" />
          )}
          <br />
          {flip ? currentCard.English : currentCard.Spanish}
        </p>
      </div>
      <button className="button-wrong" onClick={handleWrong}>
        {" "}
        Incorrect{" "}
      </button>
      <button className="button-correct" onClick={handleCorrect}>
        {" "}
        Correct{" "}
      </button>
      <br />
      <br />
      <button className="button-24" onClick={() => setFlip(!flip)}>
        {" "}
        Flip Card{" "}
      </button>
      <button className="button-24" onClick={handleNext}>
        {" "}
        Next card{" "}
      </button>
      <br />
      <p>
        {" "}
        Words to revise = {wrongCount} <br /> Correct words = {correctCount}{" "}
        <br /> Words left to test: {unusedCards.length}/{props.flashCardWordData.length}
      </p>
    </div>
  );
}
