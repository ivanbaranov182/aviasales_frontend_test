import React from "react";
import { TicketProps } from "./Ticket.type";
import { numberWithSpaces } from "../../utils";
import { Segment } from "../Segment";
import "./Ticket.scss";

export const Ticket: React.FC<TicketProps> = ({ carrier, price, segments }) => {
  return (
    <div className="ticket">
      <div className="ticket__top">
        <div className="ticket__price">{numberWithSpaces(price)} Р</div>
        <img
          className="ticket__logo"
          src={`//pics.avs.io/99/36/${carrier}.png`}
          alt="carrier"
        />
      </div>
      <div className="ticket__segments">
        {segments.map((segment, i) => (
          <Segment key={i} {...segment} />
        ))}
      </div>
    </div>
  );
};
