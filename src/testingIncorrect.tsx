import {useState} from "react"
interface propInterface {
    setRender: (page: string) => void;
    username: string;
    incorrectCards: words[]
  }

  interface words {
    English: string;
    Spanish: string;
  }


export function TestingIncorrect (props: propInterface): JSX.Element{
    const [unusedCards, setUnusedCards] = useState<words[]>(props.incorrectCards);
    const [flip, setFlip] = useState<boolean>(true);
    const [currentCard, setCurrentCard] = useState<words>(props.incorrectCards[0]);


    // const handleNext = () => {
    //     setUnusedCards(unusedCards.shift())
    //     setCurrentCard(unusedCards[0]);
    //     setFlip(false);
    //   };

    return (
        <>
        <div>
        <button
            className="home-button-33"
            onClick={() => props.setRender("welcome")}
          >
            {" "}
            Home{" "}
          </button>
            <p>{props.username}, you got {props.incorrectCards.length} incorrect! </p>
          
        </div>
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
            <button className="button-24" onClick={() => setFlip(!flip)}>
              {" "}
              Flip Card{" "}
            </button>
            </div>
        </>
    )


}