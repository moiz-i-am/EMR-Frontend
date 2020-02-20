import React from "react";
import { Container } from "semantic-ui-react";

import Header from "./components/header";
import Footer from "./components/footer";

function App({ children }) {
  return (
    <div>
      <Header />
      <Container style={{ width: "90%" }}>
        <main>{children}</main>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
