import {useEffect, useState} from "react"
import axios from "axios";

interface LBoard {
  id: number,
  name: string,
  correct: number,
  testAmount: number
}

export default function Leaderboard(): JSX.Element {
  const [leaderboard, setLeaderboard] = useState<LBoard[]>([])

     useEffect(() => {
    const fetchAPI = async () => {
      const response = await axios.get(
      "http://localhost:4000/names"
      );
      const fetchedWholeObject = response.data;
      const fetchedTasks = fetchedWholeObject.data;
      // sets tasks to the data
      setLeaderboard(fetchedTasks);
    };
    fetchAPI();
  }, [leaderboard]);

  return (
    <div>
    <h1> Leaderboard </h1>
    <table> 
      <tr>
      <th>Name</th>
      <th>Score</th>
      </tr>
      {leaderboard.map(person => 
      <>
      <tr>
      <td>{person.name}</td>
      <td>{person.correct}/{person.testAmount}</td>
      </tr>
      </>
      )
}
    </table>
    </div>
  );
}
