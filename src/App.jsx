import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddUser from "./pages/AddUser";
import SearchUsers from "./pages/SearchUsers";
import Users from "./pages/Users";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import UpdateUser from "./pages/UpdateUser";
import Visit from "./components/Visit/Visit";

function App() {
  return (
    <div className=" d-flex flex-column ">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomePage />
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              {" "}
              <Users />
            </>
          }
        />
        <Route
          path="/search-users/:search"
          element={
            <>
              <SearchUsers />
            </>
          }
        />
        <Route
          path="/add-users"
          element={
            <>
              <AddUser />
            </>
          }
        />
        <Route
          path="/update-user"
          element={
            <>
              <UpdateUser />
            </>
          }
        />

        <Route
          path="/visits"
          element={
            <>
              <Visit />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
