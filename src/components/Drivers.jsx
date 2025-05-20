import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";


export default function Drivers() {
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
            <table>
                <thead>
                    <tr>
                        <th colSpan={4}>
                            <p>Drivers Championship Standings - 2013</p>
                        </th>
                    </tr>
                </thead>
                    <tbody>
                        {drivers.map((driver, i) => {
                            return (
                                <tr key={i}>
                                    <td>
                                        {driver.position}
                                    </td>
                                    <td onClick={() =>{ handleClickDetails(driver.Driver.driverId)}}>
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
                    </tbody>
            </table>

        </div>
    )
}