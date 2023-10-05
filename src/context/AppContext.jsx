import { createContext, useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { months } from "../helpers/months";
import "../index.css";
export const AppContext = createContext([]);

export function AppContextProvider({ children }) {
  /*   const [user, setUser] = useState({}); */
  /* const day = new Date();
   const lastMonthPay = months(day.getMonth()); */
  const [payMonth, setPayMonth] = useState(false);

  const payProceed = (id) => {
    fetch(`http://localhost:4468/api/user/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        Swal.fire({
          showCancelButton: true,
          icon: "question",

          text: `Desea proceder al pago del usuario ${data.data.name} ${data.data.surname}?`,
          confirmButtonText: "Pagar",
          cancelButtonText: "Cerrar",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`http://localhost:4468/api//update-date/${id}`, {
              method: "PUT",
            }).then(() =>
              Swal.fire({
                icon: "success",
                text: "Pago realizado correctamente",
                confirmButtonText: "Continuar",
              })
            );
            setPayMonth(!payMonth);
          }
        });
      })
      .catch((err) => err);
  };

  const showInfo = (id) => {
    fetch(`http://localhost:4468/api/user/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        Swal.fire({
          html: `<h3 style=>Información del Usuario</h3>
          <div >
          <div className="custom-class"><strong> <u>Nombre:</u></strong> <small>${
            data.data.name
          }</small></div>
          <div><strong><u>Apellidos:</u></strong> <small>${
            data.data.surname
          }</small></div>
          <div><strong><u>email:</u></strong> <small>${
            data.data.email
          }</small></div>
          <div><strong><u>Teléfono:</u></strong> <small>${
            data.data.phone
          }</small></div>
          <div><strong><u>Mes pagado:</u></strong> <small>${months(
            new Date(data.data.nextPay).getMonth() - 1
          )}</small></div>
          <div><strong><u>Próximo pago:</u></strong> <small>${new Date(
            data.data.nextPay
          ).getDate()} - ${months(
            new Date(data.data.nextPay).getMonth()
          )} - ${new Date(data.data.nextPay).getFullYear()}
                    </small></div> 
          
          
          </div>
        `,

          confirmButtonText: "Continuar",
        });
      })
      .catch((err) => err);
  };

  return (
    <AppContext.Provider
      value={{
        /*      user, */
        payProceed,
        showInfo,
        payMonth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
