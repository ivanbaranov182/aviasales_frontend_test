import React from "react";
import { PaperProps } from "./Paper.type";
import "./Paper.scss";

export const Paper: React.FC<PaperProps> = ({ children, className = "" }) => {
  return <div className={`paper ${className}`}>{children}</div>;
};
