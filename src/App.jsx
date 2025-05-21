import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router";
import Drivers from "./components/Drivers";
import Races from "./components/Races";
import Teams from "./components/Teams";
import Home from "./components/Home";
import DriverDetails from "./components/DriverDetails";
import RaceDetails from "./components/RaceDetails";
import TeamDetails from "./components/TeamDetails";

export default function App() {
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
          <Route path="/" element={<Home />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/drivers/:driverId" element={<DriverDetails />} />
          <Route path="/races" element={<Races />} />
          <Route path="/races/:raceId" element={<RaceDetails />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:teamsId" element={<TeamDetails />} />
        </Routes>
      </Router>
    </>
  )
}