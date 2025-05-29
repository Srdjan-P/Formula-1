import { useLocation } from "react-router";
import Breadcrumbs from "./Breadcrumbs";
import BasicSelect from "./BasicSelect";

export default function NavBottom({ years, selectedYear, handleYearChange, children }) {
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
          {children}
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