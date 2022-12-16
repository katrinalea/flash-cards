import AllCards from "./AllCards";
import WelcomePage from "./welcomePage";
import {useState} from "react"
import data from "./words.json";

interface words {
  English: string;
  Spanish: string;
}

function App(): JSX.Element {
  const wordData = data

  
  const[countedWordData, setCountedWordData] = useState<words[]>(wordData)

  const flashcardCountFunction = (chosenCount: number) => {
    setCountedWordData(wordData.sort(() => Math.random() - Math.random()).slice(0, chosenCount))
  }
  
  
  return (
    <div>
  <WelcomePage userCountSet = {flashcardCountFunction}/>
  <AllCards flashCardWordData = {countedWordData} />
  </div>
  )
}

export default App;
