import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import Loader from "./Loader";

export default function Teams() {
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getTeams();
    }, []);

    const getTeams = async () => {
        const url = `http://ergast.com/api/f1/2013/constructorStandings.json`;
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
                                <td
                                    onClick={() => {
                                        handleClickDetails(team.Constructor.constructorId);
                                    }}
                                >
                                    {team.Constructor.name}
                                </td>
                                <td>
                                    <Link target="_blank" to={team.Constructor.url}>
                                        Details
                                    </Link>
                                </td>
                                <td>{team.points}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
