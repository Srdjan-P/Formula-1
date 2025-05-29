import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import Loader from "./Loader";
import { useNavigate } from "react-router";
import LaunchIcon from '@mui/icons-material/Launch';
import { getCodeByCountryName, getCodeByNationality } from "../helpers/flagCodes";
import Flag from "react-flagkit";

export default function DriverDetails({ countryList, selectedYear, searchInput }) {
    const { driverId } = useParams();
    const [driverDetails, setDriverDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [driverRaces, setDriverRaces] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getDriverDetails();
        setIsLoading(true);
    }, [selectedYear]);

    const getDriverDetails = async () => {
        const driverStandingsUrl = `http://ergast.com/api/f1/${selectedYear}/drivers/${driverId}/driverStandings.json`;
        const driverStandingsResponse = await axios.get(driverStandingsUrl);

        const driverResult = `http://ergast.com/api/f1/${selectedYear}/drivers/${driverId}/results.json`;
        const driverResultResponse = await axios.get(driverResult);

        setDriverDetails(driverStandingsResponse.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
        setDriverRaces(driverResultResponse.data.MRData.RaceTable.Races);
        setIsLoading(false);
    };

    const handleTeams = (id) => {
        const linkTo = `/teams/${id}`;
        navigate(linkTo);
    };

    const handleRaces = (id) => {
        const linkTo = `/races/${id}`
        navigate(linkTo)
    };

    const filteredData = driverRaces.filter((item) => {
        if (searchInput === "") {
            return item;
        } else {
            return (
                item.raceName.toLowerCase().includes(searchInput) ||
                item.Results[0].Constructor.name.toLowerCase().includes(searchInput)
            )
        }
    })

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="driver-details-container">
                    <div className="driver-card-wrapper">

                        <div className="driver-card">
                            {/* odavde krece slika i biografija - leva strana */}
                            <div className="driver-biography-card">
                                <div className="driver-avatar">
                                    <img
                                        src={`/avatars/${driverDetails.Driver.driverId}.jpg`}
                                        alt="/avatars/avatar.png" width="100"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "/avatars/avatar.png";
                                        }}
                                        className="driver-img"
                                    />
                                </div>
                                <div className="driver-name">
                                    <h2>
                                        <span>
                                            {/* odavde krece ime i zastavica - takodje, leva strana */}
                                            <Flag className="country-flags" country={getCodeByNationality(countryList, driverDetails.Driver.nationality)} />
                                            {driverDetails.Driver.givenName} {driverDetails.Driver.familyName}
                                        </span>
                                    </h2>
                                </div>
                            </div>
                            {/* Drzava, Rodjendan itd - leva strana */}
                            <div className="driver-info">
                                <p>Nationality: {driverDetails.Driver.nationality}</p>
                                <p>Team: {driverDetails.Constructors[0].name}</p>
                                <p>Birth: {driverDetails.Driver.dateOfBirth}</p>
                                <p className="biography"><Link to={driverDetails.Driver.url} target="_blank">Biography<LaunchIcon fontSize="small" sx={{ fontSize: 16 }} /></Link></p>
                            </div>
                        </div>
                    </div>

                    {/* Tabela - desna strana */}
                    <div className="driver-details">
                        <h2>
                            Formula 1 {selectedYear} Results
                        </h2>
                        <table className="driver-details-table">
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
                                {filteredData.map((driverRace) => {
                                    return (
                                        <tr key={driverRace.round}>
                                            <td width="10%">{driverRace.round}</td>
                                            <td width="40%"
                                                onClick={() => { handleRaces(driverRace.round) }}>
                                                <span>
                                                    <Flag country={getCodeByCountryName(countryList, driverRace.Circuit.Location.country)} />
                                                    {driverRace.raceName}
                                                </span>
                                            </td>
                                            <td width="30%"
                                                onClick={() => { handleTeams(driverRace.Results[0].Constructor.constructorId) }}>
                                                <span>
                                                    {driverRace.Results[0].Constructor.name}
                                                </span>
                                            </td>
                                            <td width="10%">{driverRace.Results[0].grid}</td>
                                            <td width="10%">{driverRace.Results[0].position}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}


