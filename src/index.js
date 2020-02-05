import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import App from "./App";
import Routes from "./routes";

render(
  <Router>
    <App>
      <Routes />
    </App>
  </Router>,
  document.getElementById("root")
);
