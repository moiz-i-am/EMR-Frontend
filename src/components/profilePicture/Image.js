import React from "react";

import "./Image.css";

const image = props => (
  <div>
    {/* <div
      className="image"
      style={{
        backgroundImage: `url('${props.fileURL}')`,
        backgroundSize: props.contain ? "contain" : "cover",
        backgroundPosition: props.left ? "left" : "center"
      }}
    /> */}
    <img className="image" src={props.fileURL} />
  </div>
);

export default image;
