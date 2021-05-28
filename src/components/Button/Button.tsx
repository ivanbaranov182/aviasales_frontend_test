import React from "react";
import "./Button.css";
import { ButtonProps } from "./Button.type";

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className="button" {...props}>
      {children}
    </button>
  );
};
