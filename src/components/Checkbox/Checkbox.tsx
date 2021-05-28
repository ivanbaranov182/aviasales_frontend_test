import React from "react";
import "./Checkbox.scss";
import { CheckboxProps } from "./Checkbox.type";
import { ReactComponent as CheckboxIcon } from "../../assets/images/checkbox.svg";
import { ReactComponent as CheckboxIconChecked } from "../../assets/images/checkbox_checked.svg";

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  ...props
}) => {
  return (
    <label className="checkbox">
      <input type="checkbox" {...props} />
      {checked ? <CheckboxIconChecked /> : <CheckboxIcon />}
      <span>{label}</span>
    </label>
  );
};
