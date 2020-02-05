import React from "react";
import { Link } from "react-router-dom";

const SignupNavigator = () => {
  return (
    <div>
      <p>who are you ?</p>
      <div className="selectors">
        <Link to="/SignupPatient">I am a patient</Link>
        <br />
        <Link to="/SignupDoctor">I am a doctor</Link>
        <br />
        <Link to="/SignupHospital">I am a Hospital</Link>
        <br />
        <Link to="/SignupLab">I am a lab</Link>
        <br />
      </div>
    </div>
  );
};

export default SignupNavigator;
