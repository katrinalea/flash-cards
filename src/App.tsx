import AllCards from "./AllCards";
import WelcomePage from "./welcomePage";
import { useState } from "react";
import data from "./words.json";
import { setImmediate } from "timers";

interface words {
  English: string;
  Spanish: string;
}

function App(): JSX.Element {
  const wordData = data;

  const [countedWordData, setCountedWordData] = useState<words[]>(wordData);
  const [pageToRender, setPageToRender] = useState<string>("welcome");

  const flashcardCountFunction = (chosenCount: number) => {
    setCountedWordData(
      wordData.sort(() => Math.random() - Math.random()).slice(0, chosenCount)
    );
  };

  const renderHandle = (page: string) => {
    setPageToRender(page);
  };

  return (
    <div>
      {pageToRender === "welcome" ? (
        <>
          <WelcomePage
            userCountSet={flashcardCountFunction}
            changeToFlashCards={renderHandle}
          />
          <p> You have chosen to test {countedWordData.length} words </p>
        </>
      ) : (
        <AllCards flashCardWordData={countedWordData} />
      )}
    </div>
  );
}

export default App;
