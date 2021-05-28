import React from "react";
import { Checkbox } from "../Checkbox";
import { FilterStopsProps } from "./FilterStops.type";
import "./FilterStops.scss";

export const FilterStops: React.FC<FilterStopsProps> = ({
  items,
  active,
  onChange,
}) => {
  return (
    <div className="filter-stops">
      <div className="filter-stops__title"> Количество пересадок</div>
      <div className="filter-stops__list">
        {items.map((item) => (
          <Checkbox
            key={item.id}
            name="stops"
            value={item.id}
            label={item.title}
            checked={active.includes(item.id)}
            onChange={() => onChange(item.id)}
          />
        ))}
      </div>
    </div>
  );
};
