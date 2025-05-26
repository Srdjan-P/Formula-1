import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import Loader from "./Loader";
import LaunchIcon from '@mui/icons-material/Launch';
import Flag from "react-flagkit";
import { getCodeByNationality } from "../FlagCodes";

export default function Teams({ selectedYear, countryList }) {
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getTeams();
    }, [selectedYear]);

    const getTeams = async () => {
        const url = `http://ergast.com/api/f1/${selectedYear}/constructorStandings.json`;
        const response = await axios.get(url);

        setTeams(response.data.MRData.StandingsTable.StandingsLists[0]
            .ConstructorStandings);
        setIsLoading(false);
    };

    const handleClickDetails = (id) => {
        const linkTo = `/teams/${id}`;
        navigate(linkTo);
    };


    return (
        <div className="teams-container">
            <div className="teams">
                {isLoading ? (
                    <Loader />
                ) : (
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
                                console.log("team", team);
                                return (
                                    <tr key={team.position}>
                                        <td>{team.position}</td>
                                        <td
                                            onClick={() => {
                                                handleClickDetails(team.Constructor.constructorId);
                                            }}
                                        >
                                            <span style={{ cursor: "pointer" }}>
                                                <Flag
                                                    className="flag"
                                                    country={getCodeByNationality(
                                                        countryList,
                                                        team.Constructor.nationality
                                                    )}
                                                />
                                                {team.Constructor.name}
                                            </span>
                                        </td>
                                        <td>
                                            <Link target="_blank" to={team.Constructor.url}>
                                                Details <LaunchIcon fontSize="small" />
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
            <img src="/img/formulaNissan.png" alt="Formula Nissan Bolid" className="bolid2" />
            <img src="/img/pitStop.png" alt="pit stop" className="pitStop" />
        </div>
    );
}

