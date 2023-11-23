import PropTypes from "prop-types";
import "./UsersAccount.css";

const UsersAccount = ({ user, editRol }) => {
  const { name, surname, phone, nickname, email, role } = user;

  return (
    <tr>
      <td scope="row">{name}</td>
      <td scope="row">{surname}</td>
      <td scope="row">{nickname}</td>
      <td scope="row">{phone}</td>
      <td scope="row">{email}</td>
      <td className="account-role" scope="row">
        {role}

        <button
          className="btn rol-btn"
          onClick={() => editRol(user._id)}
          disabled={role === "admin"}
        >
          Cambiar Rol
        </button>
      </td>
    </tr>
  );
};

UsersAccount.propTypes = {
  user: PropTypes.node.isRequired,
  editRol: PropTypes.func.isRequired,
};

export default UsersAccount;
