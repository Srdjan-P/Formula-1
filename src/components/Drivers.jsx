import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loader from "./Loader";
import { getCodeByNationality } from "../FlagCodes";
import Flag from "react-flagkit";

export default function Drivers({ countryList, selectedYear, searchInput }) {
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getDrivers();
    setIsLoading(true)
  }, [selectedYear]);

  console.log("drivers", drivers);

  const getDrivers = async () => {
    const url = `http://ergast.com/api/f1/${selectedYear}/driverStandings.json`;
    const response = await axios.get(url);

    setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
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

  const filteredData = drivers.filter((item) => {
    if (searchInput === "") {
      return item;
    } else {
      return (
        item.Driver.givenName.toLowerCase().includes(searchInput) ||
        item.Driver.familyName.toLowerCase().includes(searchInput)
      )
    }
  })

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
            {filteredData.map((driver) => {
              return (
                <tr key={driver.Driver.driverId}>
                  <td style={{ textAlign: "center" }}>{driver.position}</td>
                  <td
                    width="45%"
                    onClick={() => {
                      handleClickDetails(driver.Driver.driverId);
                    }}
                  >
                    <span >
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
