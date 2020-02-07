import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./views/Home";
import SignupNavigator from "./views/SignupNavigator";
import Signup from "./views/Signup";
import Login from "./views/Login";

import NotFound from "./components/NotFound";

const routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/SignupSelector" component={SignupNavigator} />
        <Route exact path="/SignupPatient" component={Signup} />
        <Route exact path="/SignupDoctor" component={Signup} />
        <Route exact path="/SignupHospital" component={Signup} />
        <Route exact path="/SignupLab" component={Signup} />
        <Route exact path="/Login" component={Login} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default routes;
