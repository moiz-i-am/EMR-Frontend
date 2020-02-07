import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import App from "./App";
import Routes from "./routes";

render(
  <Provider store={store}>
    <Router>
      <App>
        <Routes />
      </App>
    </Router>
  </Provider>,
  document.getElementById("root")
);
