import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router";
import Drivers from "./components/Drivers";
import Races from "./components/Races";
import Teams from "./components/Teams";
import Home from "./components/Home";
import DriverDetails from "./components/DriverDetails";
import RaceDetails from "./components/RaceDetails";
import TeamDetails from "./components/TeamDetails";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Select from "./components/Select";

export default function App() {
  const [countryList, setCountryList] = useState([]);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear - 1);
  const years = Array.from({ length: 50 }, (_, i) => currentYear - 1 - i);

  console.log(selectedYear);

  useEffect(() => {
    getCountryList();
  }, []);

  const getCountryList = async () => {
    const url =
      "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    const response = await axios.get(url);
    setCountryList(response.data);
    console.log(response);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <>
      <Router>
        <nav>
          <div className="logo-container">
            <NavLink to="/">
              <div className="logo"></div>
            </NavLink>
          </div>
          <ul>
            <li>
              <NavLink
                to="/drivers"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Drivers
              </NavLink>
            </li>
            <li>
              <NavLink to="/races">Races</NavLink>
            </li>
            <li>
              <NavLink to="/teams">Teams</NavLink>
            </li>
          </ul>
          <div className="select">
            <Select
              array={years}
              value={selectedYear}
              onChange={handleYearChange}
            />
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <Home countryList={countryList} selectedYear={selectedYear} />
            }
          />
          <Route
            path="/drivers"
            element={
              <Drivers countryList={countryList} selectedYear={selectedYear} />
            }
          />
          <Route
            path="/drivers/:driverId"
            element={
              <DriverDetails
                countryList={countryList}
                selectedYear={selectedYear}
              />
            }
          />
          <Route
            path="/races"
            element={
              <Races countryList={countryList} selectedYear={selectedYear} />
            }
          />
          <Route
            path="/races/:raceId"
            element={
              <RaceDetails
                countryList={countryList}
                selectedYear={selectedYear}
              />
            }
          />
          <Route
            path="/teams"
            element={
              <Teams countryList={countryList} selectedYear={selectedYear} />
            }
          />
          <Route
            path="/teams/:teamsId"
            element={
              <TeamDetails
                countryList={countryList}
                selectedYear={selectedYear}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}
