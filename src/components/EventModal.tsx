import { Button, Group, Modal, Textarea } from "@mantine/core";
import { TimeRangeInput } from "@mantine/dates";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import React, { useState, useContext, FormEventHandler } from "react";
import { CalenderContext } from "src/context/CalenderContext";
dayjs.locale(ja);

export const EventModal = () => {
	const { daySelected, setShowEventModal, showEventModal } =
		useContext(CalenderContext);
	const [time, setTime] = useState<[Date | null, Date | null]>([null, null]);
	const [remarks, setRemarks] = useState("");
	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		console.log(time);
		console.log(remarks);
		setShowEventModal(false);
	};
	return (
		<Modal
			opened={showEventModal}
			onClose={() => setShowEventModal(false)}
			// @ts-ignore
			title={daySelected.format("MMMMD日(dd)")}
			centered
			lockScroll={true}
		>
			<form className="space-y-4" onSubmit={handleSubmit}>
				<TimeRangeInput
					label="出退勤時刻"
					value={time}
					onChange={setTime}
					clearable
				/>
				<Textarea
					label="備考"
					value={remarks}
					onChange={(e) => setRemarks(e.target.value)}
				/>
				<Group position="center">
					<Button type="submit" className="hover:opacity-70">
						保存
					</Button>
					<Button
						onClick={() => setShowEventModal(false)}
						className="hover:bg-gray-100 bg-gray-200"
					>
						戻る
					</Button>
				</Group>
			</form>
		</Modal>
	);
};
