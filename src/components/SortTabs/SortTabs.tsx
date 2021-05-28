import React from "react";
import { RadioButton } from "../RadioButton";
import { SortTabsProps } from "./SortTabs.type";
import "./SortTabs.scss";

export const SortTabs: React.FC<SortTabsProps> = ({
  items,
  active,
  onChange,
}) => {
  return (
    <div className="sort-tabs">
      {items.map((tab) => (
        <RadioButton
          key={tab.id}
          name="price-tabs"
          label={tab.title}
          value={tab.id}
          className="sort-tabs__item"
          checked={active === tab.id}
          onChange={() => onChange(tab.id)}
        />
      ))}
    </div>
  );
};
