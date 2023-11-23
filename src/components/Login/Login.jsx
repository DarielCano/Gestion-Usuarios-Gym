import { Link } from "react-router-dom";
import "./Login.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoaderBtn from "../LoaderBtn/LoaderBtn";

const Login = () => {
  /*   const navigate = useNavigate(); */
  const userLogin = {
    nickname: "",
    password: "",
    role: "",
  };

  const [user, setUser] = useState(userLogin);
  const { error, authLogin, loader } = useContext(AuthContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const sendForm = (e) => {
    e.preventDefault();
    authLogin(user);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="header-login">
          <h1>Iniciar Sesión</h1>
          <div className="underline"></div>
          <form className="login-form">
            <div className="nickname">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-user"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#FF0202"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              </svg>
              <input
                type="text"
                placeholder="Ingrese nickname"
                name="nickname"
                value={user.nickname}
                onChange={handleChange}
              />
            </div>
            <div className="password">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-lock"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#FF0202"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
                <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
              </svg>
              <input
                type="password"
                name="password"
                placeholder="Ingrese contraseña"
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <div className="account-roles">
              <div className="role">
                <input
                  type="radio"
                  id="admin"
                  name="role"
                  value="admin"
                  checked={user.role === "admin"}
                  onChange={handleChange}
                  defaultChecked
                />
                <label htmlFor="admin">Admin</label>
              </div>
              <div className="role">
                <input
                  type="radio"
                  id="worker"
                  name="role"
                  value="worker"
                  onChange={handleChange}
                  checked={user.role === "worker"}
                />
                <label htmlFor="worker">Trabajador</label>
              </div>
            </div>

            {error !== "" && (
              <div className="error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-exclamation-circle"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#ff0000"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M12 9v4" />
                  <path d="M12 16v.01" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn-submit"
              onClick={(e) => sendForm(e)}
            >
              {loader && <LoaderBtn />}
              <span>Ingresar</span>
            </button>
          </form>
          <div className="account-questions">
            <strong>
              ¿No tienes cuenta?{" "}
              <Link to="/register" className="account-links">
                Crea una
              </Link>
            </strong>
            <p>
              ¿Olvidaste la contraseña?{" "}
              <Link to="/recover-password" className="account-links">
                Recuperar contraseña
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
