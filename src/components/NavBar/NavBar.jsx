import { useNavigate } from "react-router-dom";

import { useState } from "react";
import "./NavBar.css";
/* import logo from "../../assets/logo_apocalipsys.png"; */

const NavBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const goToSearch = (e) => {
    e.preventDefault();

    if (search !== "") navigate(`/private/search-users/${search}`);
  };

  return (
    <div className="nav">
      <form className="d-flex" role="search">
        <input
          className=""
          type="search"
          placeholder="Buscar Usuario"
          aria-label="Search"
          value={search}
          onChange={(e) => handleChange(e)}
        />

        <button onClick={(e) => goToSearch(e)} className="btn btn-search">
          Buscar
        </button>
      </form>
    </div>
  );
};

export default NavBar;
