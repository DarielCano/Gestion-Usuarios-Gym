import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
const Form = ({ initialValues, isUpdate = false }) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Nombre debe tener al menos tres caracteres")
      .max(30, "Nombre no debe exceder de 30 caracteres")
      .required("Campo requerido"),
    surname: Yup.string()
      .min(3, "Nombre debe tener al menos tres caracteres")
      .max(30, "Nombre no debe exceder de 30 caracteres")
      .required("Campo requerido"),
    phone: Yup.number().positive().integer().required("Campo requerido"),
    email: Yup.string().email("Email incorrecto").required("Campo requerido"),
    address: Yup.string()
      .max(100, "Debe tener menos de 100 caracteres")
      .required("Campo requerido"),
  });

  const formik = useFormik({
    /*  initialValues: {
      name: "",
      surname: "",
      phone: "",
      address: "",
      email: "",
      incomeDate: "",
    }, */
    initialValues: initialValues,
    validationSchema,

    onSubmit: () => {
      if (isUpdate === false) {
        const newUser = formik.values;

        fetch("http://localhost:4468/api/new-user", {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => {
            if (resp.ok) {
              Swal.fire({
                title: `Usuario guardado correctamente`,
                icon: "success",
                confirmButtonText: "Continuar",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/users");
                }
              });
            } else {
              Swal.fire({
                title: `Error al guardar usuario. Puede que ya exista `,
                icon: "error",
                confirmButtonText: "Continuar",
              });
            }

            formik.resetForm();
          })

          .catch((error) => {
            console.log(error);
          });
      } else {
        const newUser = formik.values;

        fetch(`http://localhost:4468/api/user-update/${initialValues._id}`, {
          method: "PUT",
          body: JSON.stringify(newUser),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => {
            if (resp.ok) {
              Swal.fire({
                title: `Usuario actualizado correctamente`,
                icon: "success",
                confirmButtonText: "Continuar",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/private/users");
                }
              });
            } else {
              Swal.fire({
                title: `Error al guardar usuario`,
                icon: "error",
                confirmButtonText: "Continuar",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/users");
                }
              });
            }

            formik.resetForm();
          })

          .catch((error) => {
            console.log(error);
          });
      }
    },
  });

  return (
    <div className="form-add-user">
      <h3>
        {isUpdate ? "Datos del  usuario a actualizar" : "Datos del usuario"}
      </h3>
      <form
        className="w-100 h-50 d-flex flex-column justify-content-between "
        onSubmit={formik.handleSubmit}
      >
        <input
          className={
            formik.errors.name && formik.touched.name
              ? "w-75 p-2 mb-3  border-4  border-danger"
              : "w-75 p-2 mb-3  border-1"
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
              ? "w-75 p-2 mb-3  border-4  border-danger"
              : "w-75 p-2 mb-3  border-1"
          }
          type="text"
          name="surname"
          placeholder={"Apellido"}
          value={formik.values.surname}
          onChange={formik.handleChange}
        />

        <input
          className={
            formik.errors.phone && formik.touched.phone
              ? "w-75 p-2 mb-3  border-4  border-danger"
              : "w-75 p-2 mb-3  border-1"
          }
          type="text"
          name="phone"
          placeholder={"Teléfono"}
          value={formik.values.phone}
          onChange={formik.handleChange}
        />

        <input
          className={
            formik.errors.email && formik.touched.email
              ? "w-75 p-2 mb-3  border-4  border-danger"
              : "w-75 p-2 mb-3  border-1"
          }
          type="email"
          name="email"
          placeholder={"Correo electrónico"}
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        <input
          className={
            formik.errors.address && formik.touched.address
              ? "w-75 p-2 mb-3  border-4  border-danger"
              : "w-75 p-2 mb-3  border-1"
          }
          type="text"
          name="address"
          placeholder={"Dirección"}
          value={formik.values.address}
          onChange={formik.handleChange}
        />

        <input
          className="w-75 p-4 mb-3  border-1"
          type="date"
          name="incomeDate"
          value={formik.values.incomeDate}
          onChange={formik.handleChange}
        />
        <button className="w-50 btn btn-danger p-2" type="submit">
          {isUpdate ? "Modificar Usuario" : "Agregar Usuario"}
        </button>
      </form>
    </div>
  );
};

Form.propTypes = {
  initialValues: PropTypes.node.isRequired,
  isUpdate: PropTypes.node.isRequired,
};
export default Form;
