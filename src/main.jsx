import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";

import "../i18n";
import App from "../App";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <React.StrictMode>
      <BrowserRouter
        future={{
          v7_startTransition: true,
        }}
      >
        <App />
        <ToastContainer position="top-right" autoClose={4000} />
      </BrowserRouter>
    </React.StrictMode>
  </HelmetProvider>,
);
