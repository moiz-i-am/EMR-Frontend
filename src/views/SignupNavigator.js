import React from "react";
import { Link } from "react-router-dom";

const SignupNavigator = () => {
  return (
    <div>
      <p>who are you ?</p>
      <div className="selectors">
        <Link to="/SignupPatient">I am a patient</Link>
        <br />
        <Link
          to={{
            pathname: "/SignupDoctor",
            roleProps: "doctor" // for passing role to signup page
          }}
        >
          I am a doctor
        </Link>
        <br />
        <Link
          to={{
            pathname: "/SignupHospital",
            roleProps: "hospital" // for passing role to signup page
          }}
        >
          I am a Hospital
        </Link>
        <br />
        <Link
          to={{
            pathname: "/SignupLab",
            roleProps: "lab" // for passing role to signup page
          }}
        >
          I am a lab
        </Link>
        <br />
      </div>
    </div>
  );
};

export default SignupNavigator;
