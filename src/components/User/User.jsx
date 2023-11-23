import PropTypes from "prop-types";
import { PiPencilLineDuotone } from "react-icons/pi";
import { TbEyeSearch } from "react-icons/tb";

import { BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

import "./User.css";

const User = ({ user, setIsDelete, isDelete, showInfo }) => {
  const navigate = useNavigate();
  const { name, surname, phone, nextPay } = user;
  const today = new Date();
  const pay = new Date(nextPay);
  const { payProceed } = useContext(AppContext);

  const isPay =
    today.getMonth() ===
    pay.getMonth(); /* && today.getDate() > pay.getDate() */
  const afterPay = today.getMonth() < pay.getMonth();

  const deleteUser = (id) => {
    Swal.fire({
      title: "Está seguro que desea eliminar el usuario?",

      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:4468/api/remove-user/${id}`, {
          method: "DELETE",
        })
          .then(() => {
            Swal.fire("Eliminado correctamente", "", "success");
            setIsDelete(!isDelete);
          })

          .catch((err) => console.log(err));
      }
    });
  };

  const updateUser = (user) => {
    navigate("/private/update-user", { state: { user: user } });
  };

  return (
    <>
      <tr>
        <td scope="row">{name}</td>
        <td>{surname}</td>
        <td>{phone}</td>
        <td>
          {isPay === true && (
            <>
              <button className="btn btn-danger">Pendiente</button>

              <button
                className="btn button-pay"
                onClick={() => payProceed(user._id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-coin"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#ffffff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1" />
                  <path d="M12 7v10" />
                </svg>
              </button>
            </>
          )}
          {afterPay === true && (
            <button className="btn btn-success btn-pay ">Pagado</button>
          )}
        </td>
        <td className="d-flex align-items-center justify-content-around">
          <button
            className="btn indicators"
            style={{ backgroundColor: "var(--blue)" }}
            onClick={() => showInfo(user._id)}
          >
            <TbEyeSearch className="icon-user" />
          </button>
          <button
            onClick={() => updateUser(user)}
            className="btn indicators"
            style={{
              backgroundColor: "var(--yellow) ",
            }}
          >
            <PiPencilLineDuotone className="icon-user" />
          </button>
          <button
            onClick={() => deleteUser(user._id)}
            className="btn indicators"
            style={{ backgroundColor: "var(--red)" }}
          >
            <BsTrash className="icon-user" />
          </button>
        </td>
      </tr>
    </>
  );
};

User.propTypes = {
  user: PropTypes.node.isRequired,
  setIsDelete: PropTypes.node.isRequired,
  isDelete: PropTypes.node.isRequired,
  showInfo: PropTypes.node.isRequired,
};

export default User;
