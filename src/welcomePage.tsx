import data from "./words.json";
import "./welcomepage.css";
import { useState } from "react";

interface propInterface {
  userCountSet: (count: number) => void;
  changeToFlashCards: (page: string) => void;
  userNameAssign: (username: string) => void;
  cardCount: number;
  setRender: (page: string) => void;
}

export default function WelcomePage(props: propInterface): JSX.Element {
  const [userName, setUserName] = useState<string>("");
  const [tempUserName, setTempUserName] = useState<string>("");
  const handleMoveToFlash = () => {
    props.changeToFlashCards("flashcards");
  };

  const handleUserName = () => {
    setUserName(tempUserName);
    props.userNameAssign(tempUserName);
  };
  return (
    <div className="wholePage">
      <h1> English to Spanish flashcard game</h1>
      <button
        className="homeButton"
        onClick={() => props.setRender("leaderboard")}
      >
        {" "}
        Leaderboard
      </button>

      <br />
      {!userName ? (
        <>
          <p> Insert name: </p>
          <input
            type="text"
            onChange={(e) => setTempUserName(e.target.value)}
          />
          <button onClick={handleUserName}> Submit </button>
        </>
      ) : (
        <>
          <p>
            {" "}
            Hello {userName} please select how many cards you would like to
            test!
          </p>
          <br />
          <button className="buttons" onClick={() => props.userCountSet(10)}>
            {" "}
            10{" "}
          </button>
          <button onClick={() => props.userCountSet(15)}> 15 </button>
          <button onClick={() => props.userCountSet(20)}> 20 </button>
          <button onClick={() => props.userCountSet(data.length)}>
            {" "}
            All cards{" "}
          </button>
          <p>Or choose any amount</p>
          <input
            type="number"
            onChange={(e) => props.userCountSet(parseInt(e.target.value))}
          />
          <br />
          <p className="testCount">
            {" "}
            You are currently testing {props.cardCount} words.
          </p>
          <button onClick={handleMoveToFlash}> Go to game </button>
        </>
      )}
    </div>
  );
}
