import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./views/Home";

import Signup from "./views/Signup";

import NotFound from "./components/NotFound";
import Dashboard from "./views/dashboards/MainDashboard";
import DoctorsList from "./containers/ListContainers/DoctorsList";
import DoctorDetailedProfile from "./views/DoctorDetailedProfile";
import SignupNavigator from "./views/SignupNavigator";
import Login from "./views/Login";
import Search from "./views/Search";

import AdminLogin from "./views/AdminComponents/AdminLogin";
import DashboardAdmin from "./views/AdminComponents/AdminDashboard";

import CallOutgoingScreen from "./components/videoCall/CallOutgoingScreen";
import CallIncomingScreen from "./components/videoCall/CallIncomingScreen";

import CallScreen from "./components/videoCall/CallScreen";

import LabsList from "./containers/ListContainers/LabsList";
import HospitalsList from "./containers/ListContainers/HospitalsList";

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
        <Route exact path="/dashboard/:id" component={Dashboard} />
        <Route exact path="/listDoctors" component={DoctorsList} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/docProfile/:id" component={DoctorDetailedProfile} />

        <Route exact path="/admin" component={AdminLogin} />
        <Route exact path="/dashboardAdmin/:id" component={DashboardAdmin} />

        <Route exact path="/call-outgoing" component={CallOutgoingScreen} />
        <Route exact path="/call-incoming" component={CallIncomingScreen} />

        <Route exact path="/listHospitals" component={HospitalsList} />
        <Route exact path="/listLabs" component={LabsList} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default routes;
