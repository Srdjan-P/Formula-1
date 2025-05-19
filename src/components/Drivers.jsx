import axios from "axios";
import { useEffect, useState } from "react"
import Loader from "./Loader"

export default function Drivers() {
    const [drivers, setDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getDrivers();
    }, [])

    const getDrivers = async () => {
        const url = "http://ergast.com/api/f1/2013/driverStandings.json";
        const response = await axios.get(url);
        const data = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        setDrivers(data);
        setIsLoading(false)
    }

    return (
        <div className="drivers">
            <table>
                <thead>
                    <tr>
                        <th colSpan={4}>
                            <p>Drivers Championship Standings - 2013</p>
                        </th>
                    </tr>
                </thead>
                {isLoading ? <Loader /> :
                    <tbody>
                        {drivers.map((driver) => {
                            return (
                                <tr>
                                    <td>
                                        {driver.position}
                                    </td>
                                    <td>
                                        {driver.Driver.givenName}
                                    </td>
                                    <td>
                                        {driver.Constructors[0].name}
                                    </td>
                                    <td>
                                        {driver.points}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>}
            </table>

        </div>
    )
}