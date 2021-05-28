import React from "react";
import { SegmentProps } from "./Segment.type";
import {
  minToDate,
  normolizeTime,
  wordEnd,
  addMinutesToTime,
} from "../../utils";
import "./Segment.scss";

export const Segment: React.FC<SegmentProps> = ({
  origin,
  destination,
  date,
  stops,
  duration,
}) => {
  return (
    <div className="segment">
      <div className="segment__prop">
        <div className="segment__prop-title">
          {origin}-{destination}
        </div>
        <div className="segment__prop-value">
          {normolizeTime(date)} - {addMinutesToTime(date, duration)}
        </div>
      </div>
      <div className="segment__prop">
        <div className="segment__prop-title">В пути</div>
        <div className="segment__prop-value">{minToDate(duration)}</div>
      </div>
      <div className="segment__prop">
        <div className="segment__prop-title">
          {stops.length}{" "}
          {wordEnd(stops.length, ["пересадка", "пересадки", "пересадок"])}
        </div>
        <div className="segment__prop-value">{stops.join(", ")}</div>
      </div>
    </div>
  );
};
