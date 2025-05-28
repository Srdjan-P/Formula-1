import { useLocation } from "react-router";
import Breadcrumbs from "./Breadcrumbs";
import Search from "./Search";
import BasicSelect from "./BasicSelect";

export default function NavBottom({ searchInput, handleSearchInput, years, selectedYear, handleYearChange }) {
  const location = useLocation()
  const isHomePage = location.pathname === "/";

  if (isHomePage) return null

  return (
    <div className="nav-bottom">
      <div className="bread-crumbs-container">
        <Breadcrumbs />
      </div>
      <div className="inputs">
        <div className="search">
          <Search value={searchInput} onChange={handleSearchInput} />
        </div>
        <div className="select">
          <BasicSelect
            array={years}
            value={selectedYear}
            onChange={handleYearChange}
          />
        </div>
      </div>
    </div>
  )
}