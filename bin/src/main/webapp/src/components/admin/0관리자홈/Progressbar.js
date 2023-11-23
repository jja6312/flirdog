import React from "react";

const Progressbar = (props) => {
  const { completed } = props;

  const containerStyles = {
    height: 10,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: "#E95243",
    borderRadius: "inherit",
    textAlign: "right",
  };

  return (
    <div style={containerStyles}>
      <div
        className="d-flex justify-content-end align-items-center"
        style={fillerStyles}
      ></div>
    </div>
  );
};

export default Progressbar;
