import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./views/Home";
import SignupNavigator from "./views/SignupNavigator";
import Signup from "./views/Signup";
import Signup2 from "./views/Signup2";
import Login from "./views/Login";

import NotFound from "./components/NotFound";
import Dashboard from "./views/dashboards/MainDashboard";
import DoctorsList from "./views/DoctorsList";
import DoctorDetailedProfile from "./views/DoctorDetailedProfile";
import SignupNavigator2 from "./views/SignupNavigator2";
import Login2 from "./views/Login2";
import Search from "./views/Search";

const routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/SignupSelector" component={SignupNavigator2} />
        <Route exact path="/SignupPatient" component={Signup2} />
        <Route exact path="/SignupDoctor" component={Signup2} />
        <Route exact path="/SignupHospital" component={Signup2} />
        <Route exact path="/SignupLab" component={Signup2} />
        <Route exact path="/Login" component={Login2} />
        <Route exact path="/dashboard/:id" component={Dashboard} />
        <Route exact path="/listDoctors" component={DoctorsList} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/docProfile/:id" component={DoctorDetailedProfile} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default routes;
