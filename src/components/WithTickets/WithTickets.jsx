import { useCallback, useEffect, useState } from "react";
import { api } from "../../api";

const TICKETS_INTERVAL = process.env.REACT_APP_POLING_DELAY || 30000;

export const WithTickets = ({ component: Component }) => {
  const [tickets, setTickets] = useState([]);
  const [searchId, setSearchId] = useState(null);
  const [stop, setStop] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getSearchId = useCallback(async () => {
    try {
      const { searchId } = await api.getSearchId();
      setSearchId(searchId);
    } catch (error) {
      setError(error);
    }
  }, []);

  const getTickets = useCallback(async () => {
    if (!searchId) return;
    try {
      const { tickets, stop } = await api.getTikets(searchId);
      setTickets(tickets);
      setStop(stop);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [searchId]);

  useEffect(() => {
    searchId && !stop && getTickets();
    const id = setInterval(getTickets, TICKETS_INTERVAL);
    return () => clearInterval(id);
  }, [searchId]);

  useEffect(() => {
    getSearchId();
  }, []);

  return <Component tickets={tickets} loading={loading} error={error} />;
};
