import React from "react";

const Container = ({ as = "div", className = "", children, ...props }) =>
  React.createElement(
    as,
    { className: `content mx-auto w-full px-4 lg:px-8 ${className}`, ...props },
    children
  );

export default Container;
