import { Pie } from "react-chartjs-2";
import PropTypes from "prop-types";

export default function Pies({ data, options }) {
  return <Pie data={data} options={options} />;
}

Pies.propTypes = {
  data: PropTypes.node.isRequired,
  options: PropTypes.node.isRequired,
};
