import { useLocation, Link } from "react-router";

export default function Breadcrumbs() {
  const location = useLocation("");
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <ul className="bread-crumbs">
      <li>
        <Link to="/">HOME</Link>
      </li>
      {pathnames.map((value, i) => {
        const last = i === pathnames.length - 1;
        const to = `/${pathnames.slice(0, i + 1).join("/")}`;
        const title = value.toUpperCase().replace(/_/g, " ");

        return (
          <li key={to}>
            {last ? (
              <span className="bread-crumbs-current">{title}</span>
            ) : (
              <Link to={to}>{title}</Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}