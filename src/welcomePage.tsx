import data from "./words.json";
import { useState } from "react";

interface propInterface {
  userCountSet: (count: number) => void;
  changeToFlashCards: (page: string) => void;
  userNameAssign: (username: string) => void;
  cardCount: number;
  setRender: (page: string) => void;
  username: string;
}

export default function WelcomePage(props: propInterface): JSX.Element {
  //------------------------------------------------------------------------------------ use states
  const [userName, setUserName] = useState<string>("");
  const [tempUserName, setTempUserName] = useState<string>("");

  //------------------------------------------------------------------------------------ function to go to game

  const handleMoveToFlash = () => {
    props.changeToFlashCards("flashcards");
  };

  //------------------------------------------------------------------------------------ function to input username

  const handleUserName = () => {
    setUserName(tempUserName);
    props.userNameAssign(tempUserName);
  };

  //------------------------------------------------------------------------------------ page content

  return (
    <div className="wholePage">
      <br />
      {!userName ? (
        <>
          <p> Please insert name to begin: </p>
          <input
            type="text"
            onChange={(e) => setTempUserName(e.target.value)}
          />
          <br />
          <br />
          <button className="button-33" onClick={handleUserName}>
            {" "}
            Submit{" "}
          </button>
          <br />
        </>
      ) : (
        <>
          <p>
            {" "}
            Hello {userName} please select how many cards you would like to
            test!
          </p>
          <br />
          <button className="button-33" onClick={() => props.userCountSet(10)}>
            {" "}
            10{" "}
          </button>
          <button className="button-33" onClick={() => props.userCountSet(15)}>
            {" "}
            15{" "}
          </button>
          <button className="button-33" onClick={() => props.userCountSet(20)}>
            {" "}
            20{" "}
          </button>
          <button
            className="button-33"
            onClick={() => props.userCountSet(data.length)}
          >
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
            All set {props.username}! You are testing {props.cardCount} words.
          </p>
          <button className="button-33" onClick={handleMoveToFlash}>
            {" "}
            Ready to begin?{" "}
          </button>
          <br />
        </>
      )}
      <br />
    </div>
  );
}
