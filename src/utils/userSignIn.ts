import axios from "axios";
import { endpoint } from "./endpoint";

type LoginProps = {
	email: string | undefined;
	password: string | undefined;
};

export const UserSignIn = async ({ email, password }: LoginProps) => {
	return await axios({
		method: `post`,
		url: `${endpoint}/login`,
		headers: {
			"Content-Type": "application/json",
		},
		data: {
			email,
			password,
		},
	});
};
