const buttonVariants = {
  primary:
    "border border-primary bg-primary text-[#07111F] hover:bg-primary/85",
  secondary:
    "border border-slate-600 bg-transparent text-white hover:border-primary hover:text-primary",
};

import React from "react";

const Button = ({
  as = "button",
  variant = "primary",
  className = "",
  children,
  ...props
}) => (
  React.createElement(
    as,
    {
      className: `inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors duration-200 ${buttonVariants[variant]} ${className}`,
      ...props,
    },
    children
  )
);

export default Button;
