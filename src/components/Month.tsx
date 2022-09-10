import React from "react";
import { Day } from "./Day";

const days = ["日", "月", "火", "水", "木", "金", "土"];

export const Month = (props: any) => {
	const { month } = props;
	return (
		<div className="flex-1 grid grid-cols-7 grid-rows-5 h-2/3">
			{days.map((day) => (
				<span
					key={day}
					className={`${
						(day === "日" && "text-red-400") ||
						(day === "土" && "text-blue-400")
					}  text-sm text-center`}
				>
					{day}
				</span>
			))}
			{month.map((row: any, i: any) => (
				<React.Fragment key={i}>
					{row.map((day: any, idx: any) => (
						<Day day={day} key={idx} rowIdx={i} />
					))}
				</React.Fragment>
			))}
		</div>
	);
};
