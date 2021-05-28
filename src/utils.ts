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
