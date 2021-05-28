import React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  [key: string]: any;
}
