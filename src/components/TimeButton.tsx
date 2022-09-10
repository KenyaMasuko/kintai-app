import { Text } from "@mantine/core";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

export const TimeButton = () => {
	const today = dayjs().format("MMMMD日(dd)");
	const [now, setNow] = useState<any>();
	useEffect(() => {
		setInterval(() => {
			setNow(dayjs().format("HH:mm:ss"));
		}, 1000);
	}, []);

	return (
		<>
			<Text size="xs">増子献弥</Text>
			<Text size="md">{today}</Text>
			<Text size="xs">{now}</Text>
		</>
	);
};
