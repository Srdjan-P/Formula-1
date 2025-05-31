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
        const url = `https://ergast.com/api/f1/${selectedYear}/results/1.json`;
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
                                    <th>Rnd</th>
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
                                            <td style={{ textAlign: "center" }} width="10%">{race.round}</td>
                                            <td width="30%"
                                                onClick={() => { handleRaces(race.round) }}>
                                                <span style={{ cursor: "pointer" }}>
                                                    <Flag
                                                        country={getCodeByCountryName(countryList, race.Circuit.Location.country)} className="flag" />
                                                    {race.raceName}
                                                </span>
                                            </td>
                                            <td width="35%">
                                                <span>
                                                    {race.Circuit.circuitName}
                                                </span>
                                            </td>
                                            <td width="15%">{race.date}</td>
                                            <td width="10%">
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