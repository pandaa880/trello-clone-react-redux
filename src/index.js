import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store/";
import App from "./App";

// import css
import "./styles/index.css";

const root = document.getElementById("root");

// render the app
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
