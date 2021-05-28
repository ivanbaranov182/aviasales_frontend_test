import React from "react";
import { MessageProps } from "./Message.type";
import { Paper } from "../Paper";
import "./Message.scss";

export const Message: React.FC<MessageProps> = ({ title, text }) => {
  return (
    <Paper className="message">
      <div className="message__title">{title}</div>
      {text && <div className="message__text">{text}</div>}
    </Paper>
  );
};
