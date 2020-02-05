import React from "react";

import Header from "./components/header";
import Footer from "./components/footer";

function App({ children }) {
  return (
    <div>
      <Header />

      <main>{children}</main>

      <Footer />
    </div>
  );
}

export default App;
