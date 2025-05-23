import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loader from "./Loader";
import { getCodeByNationality } from "../FlagCodes";
import Flag from "react-flagkit";

export default function Drivers({ countryList, selectedYear }) {
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getDrivers();
  }, [selectedYear]);

  console.log("drivers", drivers);

  const getDrivers = async () => {
    const url = `http://ergast.com/api/f1/${selectedYear}/driverStandings.json`;
    const response = await axios.get(url);
    const data =
      response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    setDrivers(data);
    setIsLoading(false);
  };

  const handleClickDetails = (id) => {
    const linkTo = `/drivers/${id}`;
    navigate(linkTo);
  };

  const handleClickTeams = (id) => {
    const linkTo = `/teams/${id}`;
    navigate(linkTo);
  };

  return (
    <div className="drivers">
      {isLoading ? (
        <Loader />
      ) : (
        <table>
          <thead>
            <tr>
              <th colSpan={4}>
                <p>Drivers Championship Standings - {selectedYear}</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => {
              return (
                <tr key={driver.Driver.driverId}>
                  <td style={{ textAlign: "center" }}>{driver.position}</td>
                  <td
                    width="45%"
                    onClick={() => {
                      handleClickDetails(driver.Driver.driverId);
                    }}
                  >
                    <span style={{ cursor: "pointer" }}>
                      <Flag
                        className="flag"
                        country={getCodeByNationality(
                          countryList,
                          driver.Driver.nationality
                        )}
                      />
                      {driver.Driver.givenName} {driver.Driver.familyName}
                    </span>
                  </td>
                  <td width="45%">
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleClickTeams(driver.Constructors[0].constructorId)
                      }
                    >
                      {driver.Constructors[0].name}
                    </span>
                  </td>
                  <td style={{ textAlign: "center" }}>{driver.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
