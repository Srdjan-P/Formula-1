import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";


export default function DriverDetails() {
    const { driverId } = useParams();
    const [driverDetails, setDriverDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getDriverDetails();
    }, []);

    const getDriverDetails = async () => {
        console.log(driverId);
        const url = "http://ergast.com/api/f1/2013/drivers/vettel/driverStandings.json";
        const response = await axios.get(url);
        //console.log(response);
        const data = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        console.log(data);
        setDriverDetails(data);
        setIsLoading(false);
    };

    if (isLoading) {
        return <Loader />;
    }

    

    return (
        <div className="driver-details">
            {driverDetails.map((driverDetail) => (
                <div key={driverDetail.Driver.driverId}>
                    <h2>
                        {driverDetail.Driver.givenName} {driverDetail.Driver.familyName}
                    </h2>
                    <p>Nationality: {driverDetail.Driver.nationality}</p>
                    <p>Constructor: {driverDetail.Constructors[0].name}</p>
                    <p>Points: {driverDetail.points}</p>
                    <p>Wins: {driverDetail.wins}</p>
                    <a href={driverDetail.Driver.url}>Wikipedia</a>
                </div>
            ))}
        </div>
    );
}


