import { createContext, useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import "../index.css";
export const AppContext = createContext([]);

export function AppContextProvider({ children }) {
  const [payMonth, setPayMonth] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  /* eventos del modal */
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        /*      user, */
        payProceed,

        payMonth,
        closeModal,
        setIsOpen,
        isOpen,
        openModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
