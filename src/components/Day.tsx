import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { CalenderContext } from "src/context/CalenderContext";

export const Day = (props: any) => {
	const { day } = props;
	const { setDaySelected, setShowEventModal } = useContext(CalenderContext);

	// 今日の日付を色付けする
	const getCurrentDayClass = () => {
		return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
			? "bg-blue-600 text-white rounded-full w-7"
			: "";
	};

	return (
		<div className="border border-gray-200 flex flex-col">
			<header className="flex flex-col items-center">
				<p
					onClick={() => {
						setDaySelected(day);
						setShowEventModal(true);
					}}
					className={` cursor-pointer text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}
				>
					{day.format("DD")}
				</p>
			</header>
		</div>
	);
};
