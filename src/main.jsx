import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// axios
import axios from "axios";
axios.defaults.baseURL = "https://nt-shopping-list.onrender.com/api";

// toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainProvider from "./Context/Main.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MainProvider>
        <ToastContainer />
        <App />
      </MainProvider>
    </BrowserRouter>
  </React.StrictMode>
);
