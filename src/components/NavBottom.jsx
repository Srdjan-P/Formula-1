import { useLocation } from "react-router";
import Breadcrumbs from "./Breadcrumbs";
import Search from "./Search";

export default function NavBottom({ searchInput, handleSearchInput }) {
  const location = useLocation()
  const isHomePage = location.pathname === "/";

  if (isHomePage) return null

  return (
    <div className="nav-bottom">
      <div className="bread-crumbs-container">
        <Breadcrumbs />
      </div>
      <div className="search">
        <Search value={searchInput} onChange={handleSearchInput} />
      </div>
    </div>
  )
}