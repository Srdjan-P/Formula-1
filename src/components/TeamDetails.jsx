import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";

export default function TeamDetails() {
    const { teamId } = useParams();
    const [teamDetails, setTeamDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [teamResults, setDriverRaces] = useState([]);

    useEffect(() => {
        getTeamDetails();
    }, []);

    const getTeamDetails = async () => {
        const teamsStandingsUrl = `http://ergast.com/api/f1/2013/constructors/${team.Id}/constructorStandings.json`;
        const teamStandingResponse = await axios.get(teamsStandingsUrl);
        setTeamDetails(teamStandingResponse.data.MRData.Standings[0].TeamStandings[0]);

        const teamResault = `http://ergast.com/api/f1/2013/constructors/${team.Id}/results.json `;
        const teamResaultResponse = await axios.get(teamResault);
        setTeamResaults(teamResaultResponse.data.MRData.ResultsTable.Results);
        setIsLoading(false);
        console.log("teamResaultResponse", teamResultResponse);
    };

    if (isLoading) {
        return <Loader />;
    }

    console.log("teamResults", teamResults);

    return (
        <div className="team-details">
            <div>
                <h2> {teamDetails.Team.teamName} </h2>
                <p>Country:{teamDetails.Team.country} </p>
                <p>Position:{teamDetails.position}</p>
                <p>Points:{teamDetails.points}</p>
                <p>History:{teamDetails.history}</p>
                <p><Link to={teamDetails.Team.url} target="_blank">Wikipedia</Link></p>
            </div>
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
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}