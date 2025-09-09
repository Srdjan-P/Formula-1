import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import Loader from "./Loader";
import { useNavigate } from "react-router";
import LaunchIcon from '@mui/icons-material/Launch';
import { getCodeByCountryName, getCodeByNationality } from "../helpers/flagCodes";
import Flag from "react-flagkit";
import { getMockDriverDetails } from "../helpers/mockData";

export default function DriverDetails({ countryList, selectedYear, searchInput }) {
    const { driverId } = useParams();
    const [driverDetails, setDriverDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [driverRaces, setDriverRaces] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getDriverDetails();
    }, [selectedYear, driverId]);

    const getDriverDetails = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const driverStandingsUrl = `https://ergast.com/api/f1/${selectedYear}/drivers/${driverId}/driverStandings.json`;
            const driverStandingsResponse = await axios.get(driverStandingsUrl);

            const driverResult = `https://ergast.com/api/f1/${selectedYear}/drivers/${driverId}/results.json`;
            const driverResultResponse = await axios.get(driverResult);

            if (driverStandingsResponse.data.MRData.StandingsTable.StandingsLists?.length > 0) {
                setDriverDetails(driverStandingsResponse.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
            } else {
                setDriverDetails([])
            }

            if (driverResultResponse.data.MRData.RaceTable.Races) {
                setDriverRaces(driverResultResponse.data.MRData.RaceTable.Races);
            } else {
                setDriverRaces([])
            }
        } catch (error) {
            console.error("API Error", error);
            setError("Failed to load driver details. The API might be temporarily unavailable.")

            const mockData = getMockDriverDetails(driverId, selectedYear)
            setDriverDetails(mockData.driverStandings || {});
            setDriverRaces(mockData.races || {})
        } finally {
            setIsLoading(false);
        }
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
            const searchTerm = searchInput.toLowerCase();
            return (
                item.raceName.toLowerCase().includes(searchTerm) ||
                item.Results[0].Constructor.name.toLowerCase().includes(searchTerm)
            );
        };
    });

    const retryFetch = () => {
        getDriverDetails();
    }

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <div className="error-container">
                    <div className="error-message">
                        <h3>⚠ Connection Issue</h3>
                        <p>{error}</p>
                        <p>Displaying sample data for demonstration purpose.</p>
                        <button onClick={retryFetch} className="retry-button">Try Again</button>
                    </div>

                    <div className="mock-data-warning">
                        <p><strong>Note:</strong> Showing sample data from {selectedYear}</p>
                    </div>

                    <div className="driver-details-container">
                        <div className="driver-card-wrapper">
                            <div className="driver-card">
                                {/* odavde krece slika i biografija - leva strana */}
                                <div className="driver-biography-card">
                                    <div className="driver-avatar">
                                        <img
                                            src={`/Formula-1/avatars/${driverDetails.Driver.driverId}.jpg`}
                                            alt="/avatars/avatar.png" width="100"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "/Formula-1/avatars/avatar.png";
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
                </div>
            ) : (
                <div className="driver-details-container">
                    <div className="driver-card-wrapper">
                        <div className="driver-card">
                            {/* odavde krece slika i biografija - leva strana */}
                            <div className="driver-biography-card">
                                <div className="driver-avatar">
                                    <img
                                        src={`/Formula-1/avatars/${driverDetails.Driver.driverId}.jpg`}
                                        alt="/avatars/avatar.png" width="100"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "/Formula-1/avatars/avatar.png";
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


