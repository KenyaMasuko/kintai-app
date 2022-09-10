import { createContext } from "react";

export const CalenderContext = createContext({
	monthIndex: 0,
	setMonthIndex: (index: any) => {},
	daySelected: null,
	setDaySelected: (day: any) => {},
	showEventModal: false,
	setShowEventModal: (bool: boolean) => {},
});
