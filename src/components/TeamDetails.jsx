import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";
import Loader from "./Loader";

export default function TeamDetails() {
    const { teamsId } = useParams();
    const [teamDetails, setTeamDetails] = useState({});
    const [teamResults, setTeamResults] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getTeamDetails();
    }, [teamsId]);

    const getTeamDetails = async () => {
        const teamStandingsUrl = `http://ergast.com/api/f1/2013/constructors/${teamsId}/constructorStandings.json`;
        const teamStandingResponse = await axios.get(teamStandingsUrl);

        console.log("teamStandingResponse", teamStandingResponse.data);

        const teamResultUrl = `http://ergast.com/api/f1/2013/constructors/${teamsId}/results.json`;
        const teamResultResponse = await axios.get(teamResultUrl);

        setTeamDetails(
            teamStandingResponse.data.MRData.StandingsTable.StandingsLists[0]
                .ConstructorStandings[0]
        );
        setTeamResults(teamResultResponse.data.MRData.RaceTable.Races);
        // setIsLoading(false);
    };

    // console.log(teamDetails);

    const handleTeams = (id) => {
        console.log("id", id);
        const linkTo = `/constructors/${id}`;
        navigate(linkTo);
    };

    // if (isLoading) {
    //     <Loader />
    // }

    return (
        <div className="team-details">
            <table>
                <thead>
                    <tr>
                        <th>Country:</th>
                        <th>Position:</th>
                        <th>Points:</th>
                        <th>History:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{teamDetails.Constructor?.nationality}</td>
                        <td>{teamDetails?.position}</td>
                        <td>{teamDetails?.points}</td>
                        <td>
                            <Link to={teamDetails?.history} />
                            History
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
