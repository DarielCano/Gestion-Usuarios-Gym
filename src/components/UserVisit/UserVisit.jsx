import { PropTypes } from "prop-types";

const UserVisit = ({ visitDate, user }) => {
  return (
    <tr>
      <td scope="row">{user.name}</td>
      <td>{user.surname}</td>
      <td>{visitDate}</td>
      <td>{user.dateTime}</td>
    </tr>
  );
};

UserVisit.propTypes = {
  user: PropTypes.node.isRequired,
  visitDate: PropTypes.node.isRequired,
};

export default UserVisit;
