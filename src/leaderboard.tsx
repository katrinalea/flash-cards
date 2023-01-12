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
  //------------------------------------------------------------------------------------ use states

  const [leaderboard, setLeaderboard] = useState<LBoard[]>([]);

  //------------------------------------------------------------------------------------ contact with db to render scores
  useEffect(() => {
    const fetchAPI = async () => {
      const response = await axios.get(
        "https://flashcards-spanish.onrender.com/names"
      );
      //const response = await axios.get("http://localhost:4000/names");
      const fetchedWholeObject = response.data;
      const fetchedScores = fetchedWholeObject.data;
      // sets tasks to the data
      setLeaderboard(fetchedScores);
    };
    fetchAPI();
  }, []);

  //------------------------------------------------------------------------------------ page content

  return (
    <div className="wholePage">
      <h1> Top Ten Leaderboard </h1>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Percentage</th>
          </tr>
          {leaderboard.map((person) => (
            <>
              <tr key={person.id}>
                <td>{person.name}</td>
                <td>
                  {person.correct}/{person.testamount}
                </td>
                <td>{person.percentage}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <br />
    </div>
  );
}
