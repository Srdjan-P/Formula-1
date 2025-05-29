import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router"
import Flag from "react-flagkit";
import { getCodeByCountryName, getCodeByNationality } from "../helpers/flagCodes";
import Loader from "./Loader";

export default function Races({ countryList, selectedYear, searchInput }) {
    const [races, setRaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        getRaces();
        setIsLoading(true);
    }, [selectedYear])

    const getRaces = async () => {
        const url = `http://ergast.com/api/f1/${selectedYear}/results/1.json`;
        const response = await axios.get(url);

        setRaces(response.data.MRData.RaceTable.Races);
        setIsLoading(false)
    };

    const handleRaces = (id) => {
        const linkTo = `/races/${id}`
        navigate(linkTo)
    }

    const filteredData = races.filter((item) => {
        if (searchInput === "") {
            return item;
        } else {
            return (
                item.raceName.toLowerCase().includes(searchInput) ||
                item.Circuit.circuitName.toLowerCase().includes(searchInput) ||
                item.Results[0].Driver.familyName.toLowerCase().includes(searchInput)
            )
        }
    })

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="races">
                    <div className="races-data">
                        <h2>Race Calendar - {selectedYear}</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Round</th>
                                    <th>Grand Prix</th>
                                    <th>Circuit</th>
                                    <th>Date</th>
                                    <th>Winner</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((race) => {
                                    return (
                                        <tr key={race.round}>
                                            <td width="5%">{race.round}</td>
                                            <td
                                                onClick={() => { handleRaces(race.round) }}>
                                                <span>
                                                    <Flag
                                                        country={getCodeByCountryName(countryList, race.Circuit.Location.country)} className="flag" />
                                                    {race.raceName}
                                                </span>
                                            </td>
                                            <td>
                                                <span>
                                                    {race.Circuit.circuitName}
                                                </span>
                                            </td>
                                            <td>{race.date}</td>
                                            <td>
                                                <span style={{ cursor: "default" }}>
                                                    <Flag country={getCodeByNationality(countryList, race.Results[0].Driver.nationality)} className="flag" />
                                                    {race.Results[0].Driver.familyName}
                                                </span>
                                            </td >
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}