import { useContext, useState } from "react";
import "../Login/Login.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LoaderBtn from "../LoaderBtn/LoaderBtn";

const SignUp = () => {
  const userSignUp = {
    name: "",
    surname: "",
    phone: "",
    nickname: "",
    password: "",
    role: "",
    email: "",
  };

  const { error, authSignUp, loader } = useContext(AuthContext);

  const [user, setUser] = useState(userSignUp);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const sendForm = async (e) => {
    e.preventDefault();
    authSignUp(user);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="header-login">
          <h1>Registro</h1>
          <div className="underline"></div>
          <form className="login-form">
            <div className="password">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-user-square"
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
                <path d="M9 10a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                <path d="M6 21v-1a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v1" />
                <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
              </svg>
              <input
                type="text"
                placeholder="Nombre"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </div>
            <div className="password">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-user-square"
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
                <path d="M9 10a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                <path d="M6 21v-1a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v1" />
                <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
              </svg>
              <input
                type="text"
                name="surname"
                placeholder="Apellidos"
                value={user.surname}
                onChange={handleChange}
              />
            </div>

            <div className="password">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-phone"
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
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
              </svg>
              <input
                type="text"
                placeholder="Teléfono"
                name="phone"
                value={user.phone}
                onChange={handleChange}
              />
            </div>

            <div className="password">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-mail"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ff0000"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                <path d="M3 7l9 6l9 -6" />
              </svg>
              <input
                type="email"
                placeholder="Correo electrónico"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>

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
                placeholder="Ingrese
              contraseña"
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

              <span>Crear Cuenta</span>
            </button>
          </form>
          <div className="account-questions">
            <strong>
              ¿Ya tienes cuenta?{" "}
              <Link to="/" className="account-links">
                Ingresa
              </Link>
            </strong>
            <p>
              ¿Olvidaste la contraseña?
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

export default SignUp;
