import PropTypes from "prop-types";
import "./Modal.css";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Modal = ({ children }) => {
  const handleModalContainerClick = (e) => e.stopPropagation();
  const { isOpen, closeModal } = useContext(AppContext);
  return (
    <div
      className={`modal-container ${isOpen && "close-modal"}`}
      onClick={handleModalContainerClick}
    >
      <div className="modal-content">
        {" "}
        <div className="close-btn" onClick={closeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-square-rounded-x"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ff2825"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10l4 4m0 -4l-4 4" />
            <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.isRequired,
  closeModal: PropTypes.isRequired,
};

export default Modal;
