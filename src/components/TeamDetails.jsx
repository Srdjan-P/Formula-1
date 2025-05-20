import axious from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react/router" ;
import Loader from "./Loader" ;
import axios from "axios";

export default function TeamDetails () {
    const { teamId } = useParams();
    const [teamDetails, setTeamDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getTeamDetails();
    }, []);

    const getTeamDetails = async () => {
        console.log(teamId);
        const url =  "http://ergast.com/api/f1/2013/constructors/vettel/constructorStandings.json";
        const response = await axios.get(url);
        console.log(response);
        setIsLoading(false);
    }

    if (isLoading) {
        return <Loader />;
    }
    return (
        <>
        <p>Team Details</p>
        </>
    )
}