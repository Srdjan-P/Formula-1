import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";
import Loader from "./Loader";
import LaunchIcon from '@mui/icons-material/Launch';
import { getCodeByCountryName, getCodeByNationality } from "../FlagCodes";
import Flag from "react-flagkit";

export default function TeamDetails({ countryList, selectedYear }) {
    const { teamsId } = useParams();
    const [teamDetails, setTeamDetails] = useState({});
    const [teamResults, setTeamResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getTeamDetails();
    }, [teamsId, selectedYear]);

    const getTeamDetails = async () => {
        const teamStandingsUrl = `http://ergast.com/api/f1/${selectedYear}/constructors/${teamsId}/constructorStandings.json`;
        const teamStandingResponse = await axios.get(teamStandingsUrl);

        //console.log("teamStandingResponse", teamStandingResponse.data);

        const teamResultUrl = `http://ergast.com/api/f1/${selectedYear}/constructors/${teamsId}/results.json`;
        const teamResultResponse = await axios.get(teamResultUrl);
        //console.log("TSR", teamStandingResponse.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);
        setTeamDetails(
            teamStandingResponse.data.MRData.StandingsTable.StandingsLists[0]
                .ConstructorStandings[0]
        );
        setTeamResults(teamResultResponse.data.MRData.RaceTable.Races);
        setIsLoading(false);
        console.log("TeamDetails", teamDetails);
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
            <div className="team-card">
                <div className="team-bio-card">
                    <div className="team-avatar">
                        <img src={`/avatars/${teamDetails.Constructor.constructorId}.png`} alt="Team" width="80" />
                    </div>
                    <div>
                        <h2>
                            <Flag country={getCodeByNationality(countryList, teamDetails.Constructor.nationality)} />
                            {teamDetails.Constructor.name}</h2>
                    </div>
                </div>
                <ul className="team-info">
                    <li>Country:{teamDetails.Constructor?.nationality}</li>
                    <li>Position:{teamDetails?.position}</li>
                    <li>Points:{teamDetails?.points}</li>
                    <li>History: <Link to={teamDetails?.history} /><LaunchIcon fontSize="small" sx={{ fontSize: 16 }} />
                    </li>
                </ul>
            </div>

            <div className="drivers">
                <table className="team-results">
                    <thead>
                        <tr>
                            <th colSpan={5}>
                                <p>Formula 1 {selectedYear} Results</p>
                            </th>
                        </tr>
                        <tr>
                            <th>Round</th>
                            <th>Grand Prix</th>
                            <th>Team</th>
                            <th>Grid</th>
                            <th>Race</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamResults.map((teamResult) => {
                            console.log("teamResult", teamResult);
                            return (
                                <tr>
                                    <td>{teamResult.round}</td>
                                    <td><Flag country={getCodeByCountryName(countryList, teamResult.Circuit.Location.country)} />{teamResult.raceName}
                                    </td>
                                    <td onClick={() => { handleTeams(teamResult.Results[0].Constructor.constructorId) }}>
                                        {teamResult.Results[0].Constructor.name}</td>
                                    <td>{teamResult.Results[0].grid}</td>
                                    <td>{teamResult.Results[0].position}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>


    );
}
