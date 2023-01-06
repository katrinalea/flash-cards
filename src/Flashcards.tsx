import { useState } from "react";
import "./flashcard.css";
import axios from "axios";

interface words {
  English: string;
  Spanish: string;
}
interface propInterface {
  flashCardWordData: words[];
  setRender: (page: string) => void;
  username: string;
}

export default function Flashcards(props: propInterface): JSX.Element {
  const testingCards = props.flashCardWordData;
  const startGame: words[] = [
    {
      Spanish: "iniciar juego",
      English: "Start Game",
    },
  ];
  const [unusedCards, setUnusedCards] = useState<words[]>(testingCards);
  const randomNumber = Math.floor(Math.random() * unusedCards.length);
  const [flip, setFlip] = useState(true);
  const [currentCard, setCurrentCard] = useState<words>(startGame[0]);
  const [wrongCards, setWrongCards] = useState<words[]>([]);
  const [correctCards, setCorrectCards] = useState<words[]>([]);
  const [startedGame, setStartedGame] = useState<boolean>(false);
  const [registeredScore, setRegisteredScore] = useState<boolean>(false);
  const [scoreStored, setScoreStored] = useState<boolean>(false);
  //const [testingWrongCards, setTestingWrongCards] = useState<boolean>(false);

  const handleNext = () => {
    setCurrentCard(unusedCards[randomNumber]);
    setFlip(false);
    setRegisteredScore(false);
  };

  const handleWrong = () => {
    setUnusedCards([...unusedCards.filter((card) => card !== currentCard)]);
    if (
      !wrongCards.includes(currentCard) &&
      !correctCards.includes(currentCard)
    ) {
      setWrongCards([...wrongCards, currentCard]);
      setRegisteredScore(true);
    }
  };
  const handleCorrect = () => {
    setUnusedCards([...unusedCards.filter((card) => card !== currentCard)]);
    if (
      !correctCards.includes(currentCard) &&
      !wrongCards.includes(currentCard)
    ) {
      setCorrectCards([...correctCards, currentCard]);
      setRegisteredScore(true);
    }
  };

  const handleTestIncorrect = () => {
    setUnusedCards(wrongCards);
    setTestingWrongCards(true);
  };

  const handleStoreScore = async (
    score: number,
    totalTested: number,
    name: string
  ) => {
    console.log("storing handle entered", name, score, totalTested);
    const response = await axios.post(
      "https://flashcards-spanish.onrender.com/names",
      {
        name: name,
        correct: score,
        testamount: totalTested,
      }
    );
    // const response = await axios.post("http://localhost:4000/names", {
    //   name: name,
    //   correct: score,
    //   testamount: totalTested,
    // });
    console.log(response, "score submitted");
    setScoreStored(true);
  };

  return (
    <div className="page">
      {unusedCards.length === 0 ? (
        <>
          <div>
            <h2> Congrats {props.username} you have completed your set!</h2>
            <button
              className="button-33"
              onClick={() => props.setRender("welcome")}
            >
              {" "}
              Home{" "}
            </button>
            <button
              className="button-33"
              onClick={() =>
                handleStoreScore(
                  correctCards.length,
                  testingCards.length,
                  props.username
                )
              }
            >
              {" "}
              Store score{" "}
            </button>
            {wrongCards.length > 0 && (
              <button className="button-33" onClick={handleTestIncorrect}>
                {" "}
                Retest wrong answers
              </button>
            )}
            <br />
            <br />
          </div>
          <>
            {scoreStored && (
              <div>
                <p>
                  {" "}
                  {props.username}, your score of {correctCards.length}/
                  {testingCards.length} has been stored! Check the leaderboard
                  to see if you made it!
                </p>
                <button
                  className="leaderboard-finalpage-button-33"
                  onClick={() => props.setRender("leaderboard")}
                >
                  {" "}
                  Leaderboard
                </button>
              </div>
            )}
          </>
        </>
      ) : (
        <div>
          <h1> Spanish/English flashcard game</h1>
          <button
            className="home-button-33"
            onClick={() => props.setRender("welcome")}
          >
            {" "}
            Home{" "}
          </button>
          <button
            className="leaderboard-button-33"
            onClick={() => props.setRender("leaderboard")}
          >
            {" "}
            Leaderboard
          </button>
          <button
            className="button-24"
            onClick={() => {
              setUnusedCards([...testingCards]);
              setCurrentCard(unusedCards[randomNumber]);
              setFlip(false);
              setStartedGame(true);
            }}
          >
            {" "}
            Start Game
          </button>
          <br />
          <br />
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
          {!startedGame && (
            <button className="button-24" onClick={() => setFlip(!flip)}>
              {" "}
              Flip Card{" "}
            </button>
          )}
          {startedGame === true ? (
            <>
              {registeredScore === false ? (
                <>
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
                </>
              ) : (
                <button className="button-24" onClick={handleNext}>
                  {" "}
                  Next card{" "}
                </button>
              )}
              <br />
              <p>
                {" "}
                Words to revise = {wrongCards.length} <br /> Correct words ={" "}
                {correctCards.length} <br />{" "}
                <p>
                  Words left to test:{" "}
                  {unusedCards.length > 0 ? (
                    <p>
                      {" "}
                      ({unusedCards.length}/{testingCards.length}){" "}
                    </p>
                  ) : (
                    <p> No cards to test </p>
                  )}
                </p>
              </p>
            </>
          ) : (
            <>
              <p> Press start to begin </p>
              <br />
            </>
          )}
        </div>
      )}
    </div>
  );
}
