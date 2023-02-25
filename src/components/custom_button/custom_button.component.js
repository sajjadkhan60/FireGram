import React from "react";
import "./custom_button.css";

function CustomButton({ name, ...otherProps }) {
  return (
    <div>
      <button {...otherProps}>{name}</button>
    </div>
  );
}

export default CustomButton;
