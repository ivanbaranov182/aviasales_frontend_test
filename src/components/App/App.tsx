import React, { useEffect, useMemo, useState } from "react";
import { api } from "../../api";
import { Ticket } from "../../types";
import { ReactComponent as Logo } from "../../assets/images/plane.svg";
import { Button } from "../Button";
import { FilterStops } from "../FIlterStops";
import { SortTabs } from "../SortTabs";
import { TicketList } from "../TicketList";
import { Backdrop } from "../Blackdrop";
import { Message } from "../Message";
import "./App.scss";

const data: Ticket[] = [
  {
    price: 67347,
    carrier: "TG",
    segments: [
      {
        origin: "MOW",
        destination: "HKT",
        date: "2021-06-05T03:46:00.000Z",
        stops: ["SHA", "BKK", "IST"],
        duration: 992,
      },
      {
        origin: "HKT",
        destination: "MOW",
        date: "2021-06-25T00:13:00.000Z",
        stops: ["IST", "KUL", "SHA"],
        duration: 1778,
      },
    ],
  },
  {
    price: 91314,
    carrier: "FV",
    segments: [
      {
        origin: "MOW",
        destination: "HKT",
        date: "2021-06-05T02:10:00.000Z",
        stops: ["AUH", "HKG", "SIN"],
        duration: 1397,
      },
      {
        origin: "HKT",
        destination: "MOW",
        date: "2021-06-24T22:11:00.000Z",
        stops: [],
        duration: 742,
      },
    ],
  },
  {
    price: 33911,
    carrier: "S7",
    segments: [
      {
        origin: "MOW",
        destination: "HKT",
        date: "2021-06-05T17:17:00.000Z",
        stops: ["IST"],
        duration: 1825,
      },
      {
        origin: "HKT",
        destination: "MOW",
        date: "2021-06-25T02:38:00.000Z",
        stops: [],
        duration: 1841,
      },
    ],
  },
  {
    price: 45962,
    carrier: "SU",
    segments: [
      {
        origin: "MOW",
        destination: "HKT",
        date: "2021-06-05T14:55:00.000Z",
        stops: [],
        duration: 1697,
      },
      {
        origin: "HKT",
        destination: "MOW",
        date: "2021-06-25T03:49:00.000Z",
        stops: ["BKK"],
        duration: 1444,
      },
    ],
  },
  {
    price: 16025,
    carrier: "S7",
    segments: [
      {
        origin: "MOW",
        destination: "HKT",
        date: "2021-06-05T02:22:00.000Z",
        stops: ["SIN", "BKK", "AUH"],
        duration: 1198,
      },
      {
        origin: "HKT",
        destination: "MOW",
        date: "2021-06-25T09:11:00.000Z",
        stops: ["IST", "DXB", "HKG"],
        duration: 1679,
      },
    ],
  },
  {
    price: 34306,
    carrier: "SU",
    segments: [
      {
        origin: "MOW",
        destination: "HKT",
        date: "2021-06-05T02:01:00.000Z",
        stops: ["SIN", "HKG", "SHA"],
        duration: 1791,
      },
      {
        origin: "HKT",
        destination: "MOW",
        date: "2021-06-25T04:52:00.000Z",
        stops: ["BKK", "AUH"],
        duration: 1974,
      },
    ],
  },
  {
    price: 71759,
    carrier: "EY",
    segments: [
      {
        origin: "MOW",
        destination: "HKT",
        date: "2021-06-05T14:32:00.000Z",
        stops: [],
        duration: 1844,
      },
      {
        origin: "HKT",
        destination: "MOW",
        date: "2021-06-25T11:05:00.000Z",
        stops: [],
        duration: 1843,
      },
    ],
  },
];

const ITEMS_TO_SHOW = 5;

export const App: React.FC = () => {
  const [searchId, setSearchId] = useState<string | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | string>("");
  const [stop, setStop] = useState<boolean>(false);

  const ticketsToShow = useMemo(() => {
    return tickets.sort();
  }, [tickets]);

  const getSearchId = async () => {
    try {
      const { searchId } = await api.getSearchId();
      setSearchId(searchId);
    } catch (error) {
      setError(error);
    }
  };

  const getTickets = async () => {
    if (!searchId) return;
    try {
      const { tickets, stop } = await api.getTikets(searchId);
      setLoading(false);
      if (stop) {
        return setStop(stop);
      }
      setTickets((oldTickets) => [
        ...oldTickets,
        ...tickets.slice(0, ITEMS_TO_SHOW),
      ]);
    } catch (error) {
      setError("Tickets loading Error");
    }
  };

  useEffect(() => {
    getSearchId();
  }, []);

  useEffect(() => {
    if (searchId && !stop) {
      getTickets();
    }
  }, [searchId]);

  return (
    <>
      <div className="container">
        <div className="app">
          <div className="app__top">
            <Logo
              className={`app__logo ${loading ? "app__logo_loading" : ""}`}
            />
          </div>
          <div className="app__cols">
            <div className="app__col">
              <FilterStops />
            </div>
            <div className="app__col">
              <SortTabs />
              <TicketList tickets={tickets} />
              <Button onClick={getTickets}>Показать еще 5 билетов!</Button>
            </div>
          </div>
        </div>
      </div>
      <Backdrop open={Boolean(error)} onClick={() => setError("")}>
        <Message title={String(error)} text="Попробуйте еще раз" />
      </Backdrop>
    </>
  );
};
