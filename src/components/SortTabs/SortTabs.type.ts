import { Sort } from "../App/App.type";

export interface SortTabsProps {
  items: Sort[];
  active: Sort["id"];
  onChange: (id: Sort["id"]) => void;
}
