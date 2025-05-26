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

        const teamResultUrl = `http://ergast.com/api/f1/${selectedYear}/constructors/${teamsId}/results.json`;
        const teamResultResponse = await axios.get(teamResultUrl);

        setTeamDetails(
            teamStandingResponse.data.MRData.StandingsTable.StandingsLists[0]
                .ConstructorStandings[0]
        );
        setTeamResults(teamResultResponse.data.MRData.RaceTable.Races);
        setIsLoading(false);
    };

    const handleTeams = (id) => {
        const linkTo = `/constructors/${id}`;
        navigate(linkTo);
    };

    const handleRaces = (id) => {
        const linkTo = `/races/${id}`
        navigate(linkTo);
    }

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="team-details">
                    <div className="team-card">
                        <div className="team-bio-card">
                            <div className="team-avatar">
                                <img src={`/avatars/${teamDetails.Constructor.constructorId}.png`}
                                    alt="/avatars/team.png" width="100"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/avatars/team.png";
                                    }}
                                    className="teams-img"
                                />

                            </div>
                            <div>
                                <h2>
                                    <Flag className="flag" country={getCodeByNationality(countryList, teamDetails.Constructor.nationality)} />
                                    {teamDetails.Constructor.name}</h2>
                            </div>
                        </div>
                        <ul className="team-info">
                            <li>Country:{teamDetails.Constructor?.nationality}</li>
                            <li>Position:{teamDetails?.position}</li>
                            <li>Points:{teamDetails?.points}</li>
                            <li>History: <Link to={teamDetails.Constructor.url} target="_blank"><LaunchIcon fontSize="small" sx={{ fontSize: 16 }} /></Link></li>
                        </ul>
                    </div>

                    <div className="drivers">
                        <table className="team-results-tables">
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

                                    return (
                                        <tr key={teamResult.round}>
                                            <td>{teamResult.round}</td>
                                            <td onClick={() => handleRaces(teamResult.raceName)}>
                                                <Flag country={getCodeByCountryName(countryList, teamResult.Circuit.Location.country)} />{teamResult.raceName}
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
                </div >
            )}
        </>

    );
}
