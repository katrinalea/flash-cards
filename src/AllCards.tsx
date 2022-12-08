import data from "./words.json";
import { useState } from "react";

interface data {
  English: string;
  Spanish: string;
}

export default function AllCards(): JSX.Element {
  const wordData: data[] = data;
  let index = 0;
  const [currentShownCard, setCurrentShownCard] = useState<data>(wordData[0]);
  const [shownLanguage, setShownLanguage] = useState<string>(
    wordData[0].English
  );
  const [unusedCards, setUnusedCards] = useState<data[]>(wordData); // starts as all cards
  const [correctCards, setCorrectCards] = useState<data[]>([]);
  const [wrongCards, setWrongCards] = useState<data[]>([]);

  const handleNext = () => {
    index++;
    setCurrentShownCard(wordData[index]);
    setShownLanguage(currentShownCard.English);
  }; // index isnt working

  const handleFlip = () => {
    setShownLanguage(currentShownCard.Spanish);
  };

  const handleWrong = () => {
    setWrongCards([...wrongCards, currentShownCard]);
  };
  const handleCorrect = () => {
    setCorrectCards([...correctCards, currentShownCard]);
  };

  return (
    <div>
      <p> {shownLanguage}</p>
      <button onClick={handleFlip}> Flip Card </button>
      <button onClick={handleWrong}> Wrong</button>
      <button onClick={handleCorrect}> Correct </button>
      <button onClick={handleNext}> Next card </button>
    </div>
  );
}
