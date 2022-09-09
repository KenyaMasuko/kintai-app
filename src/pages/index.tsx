import { Button, TextInput } from "@mantine/core";
import type { NextPage } from "next";
import { MainLayout } from "src/components/MainLayout";
import { useForm } from "@mantine/form";
import { useState } from "react";

//ログインページ
const Home: NextPage = () => {
	const [isLogin, setIsLogin] = useState(true);
	const form = useForm({
		initialValues: {
			id: "",
			password: "",
			termsOfService: false,
		},
	});

	// ログインAPIをたたく
	const handleSubmit = async () => {
		// todo loginMutateを叩く
	};

	return (
		<MainLayout title="サインインページ">
			<form className="bg-white space-y-4 py-24 px-14" onSubmit={handleSubmit}>
				<TextInput
					withAsterisk
					label="ログインID"
					placeholder="ログインID"
					{...form.getInputProps("id")}
				/>

				<TextInput
					withAsterisk
					label="パスワード"
					placeholder="パスワード"
					{...form.getInputProps("password")}
				/>

				<Button className="group flex mx-auto hover:opacity-70">
					サインイン
				</Button>
			</form>
		</MainLayout>
	);
};

export default Home;
