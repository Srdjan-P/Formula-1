import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loader from "./Loader";
import { getCodeByNationality } from "../helpers/flagCodes";
import Flag from "react-flagkit";
import { getMockDrivers } from "../helpers/mockData";

export default function Drivers({ countryList, selectedYear, searchInput }) {
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getDrivers();
  }, [selectedYear]);

  const getDrivers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const url = `https://ergast.com/api/f1/${selectedYear}/driverStandings.json`;
      const response = await axios.get(url);

      if (response.data.MRData.StandingsTable.StandingsLists &&
        response.data.MRData.StandingsTable.StandingsLists.lenght > 0) {
        setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
      } else {
        setDrivers([]);
      }

    } catch (error) {
      console.error("API Error:", error);
      setError("Failed to load driver data. The API might be temporarily unavailable.");
      setDrivers(getMockDrivers(selectedYear))
    } finally {
      setIsLoading(false);
    };
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
      const searchTerm = searchInput.toLowerCase()
      return (
        item.Driver.givenName.toLowerCase().includes(searchTerm) ||
        item.Driver.familyName.toLowerCase().includes(searchTerm) ||
        item.Constructors[0].name.toLowerCase().includes(searchTerm)
      );
    }
  });

  const retryFetch = () => {
    getDrivers();
  };

  return (
    <div className="drivers">
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

          <table>
            <thead>
              <tr>
                <th colSpan={4}>
                  <p>Drivers Championship Standings - {selectedYear} (Sample Data)</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((driver) => {
                return (
                  <tr key={driver.Driver.driverId}>
                    <td width="10%">{driver.position}</td>
                    <td
                      width="40%"
                      onClick={() => {
                        handleClickDetails(driver.Driver.driverId);
                      }}
                    >
                      <span >
                        <Flag
                          country={getCodeByNationality(
                            countryList,
                            driver.Driver.nationality
                          )}
                        />
                        {driver.Driver.givenName} {driver.Driver.familyName}
                      </span>
                    </td>
                    <td width="40%">
                      <span className="cursor align-left"
                        onClick={() =>
                          handleClickTeams(driver.Constructors[0].constructorId)
                        }
                      >
                        {driver.Constructors[0].name}
                      </span>
                    </td>
                    <td width="10%">{driver.points}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
                  <td width="10%">{driver.position}</td>
                  <td
                    width="40%"
                    onClick={() => {
                      handleClickDetails(driver.Driver.driverId);
                    }}
                  >
                    <span >
                      <Flag
                        country={getCodeByNationality(
                          countryList,
                          driver.Driver.nationality
                        )}
                      />
                      {driver.Driver.givenName} {driver.Driver.familyName}
                    </span>
                  </td>
                  <td width="40%">
                    <span className="cursor align-left"
                      onClick={() =>
                        handleClickTeams(driver.Constructors[0].constructorId)
                      }
                    >
                      {driver.Constructors[0].name}
                    </span>
                  </td>
                  <td width="10%">{driver.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
