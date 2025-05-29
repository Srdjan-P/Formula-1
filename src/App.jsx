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
import Footer from "./components/Footer";
import NavBottom from "./components/NavBottom";
import Search from "./components/Search";

export default function App() {
  const [countryList, setCountryList] = useState([]);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear - 1);
  const years = Array.from({ length: 50 }, (_, i) => currentYear - 1 - i);
  const [searchInput, setSearchInput] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    getCountryList();
  }, []);

  const getCountryList = async () => {
    const url =
      "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    const response = await axios.get(url);
    setCountryList(response.data);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value)
  }

  return (
    <Router>
      <div className="app-layout">
        <nav>
          <div className="nav-top">
            <div className="logo-container">
              <NavLink to="/" onClick={() => {
                setSearchInput("");
                setIsMenuOpen(false);
              }}>
                <div className="logo"></div>
              </NavLink>
            </div>

            <button className="menu-button" onClick={toggleMenu}>
              ☰
            </button>

            <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
              <ul>
                <li>
                  <NavLink to="/drivers" onClick={() => { setIsMenuOpen(false), setSearchInput("") }}>Drivers</NavLink>
                </li>
                <li>
                  <NavLink to="/races" onClick={() => { setIsMenuOpen(false), setSearchInput("") }}>Races</NavLink>
                </li>
                <li>
                  <NavLink to="/teams" onClick={() => { setIsMenuOpen(false), setSearchInput("") }}>Teams</NavLink>
                </li>
              </ul>
            </div>

          </div>
        </nav>
        <NavBottom years={years} handleYearChange={handleYearChange} selectedYear={selectedYear}>
          <Search value={searchInput} onChange={handleSearchInput} />
        </NavBottom>

        <main className="content-container">
          <Routes>
            <Route path="/" element={<Home countryList={countryList} selectedYear={selectedYear} />} />
            <Route path="/drivers" element={
              <Drivers countryList={countryList} selectedYear={selectedYear} searchInput={searchInput} />} />
            <Route path="/drivers/:driverId" element={
              <DriverDetails countryList={countryList} selectedYear={selectedYear} searchInput={searchInput} />} />
            <Route path="/races" element={
              <Races countryList={countryList} selectedYear={selectedYear} searchInput={searchInput} />} />
            <Route path="/races/:raceId" element={
              <RaceDetails countryList={countryList} selectedYear={selectedYear} searchInput={searchInput} />} />
            <Route path="/teams" element={<Teams countryList={countryList} selectedYear={selectedYear} searchInput={searchInput} />} />
            <Route path="/teams/:teamsId" element={<TeamDetails countryList={countryList} selectedYear={selectedYear} searchInput={searchInput} />} />
          </Routes >
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </Router >
  );
}