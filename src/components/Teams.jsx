import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import Loader from "./Loader";
import LaunchIcon from '@mui/icons-material/Launch';
import Flag from "react-flagkit";
import { getCodeByNationality } from "../FlagCodes";

<<<<<<< HEAD
export default function Teams({selectedYear}) {
=======
export default function Teams({ countryList }) {
>>>>>>> 3a91ca15fec64208ebd7956f3c9b55cd60064059
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getTeams();
    }, []);

    const getTeams = async () => {
        const url = `http://ergast.com/api/f1/${selectedYear}/constructorStandings.json`;
        const response = await axios.get(url);
        const data =
            response.data.MRData.StandingsTable.StandingsLists[0]
                .ConstructorStandings;
        console.log("data", data);
        setTeams(data);
        setIsLoading(false);
    };

    const handleClickDetails = (id) => {
        const linkTo = `/teams/${id}`;
        navigate(linkTo);
    };
    console.log(teams);

    return (
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
                        {teams.map((team, i) => {
                            console.log("team", team);
                            return (
                                <tr key={i}>
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
    );
}
