import { Navigate } from "react-router-dom";
import Aside from "../Aside/Aside";
import "./Reports.css";
import Bars from "../Charts/BarChar";
import Pies from "../Charts/PieChart";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
  Filler,
} from "chart.js";

/* import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; */
import { useEffect, useState } from "react";

const Reports = () => {
  const userSession = JSON.parse(localStorage.getItem("userSession")) || {};
  const [repInfo, setRepInfo] = useState({});
  const [visitPrice, setVisitPrice] = useState("0");
  const [monthPrice, setMonthPrice] = useState("0");
  const [act, setAct] = useState(false);
  const [userTotal, setUserTotal] = useState(0);

  const updatePrice = () => {
    if (visitPrice != 0 && monthPrice != 0) {
      fetch("http://localhost:4468/api/price-report", {
        method: "POST",
        body: JSON.stringify({
          priceVisit: visitPrice,
          priceMonth: monthPrice,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => setAct(!act))
        .catch((err) => console.log(err));
    }
  };

  const handleVisitPrice = (e) => {
    setVisitPrice(e.target.value);
  };
  const handleMonthPrice = (e) => {
    setMonthPrice(e.target.value);
  };

  const getData = async () => {
    const report = await fetch("http://localhost:4468/api/report");
    const resp = await report.json();
    const data = await resp.report;

    setRepInfo(data);
  };

  useEffect(() => {
    getData();
    fetch("http://localhost:4468/api/users")
      .then((resp) => resp.json())
      .then((data) => setUserTotal(data.data.length));
  }, [act]);

  console.log(repInfo);

  let totalVisit = 0;
  let totalMonth = 0;

  const infoVisit = repInfo?.dataVisit?.map((month) => month[1]);
  const infoMonth = repInfo?.dataMonth?.map((month) => month[1]);

  const infoMonthMount = repInfo?.dataMonth?.map(
    (month) => Number(month[1]) * repInfo.priceMonth
  );
  const infoVisitMount = repInfo?.dataVisit?.map(
    (month) => Number(month[1]) * repInfo.priceVisit
  );

  totalVisit = infoVisit ? infoVisit.reduce((a, b) => a + b, 0) : 0;
  totalMonth = infoVisit ? infoMonth.reduce((a, b) => a + b, 0) : 0;

  let total = totalVisit + totalMonth;

  let percentVisit = totalVisit / total;
  let percentMonth = totalMonth / total;

  /* pastel */
  ChartJS.register(ArcElement, Tooltip, Legend); /* pastel */
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  let meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  let optionsVisit = {
    responsive: true,
    maintainAspectRatio: false,
  };

  let dataVisit = {
    labels: ["Clientes Mensualidad", "Clientes Visitas"],
    datasets: [
      {
        /* label: ["Clientes Mensuales", "Clientes Visitas"], */
        data: [percentMonth, percentVisit],
        backgroundColor: ["#920a0a", "#ff9494"],
        borderColor: ["#d70000"],
        borderWidth: 1,
      },
    ],
  };

  /*  */

  let optionMonth = {
    responsive: true,
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: userTotal * repInfo.priceMonth,
      },
      x: {
        ticks: { color: "#ff5757" },
      },
    },
  };

  let dataMonth = {
    labels: meses,
    datasets: [
      {
        label: "Mensualidad",
        data: infoMonthMount,
        backgroundColor: "#920a0a",
      },

      {
        label: "Visitas",
        data: infoVisitMount,
        backgroundColor: "#ff9494",
      },
    ],
  };

  if (userSession.role === "admin") {
    return (
      <div>
        <Aside />
        <div className="reports-container">
          <h2>Reportes de Ingresos</h2>
          <div className="report-head">
            <div className="prices">
              <div className="report-prices">
                <label htmlFor="price-month" className="label-price">
                  Precio Mensualidad:
                </label>
                <input
                  onChange={(e) => handleMonthPrice(e)}
                  type="number"
                  name="price-month"
                  id="price-month"
                  min={0}
                  value={monthPrice}
                />
              </div>

              <div className="last-price">
                <strong>Último precio:</strong>{" "}
                <p>$ {repInfo?.priceMonth || 0}</p>
              </div>
            </div>

            <div className="prices">
              <div className="report-prices">
                <label htmlFor="price-visit" className="label-price">
                  Precio Visita:
                </label>
                <input
                  onChange={(e) => handleVisitPrice(e)}
                  type="number"
                  name="price-visit"
                  id="price-visit"
                  min={0}
                  value={visitPrice}
                />
              </div>
              <div className="last-price">
                <strong>Último precio:</strong>{" "}
                <p>$ {repInfo?.priceVisit || 0}</p>
              </div>
            </div>

            <button className="report-btn" onClick={updatePrice}>
              Actualizar precio
            </button>
          </div>

          {repInfo ? (
            <>
              <h4>Análisis de ingresos anuales</h4>
              <div className="reports-graph">
                <div className="graph-1">
                  <Bars
                    className="graph"
                    midata={dataMonth}
                    misoptions={optionMonth}
                  />
                </div>
                <div className="graph-2">
                  <Pies data={dataVisit} options={optionsVisit} />
                </div>
              </div>
            </>
          ) : (
            <h3>No hay registro de datos aún</h3>
          )}
        </div>
      </div>
    );
  }

  return <Navigate to={"/"} />;
};

export default Reports;
