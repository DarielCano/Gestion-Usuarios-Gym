import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import User from "../components/User/User";
import { months } from "../helpers/months";
const SearchUsers = () => {
  const { search } = useParams();
  const [userMatches, setUserMatches] = useState([]);
  const today = new Date();

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

  return (
    <div
      className="container vh-100 d-flex flex-column justify-content-start align-items-center "
      style={{ marginTop: "6rem" }}
    >
      {userMatches.length !== 0 ? (
        <>
          <h4 className="mb-3 border-bottom border-2">
            Resultados de Búsqueda
          </h4>
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
              {userMatches.map((user) => {
                return <User key={user._id} user={user} />;
              })}
            </tbody>
          </table>{" "}
        </>
      ) : (
        <h3>No se encontraron coincidencias</h3>
      )}
    </div>
  );
};

export default SearchUsers;
