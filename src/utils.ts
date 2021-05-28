import { Filter, FilterType, Sort } from "./components/App/App.type";
import { Ticket } from "./types";

export const numberWithSpaces = (num: number): string =>
  num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

export const minToDate = (val: number, res: string = ""): string => {
  const days = Math.floor(val / (60 * 24));
  const hours = Math.floor((val - days * 60 * 24) / 60);
  const minutes = val - days * 60 * 24 - hours * 60;
  return `${days ? `${days}д` : ""} ${
    hours || days ? `${hours}ч` : ""
  } ${minutes}м`;
};

export const wordEnd = (num: number, words: string[]): string =>
  words[
    num % 100 > 4 && num % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
  ];

const getHours = (time: string): string =>
  `${new Date(time).getHours().toString().padStart(2, "0")}`;
const getMinutes = (time: string): string =>
  `${new Date(time).getMinutes().toString().padStart(2, "0")}`;

export const normolizeTime = (time: string): string =>
  `${getHours(time)}:${getMinutes(time)}`;

export const addMinutesToTime = (time: string, minutes: number): string => {
  const date = new Date(time);
  date.setMinutes(date.getMinutes() + minutes);
  return normolizeTime(String(date));
};

const getTotalDuration = (a: Ticket): number =>
  a.segments.reduce((acc, s) => (acc += s.duration), 0);

export const getMaxStops = (a: Ticket): number =>
  Math.max(...a.segments.map((s) => s.stops.length));

export const TICKETS_TO_SHOW = 5;

export const SORT: Sort[] = [
  {
    id: 0,
    title: "Самый дешевый",
    fn: (a: Ticket, b: Ticket) => a.price - b.price,
  },
  {
    id: 1,
    title: "Самый быстрый",
    fn: (a: Ticket, b: Ticket) => getTotalDuration(a) - getTotalDuration(b),
  },
  {
    id: 2,
    title: "Оптимальный",
    fn: (a: Ticket, b: Ticket) => 1,
  },
];

export const FILTER: Filter[] = [
  {
    id: FilterType.ALL,
    title: "Все",
    fn: (a) => true,
  },
  {
    id: FilterType.NONE,
    title: "Без пересадок",
    fn: (a) => getMaxStops(a) === 0,
  },
  {
    id: FilterType.ONE,
    title: "1 пересадка",
    fn: (a) => getMaxStops(a) === 1,
  },
  {
    id: FilterType.TWO,
    title: "2 пересадки",
    fn: (a) => getMaxStops(a) === 2,
  },
  {
    id: FilterType.THREE,
    title: "3 пересадки",
    fn: (a) => getMaxStops(a) === 3,
  },
];

export const ticketFilter = (activeFilters: FilterType[]) => {
  return (a: Ticket): boolean => {
    return (
      !activeFilters.length ||
      activeFilters.reduce<boolean>((acc, activeFilter) => {
        const filter = FILTER.find((f) => f.id === activeFilter);
        acc = acc ? acc : Boolean(filter?.fn(a));
        return acc;
      }, false)
    );
  };
};
