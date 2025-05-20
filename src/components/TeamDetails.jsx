import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";

export default function TeamDetails() {
    const { teamId } = useParams();
    const [teamDetails, setTeamDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getTeamDetails();
    }, []);

    const getTeamDetails = async () => {
        console.log(teamId);
        const url = "http://ergast.com/api/f1/2013/constructors/&{team.id}/constructorStandings.json";
        const response = await axios.get(url);
        console.log(response);
        setTeamDetails(response.data);
        setIsLoading(false);
    }

    if (isLoading) {
        return <Loader />;
    }
    return (
        <div>
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
                        {teams.map((team, i) => {
                            return (
                                <tr key={i}>
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
            </div>
            );
}