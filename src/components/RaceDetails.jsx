import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Loader from "./Loader";
import Flag from "react-flagkit";
import { getCodeByCountryName, getCodeByNationality } from "../helpers/flagCodes";
import { Link } from "react-router";
import LaunchIcon from '@mui/icons-material/Launch';
import getPositionColor from "../helpers/getPositionColor";

export default function RaceDetails({ countryList, selectedYear, searchInput }) {
    const { raceId } = useParams();
    const [qualifying, setQualifying] = useState({ QualifyingResults: [] });
    const [race, setRace] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getQualifying();
        setIsLoading(true);
    }, [selectedYear]);

    const getQualifying = async () => {
        const urlQualifying = `http://ergast.com/api/f1/${selectedYear}/${raceId}/qualifying.json`
        const qualifyingResponse = await axios.get(urlQualifying);

        const urlResults = `http://ergast.com/api/f1/${selectedYear}/${raceId}/results.json`
        const resultResponse = await axios.get(urlResults)

        setQualifying(qualifyingResponse.data.MRData.RaceTable.Races[0]);
        setRace(resultResponse.data.MRData.RaceTable.Races[0].Results);
        setIsLoading(false);
    };

    const handleClickDriver = (id) => {
        const linkTo = `/drivers/${id}`;
        navigate(linkTo);
    };

    const handleClickTeam = (id) => {
        const linkTo = `/teams/${id}`;
        navigate(linkTo);
    }

    const filteredData = qualifying.QualifyingResults.filter((item) => {
        if (searchInput === "") {
            return item;
        } else {
            return (
                item.Driver.familyName.toLowerCase().includes(searchInput) ||
                item.Constructor.name.toLowerCase().includes(searchInput)
            )
        }
    })

    const filteredData2 = race.filter((item) => {
        if (searchInput === "") {
            return item;
        } else {
            return (
                item.Driver.familyName.toLowerCase().includes(searchInput) ||
                item.Constructor.name.toLowerCase().includes(searchInput)
            )
        }
    })

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="raceDetails">
                    <div className="race-card">
                        <div className="race-driver">
                            <Flag className="flag" country={getCodeByCountryName(countryList, qualifying.Circuit.Location.country)} />
                            <h2>{qualifying.raceName}</h2>
                        </div>
                        <div className="race-card-details">
                            <ul>
                                <li>Country: {qualifying.Circuit.Location.country}</li>
                                <li>Location: {qualifying.Circuit.Location.locality}</li>
                                <li>Date: {qualifying.date}</li>
                                <li><Link target="_blank" to={qualifying.url}>
                                    <span>Full Report: </span>
                                    <span className="link-icon">
                                        <LaunchIcon fontSize="small" />
                                    </span>
                                </Link></li>
                            </ul>
                            <img src="/img/australiaCarbon.png" className="staza" />
                        </div>
                        <img src="/img/formulaCar.png" alt="formulaCar.png" className="bolid" />
                    </div>
                    <div className="race-tables">
                        <div className="race-table1">
                            <h2>Qualifying Results</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Pos</th>
                                        <th>Driver</th>
                                        <th>Team</th>
                                        <th>Best Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((driver) => {
                                        let fastestTime = "";
                                        if (driver.Q3) {
                                            fastestTime = driver.Q3
                                        } else if (driver.Q2) {
                                            fastestTime = driver.Q2
                                        } else {
                                            fastestTime = driver.Q1
                                        }
                                        return (
                                            <tr key={driver.position}>
                                                <td width="5%">{driver.position}</td>
                                                <td
                                                    onClick={() => handleClickDriver(driver.Driver.driverId)}
                                                >
                                                    <span>
                                                        <Flag country={getCodeByNationality(countryList, driver.Driver.nationality)} />
                                                        {driver.Driver.familyName}
                                                    </span>
                                                </td>
                                                <td
                                                    onClick={() => handleClickTeam(driver.Constructor.constructorId)}>
                                                    <span>
                                                        {driver.Constructor.name}
                                                    </span>
                                                </td>
                                                <td>{fastestTime}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="race-table2">
                            <h2>Race Results</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Pos</th>
                                        <th>Driver</th>
                                        <th>Team</th>
                                        <th>Results</th>
                                        <th>Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData2.map((lap) => {
                                        return (
                                            <tr key={lap.pstylosition}>
                                                <td>{lap.position}</td>
                                                <td width="30%"
                                                    onClick={() => handleClickDriver(lap.Driver.driverId)}>
                                                    <span>
                                                        <Flag country={getCodeByNationality(countryList, lap.Driver.nationality)} />
                                                        {lap.Driver.familyName}
                                                    </span>
                                                </td>
                                                <td
                                                    onClick={() => handleClickTeam(lap.Constructor.constructorId)}>
                                                    <span>
                                                        {lap.Constructor.name}
                                                    </span>
                                                </td>
                                                <td>{lap.Time ? lap.Time.time : lap.status}</td>
                                                <td style={getPositionColor(lap.position)}>{lap.points}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}