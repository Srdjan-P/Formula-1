import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";
import Loader from "./Loader";
import LaunchIcon from '@mui/icons-material/Launch';
import { getCodeByCountryName, getCodeByNationality } from "../FlagCodes";
import Flag from "react-flagkit";
import getPositionColor from "./getPositionColor";

export default function TeamDetails({ countryList, selectedYear, searchInput }) {
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

        setTeamDetails(teamStandingResponse.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);
        setTeamResults(teamResultResponse.data.MRData.RaceTable.Races);
        setIsLoading(false);
    };

    const handleRaces = (id) => {
        const linkTo = `/races/${id}`
        navigate(linkTo);
    }

    const filteredData = teamResults.filter((item) => {
        if (searchInput === "") {
            return item;
        } else {
            return (
                item.raceName.toLowerCase().includes(searchInput)
            )
        }
    })

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
                            <div className="flag-name">
                                <span>
                                    <Flag className="flag" country={getCodeByNationality(countryList, teamDetails.Constructor.nationality)} />
                                    <h2>{teamDetails.Constructor.name}</h2>
                                </span>
                            </div>
                        </div>
                        <ul className="team-info">
                            <li>Country:{teamDetails.Constructor?.nationality}</li>
                            <li>Position:{teamDetails?.position}</li>
                            <li>Points:{teamDetails?.points}</li>
                            <li>History: <Link to={teamDetails.Constructor.url} target="_blank"><LaunchIcon fontSize="small" sx={{ fontSize: 16 }} /></Link></li>
                        </ul>
                    </div>
                    <div className="team-details-table">
                        <div className="team-details-h2">

                            <h2>Formula 1 {selectedYear} Results</h2>
                        </div>
                        <table>
                            <thead>

                                <tr>
                                    <th>Round</th>
                                    <th>Grand Prix</th>
                                    <th>{teamResults[0].Results[0].Driver.familyName}</th>
                                    <th>{teamResults[0].Results[1].Driver.familyName}</th>
                                    <th>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((teamResult) => {

                                    return (
                                        <tr key={teamResult.round}>
                                            <td>{teamResult.round}</td>
                                            <td
                                                onClick={() => handleRaces(teamResult.round)} width="80%">
                                                <span>
                                                    <Flag country={getCodeByCountryName(countryList, teamResult.Circuit.Location.country)} />{teamResult.raceName}
                                                </span>
                                            </td>
                                            <td className="cursor" width="30%" style={getPositionColor(teamResult.Results[0].position)}>{teamResult.Results[0].position}</td>
                                            <td style={getPositionColor(teamResult.Results[1].position)}>{teamResult.Results[1].position}</td>
                                            <td >{parseInt(teamResult.Results[0].points) + parseInt(teamResult.Results[1].points)} </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div >
            )
            }
        </>
    );
}
