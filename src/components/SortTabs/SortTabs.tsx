import React, { useState } from "react";
import { RadioButton } from "../RadioButton";
import "./SortTabs.scss";

const tabs: { id: number; title: string }[] = [
  {
    id: 0,
    title: "Самый дешевый",
  },
  {
    id: 1,
    title: "Самый быстрый",
  },
  {
    id: 2,
    title: "Оптимальный",
  },
];

export const SortTabs: React.FC = () => {
  const [active, setActive] = useState<number>(0);

  const handleChange = setActive;

  return (
    <div className="sort-tabs">
      {tabs.map((tab) => (
        <RadioButton
          key={tab.id}
          name="price-tabs"
          label={tab.title}
          value={tab.id}
          className="sort-tabs__item"
          checked={active === tab.id}
          onChange={() => handleChange(tab.id)}
        />
      ))}
    </div>
  );
};
