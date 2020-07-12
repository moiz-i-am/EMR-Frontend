import React from "react";
import { render } from "react-dom";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import App from "./App";
import Routes from "./routes";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51H3Pk4I5sVsTj98eHHnxALCTfGWvBC6dULu5dAmccxFKOea18Zr1ab5m4rLnXGZEhhxeXDOuSNaN6nGaZlkE0BXK00HwtW0x2Q"
);

render(
  <Provider store={store}>
    <Elements stripe={stripePromise}>
      <Router>
        <App>
          <Routes />
        </App>
      </Router>
    </Elements>
  </Provider>,
  document.getElementById("root")
);
