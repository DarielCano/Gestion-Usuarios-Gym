import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

import PropTypes from "prop-types";

const FormVisit = ({ newVisit, setNewVisit }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Nombre debe tener al menos tres caracteres")
      .max(30, "Nombre no debe exceder de 30 caracteres")
      .required("Campo requerido"),
    surname: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
    },

    validationSchema,

    onSubmit: () => {
      const newUserVisit = formik.values;

      fetch(`http://localhost:4468/api/new-visit`, {
        method: "POST",
        body: JSON.stringify(newUserVisit),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          if (resp.ok) {
            Swal.fire({
              title: `Usuario visitante agregado correctamente`,
              icon: "success",
              confirmButtonText: "Continuar",
            }).then((result) => {
              if (result.isConfirmed) {
                setNewVisit(!newVisit);
              }
            });
          } else {
            Swal.fire({
              title: `Error al guardar usuario`,
              icon: "error",
              confirmButtonText: "Continuar",
            });
          }

          formik.resetForm();
        })

        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <div style={{ marginTop: "4rem" }}>
      <h3 className="text-center text-white p-2 ">Datos del usuario</h3>
      <form
        className="w-100  d-flex flex-column justify-content-between p-3 "
        onSubmit={formik.handleSubmit}
      >
        <input
          className={
            formik.errors.name && formik.touched.name
              ? "p-2 mb-3 rounded-3 border-4  border-danger"
              : "p-2 mb-3 rounded-3 border-1"
          }
          type="text"
          name="name"
          placeholder={"Nombre"}
          value={formik.values.name}
          onChange={formik.handleChange}
        />

        <input
          className={
            formik.errors.surname && formik.touched.surname
              ? "p-2 mb-3 rounded-3 border-4  border-danger"
              : "p-2 mb-3 rounded-3 border-1"
          }
          type="text"
          name="surname"
          placeholder={"Apellido"}
          value={formik.values.surname}
          onChange={formik.handleChange}
        />

        <button
          className="btn btn-danger border-1 border-white p-2 mt-4"
          type="submit"
        >
          Agregar Visitante
        </button>
      </form>
    </div>
  );
};

FormVisit.propTypes = {
  newVisit: PropTypes.node.isRequired,
  setNewVisit: PropTypes.node.isRequired,
};
export default FormVisit;
