import { Group } from "@mantine/core";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import React, { useContext } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { CalenderContext } from "src/context/CalenderContext";

dayjs.locale(ja);

export const CalendarHeader = () => {
	const { monthIndex, setMonthIndex } = useContext(CalenderContext);
	const handlePrevMonth = () => {
		setMonthIndex(monthIndex - 1);
	};
	const handelNextMonth = () => {
		setMonthIndex(monthIndex + 1);
	};

	return (
		<Group position="center" className="px-4 py-2 flex items-center">
			<button className="border-none bg-transparent" onClick={handlePrevMonth}>
				<span className="cursor-pointer text-gray-600 mx-2">
					<MdChevronLeft />
				</span>
			</button>
			<h2 className="ml-4 text-xl text-gray-500 font-bold">
				{dayjs(new Date(dayjs().year(), monthIndex)).format("YYYY MMMM")}
			</h2>
			<button className="border-none bg-transparent" onClick={handelNextMonth}>
				<span className="cursor-pointer text-gray-600 mx-2">
					<MdChevronRight />
				</span>
			</button>
		</Group>
	);
};
