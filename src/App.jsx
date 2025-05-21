import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router";
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

export default function App({ }) {
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    getCountryList();
  }, [])

  const getCountryList = async () => {
    const url = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    const response = await axios.get(url)
    setCountryList(response.data);
    console.log(response);
  }

  return (
    <>
      <Router>
        {/* Navigacija */}
        <nav>
          <div className="logo-container">
            <NavLink to="/"><div className="logo"></div></NavLink>
          </div>
          <ul>
            <li>
              <NavLink to="/drivers">Drivers</NavLink>
            </li>
            <li>
              <NavLink to="/races">Races</NavLink>
            </li>
            <li>
              <NavLink to="/teams">Teams</NavLink>
            </li>
          </ul>
        </nav>

        {/* Rute */}

        <Routes>
          <Route path="/" element={<Home countryList={countryList} />} />
          <Route path="/drivers" element={<Drivers countryList={countryList} />} />
          <Route path="/drivers/:driverId" element={<DriverDetails countryList={countryList} />} />
          <Route path="/races" element={<Races countryList={countryList} />} />
          <Route path="/races/:raceId" element={<RaceDetails countryList={countryList} />} />
          <Route path="/teams" element={<Teams countryList={countryList} />} />
          <Route path="/teams/:teamsId" element={<TeamDetails countryList={countryList} />} />
        </Routes>
      </Router>
    </>
  )
}