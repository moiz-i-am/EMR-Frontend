import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import App from "./App";
import Home from "./views/Home";
import NotFound from "./components/NotFound";

render(
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </Router>,
  document.getElementById("root")
);
