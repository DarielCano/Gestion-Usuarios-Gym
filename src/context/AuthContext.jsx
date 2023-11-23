import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  /*   const [userSession, setUserSession] = useState({} */

  const authSignUp = async (user) => {
    if (
      (user.nickname == "" ||
        user.password == "" ||
        user.role == "" ||
        user.name == "" ||
        user.surname == "" ||
        user.phone == "",
      user.email == "")
    ) {
      setError("faltan datos por llenar");
      return;
    }

    fetch("http://localhost:4468/api/account/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.status == "error") {
          setError(data.message);
          return false;
        } else {
          setLoader(true);
          setTimeout(() => {
            setLoader(false);
            setError("");
            navigate("/");
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  const authLogin = async (user) => {
    if (user.nickname == "" || user.password == "" || user.role == "") {
      setError("faltan datos por llenar");
      return;
    }

    fetch("http://localhost:4468/api/account/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())

      .then((data) => {
        if (data.status == "error") {
          setError(data.message);
          return;
        } else {
          setLoader(true);
          setTimeout(() => {
            setLoader(false);
            setError("");
            localStorage.setItem("userSession", JSON.stringify(data.user));
            navigate("/private/users");
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  const closeSession = () => {
    localStorage.removeItem("userSession");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        authSignUp,
        error,
        authLogin,
        closeSession,
        loader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
