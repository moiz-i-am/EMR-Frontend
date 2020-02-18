import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./views/Home";
import SignupNavigator from "./views/SignupNavigator";
import Signup from "./views/Signup";
import Login from "./views/Login";

import NotFound from "./components/NotFound";
import Dashboard from "./views/Dashboard";
import DoctorsList from "./views/DoctorsList";

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
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/listDoctors" component={DoctorsList} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default routes;
