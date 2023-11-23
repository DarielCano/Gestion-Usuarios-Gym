import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";

export default function Bars({ midata, misoptions }) {
  return <Bar data={midata} options={misoptions} />;
}

Bars.propTypes = {
  midata: PropTypes.node.isRequired,
  misoptions: PropTypes.node.isRequired,
};
