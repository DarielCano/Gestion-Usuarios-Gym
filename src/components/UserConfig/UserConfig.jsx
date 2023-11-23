import { useContext, useEffect, useState } from "react";
import Aside from "../Aside/Aside";
import "./UserConfig.css";
import UsersAccount from "../UsersAccount/UsersAccount";
import Modal from "../Modal/Modal";
import { AppContext } from "../../context/AppContext";
import "../Login/Login.css";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

const UserConfig = () => {
  const [usersAccount, setUsersAccount] = useState([]);
  const [userAccountEdit, setUserAccountEdit] = useState(false);
  const { openModal, closeModal } = useContext(AppContext);
  const [userRol, setUserRol] = useState({});
  const userSession = JSON.parse(localStorage.getItem("userSession")) || {};
  useEffect(() => {
    fetch("http://localhost:4468/api/account/users")
      .then((resp) => resp.json())
      .then((data) => setUsersAccount(data.data));
  }, [userAccountEdit]);

  const handleRol = (e) => {
    const { value } = e.target;

    setUserRol({ ...userRol, role: value });
  };

  const editRol = (id) => {
    setUserRol(usersAccount.find((user) => user._id === id));
    openModal();
  };

  const editConfirm = () => {
    fetch("http://localhost:4468/api/account/edit", {
      method: "PUT",
      body: JSON.stringify(userRol),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((msg) => {
        console.log(msg.message);
        setUserAccountEdit(!userAccountEdit);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        closeModal();
        Swal.fire({
          icon: "success",
          text: "Cambio de role realizado con éxito!!",
          confirmButtonText: "Continuar",
        });
      });
  };

  if (userSession.role === "admin") {
    return (
      <>
        <Modal>
          <div className=" account-roles account-block">
            <div className="account-info-user">
              <h3>Cuenta de usuario</h3>

              <article>
                <strong>Nickname:</strong>
                <small>{userRol.nickname}</small>
              </article>
              <article>
                <strong>Email:</strong>
                <small>{userRol.email}</small>
              </article>
              <article>
                <strong>Teléfono:</strong>
                <small>{userRol.phone}</small>
              </article>
            </div>

            <div className="roles">
              <strong className="role-subtitle">Rol:</strong>
              <div className="role">
                <input
                  type="radio"
                  id="admin"
                  name="role"
                  value="admin"
                  checked={userRol.role === "admin"}
                  onChange={handleRol}
                />
                <label htmlFor="admin">Admin</label>
              </div>
              <div className="role">
                <input
                  type="radio"
                  id="worker"
                  name="role"
                  value="worker"
                  onChange={handleRol}
                  checked={userRol.role === "worker"}
                />
                <label htmlFor="worker">Trabajador</label>
              </div>
            </div>

            <button className="btn btn-change" onClick={editConfirm}>
              Cambiar
            </button>
          </div>
        </Modal>
        <div className="container">
          <Aside />

          <div className="accounts-container">
            <h3>Cuentas de usuario</h3>
            <table className="table">
              <thead className="">
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellidos</th>
                  <th scope="col">Nickname</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Email</th>
                  <th scope="col">Rol</th>
                </tr>
              </thead>
              <tbody>
                {usersAccount.map((user) => {
                  return (
                    <UsersAccount
                      key={user._id}
                      user={user}
                      editRol={editRol}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
  return <Navigate to={"/"} />;
};
export default UserConfig;
