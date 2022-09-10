import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import { CalenderContext } from "src/context/CalenderContext";
import { getMonth } from "src/utils/getMonth";
import { CalendarHeader } from "./CalenderHeader";
import { EventModal } from "./EventModal";
import { Month } from "./Month";

export const Calender = () => {
	const { data: session } = useSession();

	const [currentMonth, setCurrentMonth] = useState(getMonth());
	const { monthIndex, showEventModal } = useContext(CalenderContext);

	useEffect(() => {
		setCurrentMonth(getMonth(monthIndex));
	}, [monthIndex]);

	return (
		<div>
			{showEventModal && <EventModal />}
			<div className="flex flex-col">
				<CalendarHeader />
				<div className="flex flex-1">
					{/* <Sidebar /> */}
					<Month month={currentMonth} />
				</div>
			</div>
		</div>
	);
};
