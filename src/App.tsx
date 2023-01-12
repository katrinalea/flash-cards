import Flashcards from "./flashcards";
import WelcomePage from "./welcomePage";
import { useState } from "react";
import data from "./words.json";
import "./style.css";
import Leaderboard from "./leaderboard";
import { TestingIncorrect } from "./testingIncorrect";
import NavBar from "./navBar";

interface words {
  English: string;
  Spanish: string;
}

function App(): JSX.Element {
  const wordData = data;
  //------------------------------------------------------------------------------------ use state

  const [countedWordData, setCountedWordData] = useState<words[]>(wordData);
  const [pageToRender, setPageToRender] = useState<string>("welcome");
  const [userName, setUserName] = useState<string>("");
  const [incorrectCards, setIncorrectCards] = useState<words[]>(wordData);

  //------------------------------------------------------------------------------------ function to generate random flashcard pack

  const flashcardCountFunction = (chosenCount: number) => {
    setCountedWordData(
      wordData.sort(() => Math.random() - Math.random()).slice(0, chosenCount)
    );
  };

  //------------------------------------------------------------------------------------ change render

  const renderHandle = (page: string) => {
    setPageToRender(page);
  };

  //------------------------------------------------------------------------------------  set username

  const userNameSetter = (name: string) => {
    setUserName(name);
  };

  //------------------------------------------------------------------------------------ set incorrect

  const handleIncorrect = (wrongCards: words[]) => {
    setIncorrectCards([...wrongCards]);
  };

  //------------------------------------------------------------------------------------ page content

  return (
    <div>
      <NavBar setRender={renderHandle} />
      <br />
      {pageToRender === "welcome" && (
        <>
          <WelcomePage
            userCountSet={flashcardCountFunction}
            changeToFlashCards={renderHandle}
            userNameAssign={userNameSetter}
            cardCount={countedWordData.length}
            setRender={renderHandle}
            username={userName}
          />
        </>
      )}
      {pageToRender === "flashcards" && (
        <Flashcards
          flashCardWordData={countedWordData}
          setRender={renderHandle}
          username={userName}
          handleIncorrect={handleIncorrect}
        />
      )}
      {pageToRender === "leaderboard" && (
        <Leaderboard setRender={renderHandle} />
      )}
      {pageToRender === "testIncorrect" && (
        <TestingIncorrect
          setRender={renderHandle}
          username={userName}
          incorrectCards={incorrectCards}
        />
      )}
    </div>
  );
}

export default App;
