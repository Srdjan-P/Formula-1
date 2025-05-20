import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";




export default function RaceDetails() {
    const { driverId } = useParams();
    const [raceDetails, setRaceDetais] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        getRaceDetails();
    }, []);

    const getRaceDetails = async () => {
        const url = 'http://ergast.com/api/f1/2013/vettel/qualifying.json'
        const response = await axios.get(url);
        console.log(response);
        const data = response.data.MRData.StandingsTable.driverId
        console.log(data);
        // setRaceDetais(data)
    };





    if (isLoading) {
        return <Loader />;
    }



    return (
        <div>
            <p>Results</p>
        </div>
    )
}