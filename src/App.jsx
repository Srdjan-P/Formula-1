import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router"

import Drivers from "./components/Drivers";
import Races from "./components/Races"
import Teams from "./components/Teams"

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
          <Route path="/" element={""} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/races" element={<Races />} />
          <Route path="/teams" element={<Teams />} />
        </Routes>

      </Router>
    </>
  )
}