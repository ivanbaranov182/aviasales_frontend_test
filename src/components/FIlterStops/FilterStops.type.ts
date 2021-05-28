import { Filter, FilterType } from "../App/App.type";

export interface FilterStopsProps {
  items: Filter[];
  active: FilterType[];
  onChange: (id: FilterType) => void;
}
