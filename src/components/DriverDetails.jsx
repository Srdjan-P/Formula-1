import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";

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
        console.log(response);

        //http://ergast.com/api/f1/' + year + '/drivers/' + id + '/driverStandings.json";


        //'http://ergast.com/api/f1/' + year + '/drivers/' + id + '/driverStandings.json' 
        setIsLoading(false);
    }

    if (isLoading) {
        return <Loader />;
    }

    //console.log(response);

    return (
        <>
            <p>Driver Details</p>
        </>
    )
}