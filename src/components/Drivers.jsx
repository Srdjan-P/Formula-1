import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import Loader from "./Loader";
import { getCodeByNationality } from "../FlagCodes";
import Flag from "react-flagkit";

export default function Drivers({ countryList }) {
    const [drivers, setDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getDrivers();
    }, [])

    const getDrivers = async () => {
        const url = "http://ergast.com/api/f1/2013/driverStandings.json";
        const response = await axios.get(url);
        const data = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        console.log(data);
        setDrivers(data);
        setIsLoading(false);
    };

    const handleClickDetails = (id) => {
        console.log(id);
        const linkTo = `/drivers/${id}`;
        navigate(linkTo);
    }

    return (
        <div className="drivers">
            {isLoading ? <Loader /> :
                <table>
                    <thead>
                        <tr>
                            <th colSpan={4}>
                                <p>Drivers Championship Standings - 2013</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((driver) => {
                            return (
                                <tr key={driver.Driver.driverId}>
                                    <td style={{ textAlign: "center" }}>
                                        {driver.position}
                                    </td>
                                    <td width="45%"
                                        onClick={() => { handleClickDetails(driver.Driver.driverId) }}>
                                        <Flag country={getCodeByNationality(countryList, driver.Driver.nationality)} />
                                        <span style={{ cursor: "pointer" }}>
                                            {driver.Driver.givenName} {driver.Driver.familyName}
                                        </span>
                                    </td>
                                    <td width="45%">
                                        <span style={{ cursor: "pointer" }}>
                                            {driver.Constructors[0].name}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        {driver.points}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            }
        </div>
    )
}