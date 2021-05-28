import React from "react";
import { Ticket } from "../Ticket/Ticket";
import "./TicketList.scss";
import { TicketListProps } from "./TicketList.type";

export const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
  return (
    <div className="ticket-list">
      {tickets.map((ticket, i) => (
        <Ticket key={ticket.carrier + i} {...ticket} />
      ))}
    </div>
  );
};
