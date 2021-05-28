import { Ticket } from "../../types";

export interface Sort {
  id: number;
  title: string;
  fn: (a: Ticket, b: Ticket) => number;
}

export enum FilterType {
  ALL = "all",
  NONE = "none",
  ONE = "1",
  TWO = "2",
  THREE = "3",
}

export interface Filter {
  id: FilterType;
  title: string;
  fn: (a: Ticket) => boolean;
}

export interface AppProps {
  tickets: Ticket[];
  error: Error | string;
  loading: boolean;
}
