import axios from "axios";

const host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const api = {
  getSearchId: async () => await host.get("/search").then((res) => res.data),
  getTikets: async (searchId: string) =>
    await host.get(`/tickets?searchId=${searchId}`).then((res) => res.data),
};
