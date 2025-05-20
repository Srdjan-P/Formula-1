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
        const urlqualifying = `http://ergast.com/api/f1/2013/${raceId}/qualifying.json`
        const qualifyingResponse = await axios.get(urlqualifying);
        console.log(qualifyingResponse.data.MRData.RaceTable.Races[0].Results);
        const data1 = qualifyingResponse.data.MRData;
        setQualifying(data1);

        const urlresults = `http://ergast.com/api/f1/2013/${raceId}/results.json`
        const resultResponse = await axios.get(urlresults)
        console.log(resultResponse);
        const data2 = [];
        setRace(data2);

        setIsLoading(false);
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="raceDetails">
            <div>
                <p></p>
            </div>
            <thead>
                <tr>Qualifying Results</tr>
                <tr>
                    <td>Pos</td>
                    <td>Driver</td>
                    <td>Team</td>
                    <td>Best Time</td>
                </tr>
            </thead>
            <tbody>
                {qualifying.map((driver) => {
                    return (
                        <>
                            <tr>
                                <td>{driver.position}</td>
                                <td>{driver.Driver.nationality}{driver.Driver.familyName}</td>
                                <td>{driver.Constructor.name}</td>
                                {/* <td>{driver.}</td> */}
                            </tr>
                        </>

                    )
                })}
            </tbody>
            <div>

            </div>
            <p>Results</p>
        </div>
    )
}