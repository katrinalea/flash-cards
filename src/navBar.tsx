interface InavBar {
  setRender: (page: string) => void;
}
export default function NavBar(props: InavBar): JSX.Element {
  return (
    <>
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
      </div>
    </>
  );
}
