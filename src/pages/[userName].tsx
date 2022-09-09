import { Button, Group, Text } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MainLayout } from "src/components/MainLayout";

const UserPage = () => {
	const router = useRouter();
	const { userName } = router.query;

	const [value, setValue] = useState<Date | null>(new Date());

	return (
		<MainLayout title={`${userName}のページ`}>
			<div className="bg-white space-y-4 py-3 w-1/3 mx-auto">
				<Group spacing={4} className="flex-col">
					<Text size="xs">増子献弥</Text>
					<Text size="md">9月9日(金)</Text>
					<Text size="xs">6:27:05</Text>
				</Group>
				<Group position="center">
					<Button className="hover:opacity-70">出勤</Button>
					<Button className="hover:opacity-70">退勤</Button>
				</Group>
			</div>
			<div className="bg-white mt-4 py-12 px-14">
				<Calendar
					value={value}
					onChange={setValue}
					fullWidth
					size="md"
					styles={(theme) => ({
						cell: {
							border: `1px solid ${
								theme.colorScheme === "dark"
									? theme.colors.dark[4]
									: theme.colors.gray[2]
							}`,
						},
						day: { borderRadius: 0, height: 70, fontSize: theme.fontSizes.lg },
						weekday: { fontSize: theme.fontSizes.lg },
						weekdayCell: {
							fontSize: theme.fontSizes.xl,
							backgroundColor:
								theme.colorScheme === "dark"
									? theme.colors.dark[5]
									: theme.colors.gray[0],
							border: `1px solid ${
								theme.colorScheme === "dark"
									? theme.colors.dark[4]
									: theme.colors.gray[2]
							}`,
							height: 70,
						},
					})}
				/>
			</div>
		</MainLayout>
	);
};

export default UserPage;
