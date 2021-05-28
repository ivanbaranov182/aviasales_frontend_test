import React, { useEffect, useMemo, useState } from "react";
import { Ticket } from "../../types";
import { ReactComponent as Logo } from "../../assets/images/plane.svg";
import { Button } from "../Button";
import { FilterStops } from "../FIlterStops";
import { SortTabs } from "../SortTabs";
import { TicketList } from "../TicketList";
import { Backdrop } from "../Blackdrop";
import { Message } from "../Message";
import { AppProps, FilterType, Sort } from "./App.type";
import { SORT, FILTER, ticketFilter } from "../../utils";
import "./App.scss";

const TICKETS_TO_SHOW = process.env.REACT_APP_TICKETS_TO_SHOW || 5;

export const App: React.FC<AppProps> = ({ tickets, loading, error }) => {
  const [page, setPage] = useState<number>(1);
  const [activeSort, setActiveSort] = useState<Sort["id"]>(0);
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);
  const [showError, setShowError] = useState<boolean>(Boolean(error));

  const ticketsToShow = useMemo<Ticket[]>(() => {
    return tickets
      .filter(ticketFilter(activeFilters))
      .sort(SORT[activeSort].fn)
      .slice(0, +TICKETS_TO_SHOW * page);
  }, [tickets, activeSort, activeFilters, page]);

  const handleFilterChange = (id: FilterType) => {
    let res: FilterType[];
    if (id === FilterType.ALL) {
      res = activeFilters.includes(id) ? [] : FILTER.map((el) => el.id);
    } else {
      res = [
        ...(activeFilters.includes(id)
          ? activeFilters.filter((el) => el !== id)
          : [...activeFilters, id]),
      ].filter((el) => el !== FilterType.ALL);
    }
    setActiveFilters(res);
  };

  useEffect(() => {
    setShowError(Boolean(error));
  }, [error]);

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
              <FilterStops
                items={FILTER}
                active={activeFilters}
                onChange={handleFilterChange}
              />
            </div>
            <div className="app__col">
              <SortTabs
                items={SORT}
                active={activeSort}
                onChange={setActiveSort}
              />
              <TicketList tickets={ticketsToShow} />
              <Button onClick={() => setPage(page + 1)}>
                Показать еще {TICKETS_TO_SHOW} билетов!
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Backdrop open={showError} onClick={() => setShowError(false)}>
        <Message title={String(error)} text="Попробуйте еще раз" />
      </Backdrop>
    </>
  );
};
