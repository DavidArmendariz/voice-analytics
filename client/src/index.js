import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "assets/css/material-dashboard-react.css?v=1.8.0";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
