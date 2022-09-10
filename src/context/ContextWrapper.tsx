import React, { useState } from "react";
import dayjs from "dayjs";
import { CalenderContext } from "./CalenderContext";
const ContextWrapper = (props: any) => {
	const [monthIndex, setMonthIndex] = useState(dayjs().month());
	const [daySelected, setDaySelected] = useState<any>(dayjs());
	const [showEventModal, setShowEventModal] = useState(false);

	return (
		<CalenderContext.Provider
			value={{
				monthIndex,
				setMonthIndex,
				daySelected,
				setDaySelected,
				showEventModal,
				setShowEventModal,
			}}
		>
			{props.children}
		</CalenderContext.Provider>
	);
};

export default ContextWrapper;
