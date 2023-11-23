import FormVisit from "../FormVisit/FormVisit";
import UserVisit from "../UserVisit/UserVisit";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./Visit.css";
import Modal from "../Modal/Modal";
import Aside from "../Aside/Aside";
import { AppContext } from "../../context/AppContext";

const Visit = () => {
  const [newVisit, setNewVisit] = useState(false);
  const [usersVisit, setUsersVisit] = useState([]);
  const [allVisit, setAllVisit] = useState([]);
  const { openModal } = useContext(AppContext);

  const userSession = JSON.parse(localStorage.getItem("userSession")) || {};

  const today = new Date();
  const [visitDay, setVisitDay] = useState(
    `${today.getDate() <= 9 ? "0" + today.getDate() : today.getDate()}-${
      today.getMonth() + 1 <= 9
        ? "0" + (today.getMonth() + 1)
        : today.getMonth() + 1
    }-${today.getFullYear()}`
  );

  const handleSelect = (e) => {
    setVisitDay(e.target.value);
    /*  setVisitDay(e.target.value); */
  };

  const getReport = (id) => {
    console.log("aqui");
    fetch(`http://localhost:4468/api/visits/report/${id}`)
      .then(() =>
        Swal.fire({
          title: `Reporte exportado correctamente`,
          icon: "success",
          confirmButtonText: "Continuar",
        })
      )
      .catch(() =>
        Swal.fire({
          title: `Error al exportar 😟`,
          icon: "error",
          confirmButtonText: "Continuar",
        })
      );
  };

  useEffect(() => {
    fetch("http://localhost:4468/api/visits")
      .then((resp) => resp.json())
      .then((data) => {
        setAllVisit(data.data);
        setUsersVisit(() => {
          return data.data.filter((visit) => visit.visitDate === visitDay);
        });
      })

      .catch((err) => console.log(err));
  }, [visitDay, newVisit]);

  console.log(userSession.role);

  return (
    <>
      <Modal>
        <FormVisit newVisit={newVisit} setNewVisit={setNewVisit} />
      </Modal>
      <div className="visit-container">
        <Aside />
        <div className="visit-container__functions">
          <div className=" visit-selector">
            <label className=" fw-bold">Filtrar por: </label>
            <select
              style={{
                marginLeft: "0.2rem",
                borderRadius: "10px",
                padding: "0.2rem",
                border: "2px solid black",
                width: "10rem",
              }}
              name="select"
              onChange={(e) => handleSelect(e)}
            >
              <option value="no"></option>

              {allVisit.map((visit) => {
                return (
                  <option key={visit._id} value={`${visit.visitDate}`}>
                    {visit.visitDate}
                  </option>
                );
              })}
            </select>
          </div>
          <button onClick={() => openModal()} className="visit-btn">
            Agregar Visitante
          </button>
        </div>

        {usersVisit.length != 0 ? (
          <div className="visit-table">
            <div className="visit-reports">
              {userSession.role == "admin" && (
                <button className="btn-export color-blue">
                  <strong className="m-auto text-white text-button">
                    Reportes
                  </strong>
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
                </button>
              )}

              <button
                className="btn-export"
                onClick={() => getReport(usersVisit[0]._id)}
              >
                <strong className="m-auto text-white text-button">
                  Exportar
                </strong>{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-file-export"
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
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3" />
                </svg>
              </button>
            </div>

            <table className="table mt-5 text-table">
              <thead>
                <tr className="text-header-table">
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellidos</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Hora</th>
                </tr>
              </thead>
              <tbody>
                {usersVisit[0].users.map((user) => {
                  return (
                    <UserVisit
                      key={usersVisit._id}
                      visitDate={usersVisit[0].visitDate}
                      user={user}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="visit-empty">
            <h2 className="text-empty">
              {" "}
              😟 No hay usuarios visitantes el día de hoy 😟
            </h2>
          </div>
        )}
      </div>
    </>
  );
};

export default Visit;
