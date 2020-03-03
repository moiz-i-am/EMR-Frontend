import React, { Component, Fragment } from "react";
import { Container } from "semantic-ui-react";

import Header from "./components/header";
import NavBar from "./components/NavBar";
import Footer from "./components/footer";
import { withRouter } from "react-router-dom";
import SignupNavigator from "./views/SignupNavigator";
import Login from "./views/Login";

const exclusionArray = ["/dashboard"];

const children = [
  <Container>
    <SignupNavigator />
    <Login />
  </Container>
];

////////////////////////////////////// for nav bar //////////////////////////
const rightItems = [
  { as: "a", content: "Find Doctors", key: "doctor" },
  { as: "a", content: "Find Hospitals", key: "hospital" },
  { as: "a", content: "Login", key: "login" },
  { as: "a", content: "Signup", key: "signup" }
];
////////////////////////////////////////////////////////////////////////////

function App({ children, location }) {
  return (
    <div>
      {/* {exclusionArray.indexOf(location.pathname) < 0 && <Header />} */}
      <Fragment>
        <NavBar rightItems={rightItems} children={children} />
        {/* <Container className='main'>
          <DocProfile />
        </Container> */}
      </Fragment>
      {/* <Container style={{ width: "90%" }}>
        <main>{children}</main>
      </Container> */}
      {exclusionArray.indexOf(location.pathname) < 0 && <Footer />}
    </div>
  );
}

export default withRouter(App);
