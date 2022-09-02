import React from "react";
const Button = ({ children, type = "normal", ...props }) => {
  return (
    <button
      className="nm-flat-blue-grey-100 focus:nm-concave-blue-grey-100 text-blue-grey-800 col-span-1"
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
