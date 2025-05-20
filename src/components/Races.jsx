import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router"




export default function Races() {
    const [races, setRaces] = useState([]);

    useEffect(() => {
        getRaces();
    }, [])

    const getRaces = async () => {
        const url = 'http://ergast.com/api/f1/2013/results/1.json';
        const response = await axios.get(url);
        const data = response.data.MRData.RaceTable.Races
        const dataName = response.data;
        console.log("dataName", dataName);

        setRaces(data);
    };

    const handleRaceDetails = (id) => {
        const linkTo = `/drivers/${id}`
        navigate(linkTo)

    }
    console.log(races);


    return (

        <div className="racers">
            <table>
                <thead>
                    <h1>Race Calendar</h1>
                    <tr>
                        <p>Race Calendar - 2013</p>
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
                                    <td>{race.raceName}</td>
                                    <td>{race.Circuit.circuitName}</td>
                                    <td>{race.date}</td>
                                    <td>{race.round}</td>

                                </tr>
                            </>

                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}