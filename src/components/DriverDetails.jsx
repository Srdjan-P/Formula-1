import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import Loader from "./Loader";

export default function DriverDetails() {
    const { driverId } = useParams();
    const [driverDetails, setDriverDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [driverRaces, setDriverRaces] = useState([]);
    const params = useParams();

    useEffect(() => {
        getDriverDetails();
    }, []);

    const getDriverDetails = async () => {
        const driverStandingsUrl = `http://ergast.com/api/f1/2013/drivers/${driverId}/driverStandings.json`;
        const driverStandingsResponse = await axios.get(driverStandingsUrl);
        setDriverDetails(driverStandingsResponse.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);

        const driverResult = `http://ergast.com/api/f1/2013/drivers/${driverId}/results.json`;
        const driverResultResponse = await axios.get(driverResult);
        setDriverRaces(driverResultResponse.data.MRData.RaceTable.Races);
        setIsLoading(false);

        console.log("driverResultResponse", driverResultResponse);
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <div className="driver-details">
                <div>
                    <h2>
                        {driverDetails.Driver.givenName} {driverDetails.Driver.familyName}
                    </h2>
                    <p>Nationality: {driverDetails.Driver.nationality}</p>
                    <p>Team: {driverDetails.Constructors[0].name}</p>
                    <p>Points: {driverDetails.points}</p>
                    <p>Wins: {driverDetails.wins}</p>
                    <p><Link to={driverDetails.Driver.url} target="_blank">Wikipedia</Link></p>
                </div>
            </div>

            <div className="drivers">
                <table>
                    <thead>
                        <tr>
                            <th>Round</th>
                            <th>Grand Prix</th>
                            <th>Team</th>
                            <th>Grid</th>
                            <th>Race</th>
                        </tr>
                    </thead>
                    <tbody>
                        {driverRaces.map((driverRace) => {
                            return (
                                <tr>
                                    <td>{driverRace.round}</td>
                                    <td>{driverRace.raceName}</td>
                                    <td>{driverRace.Results[0].Constructor.name}</td>
                                    <td>{driverRace.Results[0].grid}</td>
                                    <td>{driverRace.Results[0].position}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


