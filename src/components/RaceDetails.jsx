import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";
import Flag from "react-flagkit";
import { getCodeByCountryName, getCodeByNationality } from "../FlagCodes";


export default function RaceDetails({ countryList, selectedYear }) {
    const { raceId } = useParams();
    const [qualifying, setQualifying] = useState([]);
    const [race, setRace] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getQualifying();
    }, [selectedYear]);

    const getQualifying = async () => {
        const urlQualifying = `http://ergast.com/api/f1/${selectedYear}/${raceId}/qualifying.json`
        const qualifyingResponse = await axios.get(urlQualifying);
        console.log("1 ", qualifyingResponse.data.MRData.RaceTable.Races[0]);
        setQualifying(qualifyingResponse.data.MRData.RaceTable.Races[0]);

        const urlResults = `http://ergast.com/api/f1/${selectedYear}/${raceId}/results.json`
        const resultResponse = await axios.get(urlResults)
        console.log(resultResponse.data.MRData.RaceTable.Races[0].Results);
        const data2 = resultResponse.data.MRData.RaceTable.Races[0].Results;
        setRace(data2);

        setIsLoading(false);
    };

    console.log("race", race);

    console.log("qualifying", qualifying);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="raceDetails">
            <div className="race-card">
                <div className="race-driver">
                    <Flag className="flag" country={getCodeByCountryName(countryList, qualifying.Circuit.Location.country)} />

                    <h2>{qualifying.raceName}</h2>
                </div>
                <div className="race-details">
                    <ul>
                        <li>Country: {qualifying.Circuit.Location.country}</li>
                        <li>Location: {qualifying.Circuit.Location.locality}</li>
                        <li>Date: {qualifying.date}</li>
                        <li>Full Report:</li>
                        <img src="/img/australiaCarbon.png" className="staza" />
                        <img src="/img/formulaCar.png" alt="" srcset="" className="bolid" />
                    </ul>
                </div>
            </div>
            <div className="race-tables">
                <div className="race-table1">

                    <table>
                        <thead>
                            <tr>
                                <th colspan={4}>Qualifying Results</th>
                            </tr>
                            <tr>
                                <th>Position</th>

                                <th>Driver</th>

                                <th>Team</th>
                                <th>Best Time</th>
                            </tr>
                        </thead>
                        <tbody>

                            {qualifying.QualifyingResults.map((driver) => {
                                let fastestTime = "";
                                if (driver.Q3) {
                                    fastestTime = driver.Q3
                                } else if (driver.Q2) {
                                    fastestTime = driver.Q2
                                } else {
                                    fastestTime = driver.Q1
                                }
                                return (
                                    <tr key={driver.position}>
                                        <td>{driver.position}</td>
                                        <td>    <Flag country={getCodeByNationality(countryList, driver.Driver.nationality)} /></td>

                                        <td>{driver.Driver.nationality}{driver.Driver.familyName}</td>
                                        <td>{driver.Constructor.name}</td>
                                        <td>{fastestTime}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="race-table2">
                    <table>
                        <thead>
                            <tr>
                                <th colspan={5}>Race Results</th>
                            </tr>
                            <tr>
                                <th>Position</th>
                                <th>Driver</th>
                                <th>Team</th>
                                <th>Results</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {race.map((lap) => {
                                return (
                                    <tr key={lap.position}>
                                        <td>{lap.position}</td>
                                        <td>    <Flag country={getCodeByNationality(countryList, lap.Driver.nationality)} /></td>
                                        <td>{lap.Driver.familyName}</td>
                                        <td>{lap.Constructor.name}</td>
                                        <td>{lap.Time ? lap.Time.time : lap.status}</td>
                                        <td>{lap.points}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}