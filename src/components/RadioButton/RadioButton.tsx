import React from "react";
import "./RadioButton.scss";
import { RadioButtonProps } from "./RadioButton.type";

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  className = "",
  ...props
}) => {
  return (
    <label className={`radio-button ${className}`}>
      <input type="radio" {...props} />
      <span>{label}</span>
    </label>
  );
};
