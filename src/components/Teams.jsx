import axios from "axios";
import { useEffect, useState } from "react"

export default function Teams() {
    const [teams, setTeams] = useState([]);
    
    useEffect(() => {
        getTeams();
    }, [])
    
    const getTeams = async () => {
        const url = "http://ergast.com/api/f1/2013/constructorStandings.json";
        const response = await axios.get(url);
        const data = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        setTeams(data);
        console.log(data);
    };
    
    console.log(teams);

    return (
        <div className="teams">
            <table>
                <thead>
                    <tr>
                        <th colSpan={4}>
                            <p>Constructor Championship Standings - 2013</p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team) => {
                        return(
                        <tr>
                            <td>{team.position}</td>
                            <td>{team.Constructor.name}</td>
                            <td>Details</td>
                            <td>{team.points}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}