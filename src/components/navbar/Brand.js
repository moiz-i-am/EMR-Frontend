import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import logo from "../../assets/L.png";

const Brand = () => {
  return (
    <Link to="/" style={{ width: "11%" }}>
      <Image src={logo} alt="Company Logo" />
    </Link>
  );
};

export default Brand;

const Image = styled.img`
  height: 120%;
  margin: auto 0;
`;
