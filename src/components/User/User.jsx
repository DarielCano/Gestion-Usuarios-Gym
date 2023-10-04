import PropTypes from "prop-types";
import { PiPencilLineDuotone } from "react-icons/pi";
import { TbEyeSearch } from "react-icons/tb";

import { BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

import "./User.css";

const User = ({ user, setIsDelete, isDelete }) => {
  const navigate = useNavigate();
  const { name, surname, phone, nextPay } = user;
  const today = new Date();
  const pay = new Date(nextPay);
  const { payProceed, showInfo } = useContext(AppContext);

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
    navigate("/update-user", { state: { user: user } });
  };

  return (
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
                className="icon icon-tabler icon-tabler-brand-cashapp"
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
                <path d="M17.1 8.648a.568 .568 0 0 1 -.761 .011a5.682 5.682 0 0 0 -3.659 -1.34c-1.102 0 -2.205 .363 -2.205 1.374c0 1.023 1.182 1.364 2.546 1.875c2.386 .796 4.363 1.796 4.363 4.137c0 2.545 -1.977 4.295 -5.204 4.488l-.295 1.364a.557 .557 0 0 1 -.546 .443h-2.034l-.102 -.011a.568 .568 0 0 1 -.432 -.67l.318 -1.444a7.432 7.432 0 0 1 -3.273 -1.784v-.011a.545 .545 0 0 1 0 -.773l1.137 -1.102c.214 -.2 .547 -.2 .761 0a5.495 5.495 0 0 0 3.852 1.5c1.478 0 2.466 -.625 2.466 -1.614c0 -.989 -1 -1.25 -2.886 -1.954c-2 -.716 -3.898 -1.728 -3.898 -4.091c0 -2.75 2.284 -4.091 4.989 -4.216l.284 -1.398a.545 .545 0 0 1 .545 -.432h2.023l.114 .012a.544 .544 0 0 1 .42 .647l-.307 1.557a8.528 8.528 0 0 1 2.818 1.58l.023 .022c.216 .228 .216 .569 0 .773l-1.057 1.057z" />
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
          className="btn"
          style={{ backgroundColor: "var(--blue)" }}
          onClick={() => showInfo(user._id)}
        >
          <TbEyeSearch />
        </button>
        <button
          onClick={() => updateUser(user)}
          className="btn"
          style={{
            backgroundColor: "var(--yellow) ",
          }}
        >
          <PiPencilLineDuotone />
        </button>
        <button
          onClick={() => deleteUser(user._id)}
          className="btn"
          style={{ backgroundColor: "var(--red)" }}
        >
          <BsTrash />
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.node.isRequired,
  setIsDelete: PropTypes.node.isRequired,
  isDelete: PropTypes.node.isRequired,
};

export default User;
