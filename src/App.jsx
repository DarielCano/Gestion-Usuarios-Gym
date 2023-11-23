import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import UserConfig from "./components/UserConfig/UserConfig";
/* import PrivateRoutes from "./routes/PrivateRoutes"; */

import AddUser from "./pages/AddUser";
import SearchUsers from "./pages/SearchUsers";
import Users from "./pages/Users";
import UpdateUser from "./pages/UpdateUser";

import Visit from "./components/Visit/Visit";
import Reports from "./components/Reports/Reports";

function App() {
  /*   const userSession = localStorage.getItem("userSession") ||  {}*/

  return (
    <div className=" d-flex flex-column ">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <SignUp />
            </>
          }
        />

        <Route
          path="/config"
          element={
            <>
              <NavBar />
              <UserConfig />
            </>
          }
        />

        <Route
          path="/reports"
          element={
            <>
              <NavBar />
              <Reports />
            </>
          }
        />

        <Route path="/private/">
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

        <Route path="*" element={<div> 404 | Not Found Page </div>} />
      </Routes>
    </div>
  );
}

export default App;
