import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import User from "../components/User/User";
import { months } from "../helpers/months";
import Aside from "../components/Aside/Aside";
import { AppContext } from "../context/AppContext";
import Modal from "../components/Modal/Modal";

const SearchUsers = () => {
  const { search } = useParams();
  const [userMatches, setUserMatches] = useState([]);
  const [showUserDetail, setShowUserDetail] = useState({});
  const today = new Date();
  const { openModal } = useContext(AppContext);

  useEffect(() => {
    fetch("http://localhost:4468/api/users")
      .then((resp) => resp.json())
      .then((data) => {
        let values = data.data.filter(
          (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.includes(search.toLowerCase())
        );

        setUserMatches(values);
      })

      .catch((err) => console.log(err));
  }, [search]);

  const showInfo = (id) => {
    setShowUserDetail(() => userMatches.find((user) => user._id == id));
    openModal();
  };

  return (
    <>
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
      <div
        className="container vh-100 d-flex flex-column justify-content-start align-items-center "
        style={{ marginTop: "6rem", paddingLeft: "10rem" }}
      >
        <Aside />
        {userMatches.length !== 0 ? (
          <>
            <h4 className="mb-5 border-bottom border-2">
              Resultados de Búsqueda
            </h4>
            <table
              className="table font "
              style={{
                fontFamily: " var(--font-principal)",
              }}
            >
              <thead>
                <tr className="title-middle">
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
                {userMatches.map((user) => {
                  return (
                    <User key={user._id} user={user} showInfo={showInfo} />
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <div className="zero-matches">
            <h3>😟 No se encontraron coincidencias 😟</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchUsers;
