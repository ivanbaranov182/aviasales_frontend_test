import React from "react";
import { useState } from "react";
import { Checkbox } from "../Checkbox";
import "./FilterStops.scss";
import { StopType } from "./FilterStops.type";

const stops: { code: StopType; title: string }[] = [
  {
    code: StopType.ALL,
    title: "Все",
  },
  {
    code: StopType.NONE,
    title: "Без пересадок",
  },
  {
    code: StopType.ONE,
    title: "1 пересадка",
  },
  {
    code: StopType.TWO,
    title: "2 пересадки",
  },
  {
    code: StopType.THREE,
    title: "3 пересадки",
  },
];

export const FilterStops: React.FC = () => {
  const [activeStops, setActiveStops] = useState<StopType[]>([]);

  const handleChange = (code: StopType) => {
    let res: StopType[];
    switch (code) {
      case StopType.ALL:
        res = stops.map((el) => el.code).filter((el) => el !== StopType.NONE);
        break;
      case StopType.NONE:
        res = [StopType.NONE];
        break;
      default:
        res = [
          ...(activeStops.includes(code)
            ? activeStops.filter((el) => el !== code)
            : [...activeStops, code]),
        ].filter((el) => el !== StopType.ALL && el !== StopType.NONE);
        break;
    }
    setActiveStops(res);
  };

  return (
    <div className="filter-stops">
      <div className="filter-stops__title"> Количество пересадок</div>
      <div className="filter-stops__list">
        {stops.map((stop) => (
          <Checkbox
            key={stop.code}
            name="stops"
            value={stop.code}
            label={stop.title}
            checked={activeStops.includes(stop.code)}
            onChange={() => handleChange(stop.code)}
          />
        ))}
      </div>
    </div>
  );
};
