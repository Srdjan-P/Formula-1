import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router"
import Flags from "./Flags";

export default function Races() {
    const [races, setRaces] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getRaces();
    }, [])

    const getRaces = async () => {
        const url = 'http://ergast.com/api/f1/2013/results/1.json';
        const response = await axios.get(url);
        const data = response.data.MRData.RaceTable.Races
        setRaces(data);
    };

    const handleRaces = (id) => {
        const linkTo = `/races/${id}`
        navigate(linkTo)

    }
    console.log("races", races);


    return (

        <div className="races">
            <table>
                <thead>
                    <tr>
                        <th colSpan={5}>
                            <p>Race Calendar - 2013</p>
                        </th>
                    </tr>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th>Circuit</th>
                        <th>Date</th>
                        <th>Winner</th>
                    </tr>
                </thead>
                <tbody>
                    {races.map((race) => {
                        return (
                            <>
                                <tr>
                                    <td>{race.round}</td>
                                    <td onClick={() => { handleRaces(race.round) }}>
                                        <Flags nationality={race.Circuit.Location.country} />{race.raceName}</td>
                                    <td>{race.Circuit.circuitName}</td>
                                    <td>{race.date}</td>
                                    <td><Flags nationality={race.Results[0].Driver.nationality} />{race.Results[0].Driver.nationality} {race.Results[0].Driver.familyName}</td>

                                </tr>
                            </>

                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}