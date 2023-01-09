import Flashcards from "./Flashcards";
import WelcomePage from "./welcomePage";
import { useState } from "react";
import data from "./words.json";
import "./welcomepage.css";
import Leaderboard from "./leaderboard";

interface words {
  English: string;
  Spanish: string;
}

function App(): JSX.Element {
  const wordData = data;

  const [countedWordData, setCountedWordData] = useState<words[]>(wordData);
  const [pageToRender, setPageToRender] = useState<string>("welcome");
  const [userName, setUserName] = useState<string>("");

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
        />
      )}
      {pageToRender === "leaderboard" && (
        <Leaderboard setRender={renderHandle} />
      )}
    </div>
  );
}

export default App;
