import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";

export default function RaceDetails() {
    const { raceId } = useParams();
    const [qualifying, setQualifying] = useState([]);
    const [race, setRace] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getQualifying();
    }, []);

    const getQualifying = async () => {
        const urlQualifying = `http://ergast.com/api/f1/2013/${raceId}/qualifying.json`
        const qualifyingResponse = await axios.get(urlQualifying);
        console.log(qualifyingResponse.data.MRData.RaceTable.Races[0].QualifyingResults);
        const data1 = qualifyingResponse.data.MRData.RaceTable.Races[0].QualifyingResults;
        setQualifying(data1);

        const urlResults = `http://ergast.com/api/f1/2013/${raceId}/results.json`
        const resultResponse = await axios.get(urlResults)
        console.log(resultResponse.data.MRData.RaceTable.Races[0].Results);
        const data2 = resultResponse.data.MRData.RaceTable.Races[0].Results;
        setRace(data2);

        setIsLoading(false);
    };

    console.log("race", race);


    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="raceDetails">
            <div className="race-details">
                <p></p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Qualifying Results</th>
                    </tr>
                    <tr>
                        <th>Position</th>
                        <th>Driver</th>
                        <th>Team</th>
                        <th>Best Time</th>
                    </tr>
                </thead>
                <tbody>

                    {qualifying.map((driver) => {
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
                                <td>{driver.Driver.nationality}{driver.Driver.familyName}</td>
                                <td>{driver.Constructor.name}</td>
                                <td>{fastestTime}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Race Results</th>
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
                                    <td>{lap.Driver.familyName}</td>
                                    <td>{lap.Constructor.name}</td>
                                    <td>{lap.FastestLap?.Time?.time}</td>
                                    <td>{lap.points}</td>
                                </tr>


                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}