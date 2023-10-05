import { Link, NavLink, useNavigate } from "react-router-dom";
import { GrUserAdd } from "react-icons/gr";
import { useState } from "react";
import "./NavBar.css";
import logo from "../../assets/logo_apocalipsys.png";

const NavBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const goToSearch = () => {
    if (search !== "") navigate(`/search-users/${search}`);
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary w-100  "
      style={{
        position: "fixed",
        zIndex: "999",
        top: "0",
        left: "0",
        backgroundColor: "rgba(255, 44, 44 ,0.8 )",
      }}
    >
      <div
        className="container-fluid"
        style={{
          position: "fixed",
          zIndex: "999",
          top: "0",
          left: "0",
          backgroundColor: "rgba(255, 44, 44 ,0.8 )",
          padding: "1rem",
        }}
      >
        <Link
          to="/"
          /*      className="navbar-brand alert-danger"
          style={{ color: "white", fontFamily: "var(--font-principal)" }} */
        >
          <img className="logo" src={logo} alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "active-links nav-link links-nav"
                    : "nav-link links-nav"
                }
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive
                    ? "active-links nav-link links-nav"
                    : "nav-link links-nav"
                }
              >
                Usuarios
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/visits"
                className={({ isActive }) =>
                  isActive
                    ? "active-links nav-link links-nav"
                    : "nav-link links-nav"
                }
              >
                Visitas
              </NavLink>
            </li>
            <li className="nav-item d-flex justify-content-center align-items-center">
              <Link to="/add-users" className="nav-link user-icon-link">
                <GrUserAdd
                  style={{ marginBottom: "1rem", marginLeft: "0.1rem" }}
                />
              </Link>
            </li>
          </ul>
          <form
            className="d-flex"
            role="search"
            style={{ marginLeft: "10rem" }}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar Usuario"
              aria-label="Search"
              value={search}
              onChange={(e) => handleChange(e)}
            />

            <button onClick={() => goToSearch()} className="btn btn-search">
              Buscar
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
