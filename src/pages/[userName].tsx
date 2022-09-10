import { Button, Container, Group, List } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { Calender } from "src/components/Calender";
import { MainLayout } from "src/components/MainLayout";
import { TimeButton } from "src/components/TimeButton";
import ContextWrapper from "src/context/ContextWrapper";
import { FiLogIn } from "react-icons/fi";

const UserPage = (props: Promise<any>) => {
	const router = useRouter();
	const { userName } = router.query;

	console.log(props);

	return (
		<>
			<header className="fixed bg-white">
				<nav>
					<List listStyleType="none">
						<List.Item>ユーザー名（部署）</List.Item>
					</List>
				</nav>
			</header>
			<MainLayout title={`${userName}のページ`}>
				<Container className="bg-white" size={400} px="xs">
					<div className="space-y-4 py-3 mx-auto">
						<Group spacing={4} className="flex-col">
							<TimeButton />
						</Group>
						<Group position="center">
							<Button className="hover:opacity-70">出勤</Button>
							<Button disabled>退勤</Button>
						</Group>
					</div>
				</Container>
				<Container className="bg-white mt" size="md">
					<div className="bg-white mt-10 py-12 px-14">
						<ContextWrapper>
							<Calender />
						</ContextWrapper>
					</div>
				</Container>
			</MainLayout>
		</>
	);
};

export const getServerSideProps = async () => {
	// const data = {
	// 	email: "sugitani@ei-shin.com",
	// 	password: "pa123456",
	// };
	try {
		const data = {
			email: "sugitani@ei-shin.com",
			password: "pa123456",
		};
		// const data = {
		// 	user_id: 1,
		// 	button_type: 0,
		// 	date: "2017-01-01",
		// 	time: "12:30",
		// };
		const res = await fetch(
			"https://956b-2409-11-4260-1800-9d51-59e8-7166-a57b.jp.ngrok.io/api/login",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					// Authorization: "Bearer 3|PXRndh79lUAJODqCOGNPFi31XbdGe9tM3O0Zp9W4",
				},
				body: JSON.stringify(data),
			}
		);
		console.log("~~getServerSideProps~~");
		console.log(res);

		const json = await res.json();

		return {
			props: { json },
		};
	} catch (error) {
		console.log(error);
		return {
			props: {},
		};
	}
};

export default UserPage;
