import { Button, Container, TextInput } from "@mantine/core";
import type { NextPage } from "next";
import { MainLayout } from "src/components/MainLayout";
import { useForm } from "@mantine/form";
import { FormEvent, useState } from "react";
import { getCsrfToken, signIn } from "next-auth/react";
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
const Login: NextPage<any> = ({
	csrfToken,
}: {
	csrfToken: string | undefined;
}) => {
	const router = useRouter();
	const [error, setError] = useState("");
	const form = useForm({
		initialValues: {
			email: "",
			password: "",
			termsOfService: false,
		},
	});
	const signInUser = async (data: FormValues) => {
		// ここで<any>を書かないとtypeエラーが消えなかったので書いています
		const res = await signIn<any>("credentials", {
			redirect: false,
			email: data.email,
			password: data.password,
			callbackUrl: `${window.location.origin}`,
		});
		if (res?.error) {
			setError("UserId,Passwordを正しく入力してください");
		} else {
			// ログイン後に飛ぶページ
			router.push("/kenyamasuko");
		}

		// console.log("hello");

		// router.push("/dashboard");
		// .then((res) => {
		// 	if (res?.error) {
		// 	} else {
		// 		// ログイン後に飛ぶページ
		// 		router.push("/index");
		// 	}
		// });
	};

	// ログインAPIをたたく
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("hello");

		signInUser({
			email: form.values.email,
			password: form.values.password,
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
						{...form.getInputProps("email")}
					/>

					<TextInput
						withAsterisk
						label="パスワード"
						placeholder="パスワード"
						type="password"
						{...form.getInputProps("password")}
					/>

					<Button type="submit" className="group flex mx-auto hover:opacity-70">
						サインイン
					</Button>
				</form>
			</Container>
		</MainLayout>
	);
};

export default Login;
