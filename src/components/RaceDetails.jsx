import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";




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
        const response = await axios.get(urlqualifying);
        console.log(response);
        // const data1 = response.data.MRData.StandingsTable.driverId

        // const urlresults = `http://ergast.com/api/f1/2013/${raceId}/results.json`
        // const responseresult = await axios.get(urlresults);
        // const data2 =

        //     setQualifying(data1);
        // setRace(data2);
        // setIsLoading(false);


    };






    if (isLoading) {
        return <Loader />;
    }



    return (
        <div className="raceDetails">
            <div>
                <p></p>
            </div>
            <p>Results</p>
        </div>
    )
}