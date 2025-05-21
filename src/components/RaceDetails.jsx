import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";




export default function RaceDetails() {
    const { raceId } = useParams();
    const [qualifying, setQualifying] = useState([]);
    const [race, setRace] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



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
        console.log("result", resultResponse);
        const data2 = [];
        setRace(data2);

        setIsLoading(false);
    };

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
                    <tr>Qualifying Results</tr>
                    <tr>
                        <td>Position</td>
                        <td>Driver</td>
                        <td>Team</td>
                        <td>Best Time</td>
                    </tr>
                </thead>
                <tbody>
                    {qualifying.map((driver) => {
                        return (
                            <tr key={driver.position}>
                                <td>{driver.position}</td>
                                <td>{driver.Driver.nationality}{driver.Driver.familyName}</td>
                                <td>{driver.Constructor.name}</td>
                                <td>{driver.Constructor.Time?.time}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <p>Results</p>
        </div>
    )
}