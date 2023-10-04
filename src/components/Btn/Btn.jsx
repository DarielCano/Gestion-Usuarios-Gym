import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BtnLink = ({ name, link, styles }) => {
  return (
    <Link to={link} className={styles}>
      {name}
    </Link>
  );
};
BtnLink.propTypes = {
  name: PropTypes.node.isRequired,
  link: PropTypes.node.isRequired,
  styles: PropTypes.node.isRequired,
};
export default BtnLink;
