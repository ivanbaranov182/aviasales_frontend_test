import React from "react";
import { BackdropProps } from "./Backdrop.type";
import "./Backdrop.scss";

export const Backdrop: React.FC<BackdropProps> = ({
  children,
  open,
  ...props
}) => {
  return (
    <div className={`backdrop ${open ? "backdrop_open" : ""}`} {...props}>
      {children}
    </div>
  );
};
