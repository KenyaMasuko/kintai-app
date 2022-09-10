import { Button, Container, Group, List } from "@mantine/core";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, Fragment, useEffect, useState } from "react";
import { Calender } from "src/components/Calender";
import { MainLayout } from "src/components/MainLayout";
import { TimeButton } from "src/components/TimeButton";
import ContextWrapper from "src/context/ContextWrapper";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import { endpoint } from "src/utils/endpoint";
import { NextPage } from "next";
import dayjs from "dayjs";

type Props = {
	data: {
		attend_leave: 0 | 1 | 2;
	};
};

const UserPage: NextPage<Props> = (props) => {
	console.log(props);
	const [workState, setWorkState]: [number, any] = useState(
		props.data?.attend_leave
	);

	const router = useRouter();
	const { data: session } = useSession();
	const { userName } = router.query;

	const token = session?.accessToken;

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log("hello");

		setWorkState((prev: number) => Number(!prev));
		console.log(workState);

		const { data } = await axios({
			method: "post",
			url: `${endpoint}/attendance/registration`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			data: {
				button_type: workState,
				date: String(dayjs().format("YYYY-MM-DD")),
				time: String(dayjs().format("HH:mm")),
			},
		});

		console.log(data);
	};

	return (
		<>
			<header className="fixed bg-white">
				<nav>
					<List listStyleType="none">
						<List.Item>{session?.user?.name}</List.Item>
						<List.Item className="cursor-pointer" onClick={() => signOut()}>
							ログアウト
							<FiLogIn />
						</List.Item>
					</List>
				</nav>
			</header>
			<MainLayout title={`${session?.user?.name}のページ`}>
				<Container className="bg-white" size={400} px="xs">
					<form onSubmit={handleSubmit} className="space-y-4 py-3 mx-auto">
						<Group spacing={4} className="flex-col">
							<TimeButton user={session?.user?.name} />
						</Group>
						<Group position="center">
							{workState === 0 && (
								<Fragment>
									<Button type="submit" className="hover:opacity-70">
										出勤
									</Button>
									<Button disabled>退勤</Button>
								</Fragment>
							)}
							{workState === 1 && (
								<Fragment>
									<Button disabled>出勤</Button>
									<Button type="submit" className="hover:opacity-70">
										退勤
									</Button>
								</Fragment>
							)}
							{workState === 2 && (
								<Fragment>
									<Button disabled>出勤</Button>
									<Button disabled>退勤</Button>
								</Fragment>
							)}
						</Group>
					</form>
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

export const getServerSideProps = async (context: any) => {
	const session = await getSession(context);
	if (!session?.accessToken) {
		console.log("エラーが発生しました");
		signOut();

		return {
			props: {},
		};
	}

	const token = session?.accessToken;
	const today = dayjs().format("YYYY-MM-DD");

	const { data } = await axios({
		method: "get",
		url: `${endpoint}/attendance/home`,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		data: {
			date: today,
		},
	});

	// console.log(data);

	return {
		props: { data },
	};
};

export default UserPage;
