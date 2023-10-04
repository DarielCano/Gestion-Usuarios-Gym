import { useEffect, useState, useContext } from "react";
import Loader from "../components/Loader/Loader";
import User from "../components/User/User";
import { months } from "../helpers/months";
import { Link } from "react-router-dom";

import { AppContext } from "../context/AppContext";
import { GrUserAdd } from "react-icons/gr";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(false);
  const today = new Date();
  const [isDelete, setIsDelete] = useState(false);
  const [status, setStatus] = useState("");
  const { payMonth } = useContext(AppContext);
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
      .finally(setLoader(false));
  }, [isDelete, status, payMonth]);

  return (
    <div className="container w-100  vh-100 " style={{ marginTop: "6rem" }}>
      {loader ? (
        <Loader />
      ) : users.length === 0 && status === "" ? (
        <h3 className="mb-4 mt-3 text-center ">
          No hay usuarios agregados aún
        </h3>
      ) : (
        <div className="user-list override">
          <h2 className="mb-4 mt-3 text-center ">Lista de usuarios</h2>
          <div className=" w-100 d-flex justify-content-between align-items-center mb-4 ">
            <Link
              to={"/add-users"}
              className="d-flex justify-content-center align-items-center btn p-2 border-2 border-black rounded-3  w-25 user-hover "
            >
              <p className="m-auto w-50">Nuevo usuario</p>
              <GrUserAdd className="justify-self-end w-25" />
            </Link>

            <div className="d-flex justify-content-center align-items-center ">
              <label className="">Filtrar por: </label>
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
                <option value="no"> </option>
                <option value="pay"> Mes Pagado </option>
                <option value="noPay"> Mes no pagado </option>
              </select>
            </div>
          </div>

          <table className="table">
            <thead>
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
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
