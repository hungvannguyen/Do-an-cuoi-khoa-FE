import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/client/App";
import axios from "axios";
import API_BASE_URL from "./apiConfig";
import reportWebVitals from "./reportWebVitals";
import "jquery/dist/jquery.min.js";
import "./pages/client/Styles/css/font-awesome.min.css";
// React-router-dom imports
import { BrowserRouter as Router } from "react-router-dom";


axios.defaults.baseURL = API_BASE_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
