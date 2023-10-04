import FormVisit from "../FormVisit/FormVisit";
import UserVisit from "../UserVisit/UserVisit";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Visit = () => {
  const [newVisit, setNewVisit] = useState(false);
  const [usersVisit, setUsersVisit] = useState([]);
  const [allVisit, setAllVisit] = useState([]);
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

  return (
    <div
      className="w-100  vh-100 d-flex "
      style={{ marginTop: "6rem", paddingLeft: "0.8rem" }}
    >
      <div
        className="visitForm w-50 "
        style={{
          backgroundColor: "rgba(255, 44, 44 ,0.8 )",
          borderRadius: "15px",
          marginTop: "-22px",
          marginLeft: "-10px",
          height: "85vh",
        }}
      >
        <FormVisit newVisit={newVisit} setNewVisit={setNewVisit} />

        <div className="w-100 d-flex justify-content-center align-items-center mt-4">
          <label className=" text-white fw-bold">Filtrar por: </label>
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
      </div>

      {usersVisit.length != 0 ? (
        <div className="w-75 p-4 d-flex flex-column justify-content-start align-items-start">
          <div className="w-100 d-flex">
            <button className="w-25 m-auto d-flex btn-info p-2 btn">
              <strong className="m-auto text-white">Reportes</strong>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-file-report"
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
                <path d="M17 17m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M17 13v4h4" />
                <path d="M12 3v4a1 1 0 0 0 1 1h4" />
                <path d="M11.5 21h-6.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v2m0 3v4" />
              </svg>
            </button>
            <button
              className="w-25  m-auto d-flex  btn-success p-2 btn"
              onClick={() => getReport(usersVisit[0]._id)}
            >
              <strong className="m-auto text-white">Exportar</strong>{" "}
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

          <table className="table mt-4">
            <thead>
              <tr>
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
        <h2 className="w-75 text-center mt-5 ">
          {" "}
          😟 No hay usuarios visitantes el día de hoy 😟
        </h2>
      )}
    </div>
  );
};

export default Visit;
