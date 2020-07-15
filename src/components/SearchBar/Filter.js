import React from "react";

const Filter = ({ value, handleChange }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <input
        style={{ width: "30%", padding: "10px" }}
        value={value}
        onChange={handleChange}
        placeholder="Search Doctor..."
      />
    </div>
  );
};

export default Filter;
