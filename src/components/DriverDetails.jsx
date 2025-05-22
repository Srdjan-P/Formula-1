import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import Loader from "./Loader";
import { useNavigate } from "react-router";
import LaunchIcon from '@mui/icons-material/Launch';
import { getCodeByCountryName, getCodeByNationality } from "../FlagCodes";
import Flag from "react-flagkit";


export default function DriverDetails({ countryList }) {
    const { driverId } = useParams();
    const [driverDetails, setDriverDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [driverRaces, setDriverRaces] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

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
    };

    const handleTeams = (id) => {
        //console.log("id", id);
        const linkTo = `/teams/${id}`;
        navigate(linkTo);
    };

    const handleRaces = (id) => {
        console.log("id", id);
        const linkTo = `/races/${id}`
        navigate(linkTo)
    };




    if (isLoading) {
        return <Loader />;
    }

    console.log("driverRaces", driverRaces);

    return (
        <div className="driver-details-container">
            <div className="driver-card">
                {/* odavde krece slika i biografija - leva strana */}
                <div className="driver-biography-card">
                    <div className="driver-avatar">
                        <img src={`/avatars/${driverDetails.Driver.driverId}.jpg`} alt="Avatar" width="100" />
                    </div>
                    <div className="driver-name">
                        <h2>
                            {/* odavde krece ime i zastavica - takodje, leva strana */}
                            <Flag className="country-flags" country={getCodeByNationality(countryList, driverDetails.Driver.nationality)} />
                            {driverDetails.Driver.givenName} {driverDetails.Driver.familyName}
                        </h2>
                    </div>
                </div>
                {/* Drzava, Rodjendan itd - leva strana */}
                <div className="driver-info">
                    <p>Country: {driverDetails.Driver.nationality}</p>
                    <p>Team: {driverDetails.Constructors[0].name}</p>
                    <p>Birth: {driverDetails.Driver.dateOfBirth}</p>
                    <p className="biography"><Link to={driverDetails.Driver.url} target="_blank">Biography<LaunchIcon fontSize="small" sx={{ fontSize: 16 }} /></Link></p>
                </div>
            </div>
            {/* Tabela - desna strana */}
            <div className="driver-details">
                <table className="driver-details-table">
                    <thead>
                        <tr>
                            <th colSpan={5}>
                                <p>Formula 1 2013 Results</p>
                            </th>
                        </tr>
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
                                    <td onClick={() => { handleRaces(driverRace.round) }}>
                                        <Flag country={getCodeByCountryName(countryList, driverRace.Circuit.Location.country)} />
                                        {driverRace.raceName}
                                    </td>
                                    <td onClick={() => { handleTeams(driverRace.Results[0].Constructor.constructorId) }}>
                                        {driverRace.Results[0].Constructor.name}
                                    </td>
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


