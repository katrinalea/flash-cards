import Flashcards from "./flashcards";
import WelcomePage from "./welcomePage";
import { useState } from "react";
import data from "./words.json";
import "./welcomepage.css";
import Leaderboard from "./leaderboard";
import { TestingIncorrect } from "./testingIncorrect";

interface words {
  English: string;
  Spanish: string;
}

function App(): JSX.Element {
  const wordData = data;

  const [countedWordData, setCountedWordData] = useState<words[]>(wordData);
  const [pageToRender, setPageToRender] = useState<string>("welcome");
  const [userName, setUserName] = useState<string>("");
  const [incorrectCards, setIncorrectCards] = useState<words[]>(wordData);

  const flashcardCountFunction = (chosenCount: number) => {
    setCountedWordData(
      wordData.sort(() => Math.random() - Math.random()).slice(0, chosenCount)
    );
  };

  const renderHandle = (page: string) => {
    setPageToRender(page);
  };

  const userNameSetter = (name: string) => {
    setUserName(name);
  };

  const handleIncorrect = (wrongCards: words[]) => {
    setIncorrectCards([...wrongCards]);
  };

  return (
    <div>
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
