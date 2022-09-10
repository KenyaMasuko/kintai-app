import { Button, Container, TextInput } from "@mantine/core";
import type { NextPage } from "next";
import { MainLayout } from "src/components/MainLayout";
import { useForm } from "@mantine/form";
import { FormEvent, useEffect, useState } from "react";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CtxOrReq } from "next-auth/client/_utils";

export const getServerSideProps = async (context: CtxOrReq | undefined) => {
	return {
		props: {
			title: "login",
			csrfToken: await getCsrfToken(context),
		},
	};
};

type FormValues = {
	email?: string;
	password?: string;
};

//ログインページ
const Home: NextPage<any> = ({
	csrfToken,
}: {
	csrfToken: string | undefined;
}) => {
	const router = useRouter();
	const { data: session } = useSession();

	useEffect(() => {
		if (session) {
			router.push(`/${session?.user?.name}`);
		}
	}, [session]);

	const [error, setError] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const signInUser = async (data: FormValues) => {
		const res = await signIn<any>("credentials", {
			redirect: false,
			email: data.email,
			password: data.password,
			callbackUrl: `${window.location.origin}`,
		});
		if (res?.error) {
			setError("メールアドレスかパスワードが違います");
			console.log(res?.error);
			return;
		} else {
			// ログイン後に飛ぶページ
			console.log(res);
			router.push(`/${session?.user?.name}`);
		}
	};

	// ログインAPIをたたく
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		signInUser({
			email,
			password,
		});
	};

	return (
		<MainLayout title="サインインページ">
			<Container className="bg-white" size="md" px="xs">
				<form className="mx-auto space-y-4 py-24 w-1/2" onSubmit={handleSubmit}>
					<TextInput
						withAsterisk
						label="メールアドレス"
						placeholder="メールアドレス"
						type="email"
						error={error}
						onChange={(e) => setEmail(e.currentTarget.value)}
						value={email}
					/>

					<TextInput
						withAsterisk
						label="パスワード"
						placeholder="パスワード"
						error={error}
						onChange={(e) => setPassword(e.currentTarget.value)}
						value={password}
					/>

					<Button type="submit" className="group flex mx-auto hover:opacity-70">
						サインイン
					</Button>
				</form>
			</Container>
		</MainLayout>
	);
};

export default Home;
