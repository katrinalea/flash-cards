import { useState } from "react";
import "./flashcard.css";

interface propInterface {
  setRender: (page: string) => void;
  username: string;
  incorrectCards: words[];
}

interface words {
  English: string;
  Spanish: string;
}

export function TestingIncorrect(props: propInterface): JSX.Element {
  const [unusedCards, setUnusedCards] = useState<words[]>(props.incorrectCards);
  const [flip, setFlip] = useState<boolean>(false);
  const [currentCard, setCurrentCard] = useState<words>(
    props.incorrectCards[0]
  );

  const randomNumber = Math.floor(Math.random() * unusedCards.length);

  const handleNext = () => {
    setUnusedCards([...unusedCards.filter((card) => card !== currentCard)]);
    setCurrentCard(unusedCards[randomNumber]);
    setFlip(false);
  };

  return (
    <>
      <div className="page">
        <div>
        <br />
        <button
          className="home-button-33"
          onClick={() => props.setRender("welcome")}
        >
          {" "}
          Home{" "}
        </button>
        <p>
          {props.username}, you got {props.incorrectCards.length} incorrect!{" "}
        </p>
      </div>
      {unusedCards.length > 0 ? (
        <>
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
          <br />
          </div>
          <div>
          <button className="button-24" onClick={() => setFlip(!flip)}>
            {" "}
            Flip Card{" "}
          </button>
          <button className="button-24" onClick={handleNext}>
            {" "}
            Next card{" "}
          </button>
          </div>
          </>
      ) : (
        <p>You have looked through your incorrect cards, return home!</p>
      )}
      <br />
      </div>
    </>
  );
}
