import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "normalize.css";
import { App } from "./components/App";
import { WithTickets } from "./components/WithTickets";

ReactDOM.render(
  <React.StrictMode>
    <WithTickets component={App} />
  </React.StrictMode>,
  document.getElementById("root")
);
