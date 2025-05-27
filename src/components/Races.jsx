import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router"
import Flag from "react-flagkit";
import { getCodeByCountryName, getCodeByNationality } from "../FlagCodes";
import Loader from "./Loader";

export default function Races({ countryList, selectedYear }) {
    const [races, setRaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        getRaces();
    }, [selectedYear])

    const getRaces = async () => {
        const url = `http://ergast.com/api/f1/${selectedYear}/results/1.json`;
        const response = await axios.get(url);
        const data = response.data.MRData.RaceTable.Races;

        setRaces(data);
        setIsLoading(false)
    };

    const handleRaces = (id) => {
        const linkTo = `/races/${id}`
        navigate(linkTo)

    }
    // console.log("countryList", countryList);
    console.log("races", races);



    return (

        <div className="races">
            {isLoading ? (
                <Loader />
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th colSpan={5}>
                                <p>Race Calendar - {selectedYear}</p>
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
                                    <tr key={race.round}>
                                        <td>{race.round}</td>
                                        <td style={{ cursor: "pointer" }}
                                            onClick={() => { handleRaces(race.round) }}>
                                            <Flag
                                                country={getCodeByCountryName(countryList, race.Circuit.Location.country)} className="flag" />
                                            {race.raceName}
                                        </td>
                                        <td>{race.Circuit.circuitName}</td>
                                        <td>{race.date}</td>

                                        <td>
                                            <Flag country={getCodeByNationality(countryList, race.Results[0].Driver.nationality)} className="flag" />
                                            {race.Results[0].Driver.familyName}</td>

                                    </tr>
                                </>

                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}