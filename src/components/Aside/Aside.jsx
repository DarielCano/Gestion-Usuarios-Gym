import "./Aside.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_apocalipsys.png";
import "animate.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Aside = () => {
  const userSession = JSON.parse(localStorage.getItem("userSession")) || {};
  const { closeSession } = useContext(AuthContext);

  return (
    <div className="aside">
      <div className="header-user">
        <div className="logo-user">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-user-circle"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ffffff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
          </svg>
        </div>
        <h5>{userSession.nickname}</h5>
      </div>

      <div className="aside-links">
        <Link to={"/private/users"} className="aside-links__users">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-users"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ffffff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
          </svg>
          <h6>Usuarios</h6>
        </Link>
        <Link to={"/private/add-users"} className="aside-links__users">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-user-plus"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ffffff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M16 19h6" />
            <path d="M19 16v6" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
          </svg>
          <h6>Nuevo Usuario</h6>
        </Link>
      </div>
      <Link to={"/private/visits"} className="aside-links__users">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-users-group"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
          <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
          <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
          <path d="M17 10h2a2 2 0 0 1 2 2v1" />
          <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
          <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
        </svg>
        <h6>Visitas</h6>
      </Link>
      {userSession.role == "admin" && (
        <>
          <Link to={"/config"} className="aside-links__users">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-user-cog"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h2.5" />
              <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M19.001 15.5v1.5" />
              <path d="M19.001 21v1.5" />
              <path d="M22.032 17.25l-1.299 .75" />
              <path d="M17.27 20l-1.3 .75" />
              <path d="M15.97 17.25l1.3 .75" />
              <path d="M20.733 20l1.3 .75" />
            </svg>
            <h6>Configuración</h6>
          </Link>
          <Link to={"/reports"} className="aside-links__users">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-report"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697" />
              <path d="M18 14v4h4" />
              <path d="M18 11v-4a2 2 0 0 0 -2 -2h-2" />
              <path d="M8 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
              <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
              <path d="M8 11h4" />
              <path d="M8 15h3" />
            </svg>
            <h6>Reportes</h6>
          </Link>
        </>
      )}

      <div className="aside-links__users close-sesion" onClick={closeSession}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-user-off"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8.18 8.189a4.01 4.01 0 0 0 2.616 2.627m3.507 -.545a4 4 0 1 0 -5.59 -5.552" />
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4c.412 0 .81 .062 1.183 .178m2.633 2.618c.12 .38 .184 .785 .184 1.204v2" />
          <path d="M3 3l18 18" />
        </svg>
        <h6>Cerrar Sesión</h6>
      </div>

      <Link to="private/users" className="aside-logo">
        <img className="logo " src={logo} alt="logo" />
      </Link>
    </div>
  );
};

export default Aside;
