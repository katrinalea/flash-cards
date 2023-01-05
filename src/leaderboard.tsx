import { useEffect, useState } from "react";
import axios from "axios";

interface LBoard {
  id: number;
  name: string;
  correct: number;
  testamount: number;
  percentage: number;
}

interface propInterface {
  setRender: (page: string) => void;
}

//eventually need to connect to remote server
export default function Leaderboard(props: propInterface): JSX.Element {
  const [leaderboard, setLeaderboard] = useState<LBoard[]>([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await axios.get("http://localhost:4000/names");
      const fetchedWholeObject = response.data;
      const fetchedTasks = fetchedWholeObject.data;
      // sets tasks to the data
      setLeaderboard(fetchedTasks);
    };
    fetchAPI();
  }, [leaderboard]);

  return (
    <div className="wholePage">
      <h1> Top Ten Leaderboard </h1>
      <button className="homeButton" onClick={() => props.setRender("welcome")}>
        {" "}
        Home{" "}
      </button>
      <table>
        <tr>
          <th>Name</th>
          <th>Score</th>
          <th>Percentage</th>
        </tr>
        {leaderboard.map((person) => (
          <>
            <tr>
              <td>{person.name}</td>
              <td>
                {person.correct}/{person.testamount}
              </td>
              <td>{person.percentage}</td>
            </tr>
          </>
        ))}
      </table>
    </div>
  );
}
