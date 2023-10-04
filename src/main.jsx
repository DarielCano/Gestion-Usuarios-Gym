import React from "react";
import { BrowserRouter } from "react-router-dom";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContextProvider>
  </React.StrictMode>
);
