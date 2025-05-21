import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";
import Loader from "./Loader";
import LaunchIcon from '@mui/icons-material/Launch';

export default function TeamDetails() {
    const { teamsId } = useParams();
    const [teamDetails, setTeamDetails] = useState({});
    const [teamResults, setTeamResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
        console.log("TSR", teamStandingResponse.data.MRData.StandingsTable.StandingsLists[0]
            .ConstructorStandings[0]);
        setTeamDetails(
            teamStandingResponse.data.MRData.StandingsTable.StandingsLists[0]
                .ConstructorStandings[0]
        );
        setTeamResults(teamResultResponse.data.MRData.RaceTable.Races);
        setIsLoading(false);
        // console.log("teamDetails", teamDetails);
    };


    const handleTeams = (id) => {
        console.log("id", id);
        const linkTo = `/constructors/${id}`;
        navigate(linkTo);
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="team-details">
            <table>
                <thead>
                    <h2>
                        <img src={`/avatars/${teamDetails.Constructor.constructorId}.png`} alt="Team" width="80" />
                    </h2>


                    <ul>
                        <li>Country:{teamDetails.Constructor?.nationality}</li>
                        <li>Position:{teamDetails?.position}</li>
                        <li>Points:{teamDetails?.points}</li>
                        <li>History:
                        </li>
                    </ul>
                </thead>
                <tbody>
                    <tr>
                        <td>{teamDetails.Constructor?.nationality}</td>
                        <td>{teamDetails?.position}</td>
                        <td>{teamDetails?.points}</td>
                        <td>
                            <Link to={teamDetails?.history} /><LaunchIcon fontSize="small" sx={{ fontSize: 16 }} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
