import Form from "../components/Form/Form.jsx";

const AddUser = () => {
  const initialValues = {
    name: "",
    surname: "",
    phone: "",
    address: "",
    email: "",
    incomeDate: "",
  };

  return (
    <div className="  m-auto d-flex flex-column justify-content-center align-items-center add-user-container">
      <Form initialValues={initialValues} />
    </div>
  );
};

export default AddUser;
