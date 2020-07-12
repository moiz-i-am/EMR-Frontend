import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./views/Home";

import Signup2 from "./views/Signup2";

import NotFound from "./components/NotFound";
import Dashboard from "./views/dashboards/MainDashboard";
import DoctorsList from "./views/DoctorsList";
import DoctorDetailedProfile from "./views/DoctorDetailedProfile";
import SignupNavigator2 from "./views/SignupNavigator2";
import Login2 from "./views/Login2";
import Search from "./views/Search";

import AdminLogin from "./views/AdminComponents/AdminLogin";
import DashboardAdmin from "./views/AdminComponents/AdminDashboard";

import CallOutgoingScreen from "./components/videoCall/CallOutgoingScreen";
import CallIncomingScreen from "./components/videoCall/CallIncomingScreen";

import CallScreen from "./components/videoCall/CallScreen";

import PaymentIndex from "./components/PaymentContainer/CheckoutForm";

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

        <Route exact path="/admin" component={AdminLogin} />
        <Route exact path="/dashboardAdmin/:id" component={DashboardAdmin} />

        <Route exact path="/call-outgoing" component={CallOutgoingScreen} />
        <Route exact path="/call-incoming" component={CallIncomingScreen} />

        <Route exact path="/call" component={CallScreen} />
        <Route exact path="/imageviewer" component={PaymentIndex} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default routes;
