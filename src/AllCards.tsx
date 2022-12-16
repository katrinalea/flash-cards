import data from "./words.json";
import { useState } from "react";
import "./flashcard.css";

interface words {
  English: string;
  Spanish: string;
}

export default function AllCards(): JSX.Element {
  const wordData: words[] = data;
  const [unusedCards, setUnusedCards] = useState<words[]>(wordData); // starts as all cards
  const randomNumber = Math.floor(Math.random() * unusedCards.length);
  const [flip, setFlip] = useState(false);
  const [currentCard, setCurrentCard] = useState<words>(
    unusedCards[randomNumber]
  );
  const [wrongCards, setWrongCards] = useState<words[]>([]);
  const [correctCards, setCorrectCards] = useState<words[]>([]);

  const wrongCount = wrongCards.length;
  const correctCount = correctCards.length;
  console.log(unusedCards, "unusedcards");

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
        <br /> Words left to test: {unusedCards.length}
      </p>
    </div>
  );
}
