import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import Loader from "./Loader";
import LaunchIcon from '@mui/icons-material/Launch';
import Flag from "react-flagkit";
import { getCodeByNationality } from "../helpers/flagCodes";

export default function Teams({ selectedYear, countryList, searchInput }) {
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getTeams();
        setIsLoading(true);
    }, [selectedYear]);

    const getTeams = async () => {
        const url = `https://ergast.com/api/f1/${selectedYear}/constructorStandings.json`;
        const response = await axios.get(url);

        setTeams(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        setIsLoading(false);
    };

    const handleClickDetails = (id) => {
        const linkTo = `/teams/${id}`;
        navigate(linkTo);
    };

    const filteredData = teams.filter((team) => {
        if (!searchInput) {
            return team;
        } else {
            return (
                team.Constructor.name.toLowerCase().includes(searchInput.toLowerCase())
            )
        }
    })

    return (
        <div className="teams-wrapper">

            <div className="teams-container">
                <div className="teams">
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan={4}>
                                        Constructor Championship Standings - {selectedYear}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((team) => {
                                    return (
                                        <tr key={team.Constructor.constructorId}>
                                            <td>{team.position}</td>
                                            <td
                                                onClick={() => {
                                                    handleClickDetails(team.Constructor.constructorId);
                                                }}>
                                                <span>
                                                    <Flag
                                                        country={getCodeByNationality(
                                                            countryList,
                                                            team.Constructor.nationality
                                                        )} />
                                                    {team.Constructor?.name}
                                                </span>
                                            </td>
                                            <td>
                                                <Link target="_blank" to={team.Constructor.url}>
                                                    Details
                                                    <LaunchIcon fontSize="small" />
                                                </Link>
                                            </td>
                                            <td>{team.points}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>

    );
}

