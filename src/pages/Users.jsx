import { useEffect, useState, useContext } from "react";
import LoaderContainer from "../components/LoaderContainer/LoaderContainer";
import User from "../components/User/User";
import { months } from "../helpers/months";
import Modal from "../components/Modal/Modal";
import { AppContext } from "../context/AppContext";

import Aside from "../components/Aside/Aside";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(false);
  const today = new Date();
  const [isDelete, setIsDelete] = useState(false);
  const [status, setStatus] = useState("");
  const { payMonth, openModal } = useContext(AppContext);
  const [showUserDetail, setShowUserDetail] = useState({});

  const handleSelect = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    setLoader(true);
    fetch("http://localhost:4468/api/users")
      .then((resp) => resp.json())
      .then((data) => {
        if (status === "pay") {
          setUsers(() => {
            return data.data.filter((data) => {
              return today.getMonth() < new Date(data.nextPay).getMonth();
            });
          });
          return;
        }
        if (status === "noPay") {
          setUsers(() => {
            return data.data.filter((data) => {
              return (
                today.getMonth() === new Date(data.nextPay).getMonth() /* &&
                 today.getDate() > new Date(data.nextPay).getDate() */
              );
            });
          });
          return;
        } else setUsers(data.data);
      })
      .catch((err) => console.log(err))
      .finally(() =>
        setTimeout(() => {
          setLoader(false);
        }, 3000)
      );
  }, [isDelete, status, payMonth]);

  const showInfo = (id) => {
    console.log(
      users.find((user) => {
        return user._id == id;
      })
    );
    setShowUserDetail(() => users.find((user) => user._id == id));
    openModal();
  };

  return (
    <div className="user-container ">
      <Modal>
        <div className="user-details">
          `<h4>Información del Usuario</h4>
          <div>
            <div className="user-details__text">
              <strong>
                <u>Nombre:</u>
              </strong>
              <small>{showUserDetail?.name}</small>
            </div>
            <div className="user-details__text">
              <strong>
                <u>Apellidos:</u>
              </strong>
              <small>{showUserDetail?.surname}</small>
            </div>
            <div className="user-details__text">
              <strong>
                <u>Email:</u>
              </strong>
              <small>{showUserDetail?.email}</small>
            </div>
            <div className="user-details__text">
              <strong>
                <u>Teléfono:</u>
              </strong>
              <small>{showUserDetail?.phone}</small>
            </div>
            <div className="user-details__text">
              <strong>
                <u>Mes pagado:</u>
              </strong>
              <small>
                {months(new Date(showUserDetail?.nextPay).getMonth() - 1)}
              </small>
            </div>
            <div className="user-details__text">
              <strong>
                <u>Próximo pago:</u>
              </strong>
              <small>
                {new Date(showUserDetail?.nextPay).getDate()} -{" "}
                {months(new Date(showUserDetail?.nextPay).getMonth())} -{" "}
                {new Date(showUserDetail?.nextPay).getFullYear()}
              </small>
            </div>
          </div>
        </div>
      </Modal>
      {loader ? (
        <LoaderContainer />
      ) : users.length === 0 && status === "" ? (
        <div className="info">
          <h3 className="mb-4 mt-3 text-center ">
            No hay usuarios agregados aún
          </h3>
        </div>
      ) : (
        <div className="user-list override">
          <Aside />
          <div className="users-content">
            <h2 className="mb-4 mt-3 text-center font ">Lista de usuarios</h2>
            <div className=" w-100 d-flex justify-content-start align-items-center mb-4 ">
              <div className="d-flex justify-content-center align-items-center ">
                <label className="font">Filtrar por: </label>
                <select
                  style={{
                    marginLeft: "0.2rem",
                    borderRadius: "10px",
                    padding: "0.2rem",
                    border: "2px solid black",
                  }}
                  name="select"
                  onChange={(e) => handleSelect(e)}
                >
                  <option value="no"> Todos</option>
                  <option value="pay"> Mes Pagado </option>
                  <option value="noPay"> Mes no pagado </option>
                </select>
              </div>
            </div>

            <table className="table font">
              <thead className="title-middle">
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellidos</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">
                    Estado del pago <span>({months(today.getMonth())})</span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <User
                      key={user._id}
                      user={user}
                      setIsDelete={setIsDelete}
                      isDelete={isDelete}
                      showInfo={showInfo}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
