import React from "react";
import ReactDOM from "react-dom";
import ScrollToTop from "react-router-scroll-top";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from "./store";
import * as serviceWorker from "./serviceWorker";

if (window.location.protocol !== "https:") {
  if (process.env.REACT_APP_APP_ENV === "prod") {
    const url = "https://" + window.location.hostname + window.location.pathname;
    window.location.href = url;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
