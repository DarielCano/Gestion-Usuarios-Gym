import Form from "../components/Form/Form";
import { useLocation } from "react-router-dom";

const UpdateUser = () => {
  const { state } = useLocation();
  console.log(state.user);
  const initialValues = {
    address: state.user.address,
    email: state.user.email,
    incomeDate: state.user.incomeDate,
    name: state.user.name,

    phone: state.user.phone,
    surname: state.user.surname,
    _id: state.user._id,
  };
  return (
    <div
      className=" w-75  m-auto vh-100 d-flex flex-column justify-content-start align-items-center"
      style={{ paddingTop: "6rem" }}
    >
      {<Form initialValues={initialValues} isUpdate={true} />}
    </div>
  );
};

export default UpdateUser;
