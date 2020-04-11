import React from "react";
import { Link } from "react-router-dom";
import errorImage from "../assets/404.png";

const NotFound = () => (
  <div style={{ backgroundColor: "#ffffff" }}>
    <div class="border-bottom border-gray-light">
      <div class="container-xl p-responsive py-9">
        <article
          class="markdown-body col-md-10 col-lg-7 mx-auto"
          style={{ textAlign: "center" }}
        >
          <img style={{ width: "100%" }} src={errorImage} alt="labtocat" />
          <h1 style={{ color: "#9058af", paddingTop: "30px" }}>Ooops!</h1>

          <div style={{ color: "#9058af" }} class="lead-mktg mb-5">
            It looks like this page doesn't exist.
          </div>
        </article>
        <div style={{ textAlign: "center", paddingBottom: "50px" }}>
          <h1 style={{ color: "#f55a96" }}>
            <Link to="/">Go to home page</Link>
          </h1>
        </div>
      </div>
    </div>
  </div>
);

export default NotFound;
