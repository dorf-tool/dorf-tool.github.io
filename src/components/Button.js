import classNames from "classnames";
import React from "react";
const Button = ({ children, danger = false, ...props }) => {
  return (
    <button
      className={classNames(
        "col-span-1 text-blue-grey-800 p-2 rounded",
        danger
          ? "nm-flat-red-100 focus:nm-concave-red-100"
          : "nm-flat-blue-grey-100 focus:nm-concave-blue-grey-100"
      )}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
