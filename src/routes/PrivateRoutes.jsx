import { Route, Routes } from "react-router-dom";

import AddUser from "../pages/AddUser";
import SearchUsers from "../pages/SearchUsers";
import Users from "../pages/Users";
import UpdateUser from "../pages/UpdateUser";
import NavBar from "../components/NavBar/NavBar";
import Visit from "../components/Visit/Visit";

const PrivateRoutes = () => {
  return (
    <Route>
      <Route
        path="users"
        element={
          <>
            <NavBar />
            <Users />
          </>
        }
      />
      <Route
        path="search-users/:search"
        element={
          <>
            <NavBar />
            <SearchUsers />
          </>
        }
      />
      <Route
        path="add-users"
        element={
          <>
            <NavBar />
            <AddUser />
          </>
        }
      />
      <Route
        path="update-user"
        element={
          <>
            <NavBar />
            <UpdateUser />
          </>
        }
      />

      <Route
        path="visits"
        element={
          <>
            <NavBar />
            <Visit />
          </>
        }
      />
    </Route>
  );
};

export default PrivateRoutes;
