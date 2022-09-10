import axios from "axios";
import { endpoint } from "../utils/endpoint";

type LoginProps = {
	email: string | undefined;
	password: string | undefined;
};

export const UserSignIn = async ({ email, password }: LoginProps) => {
	return await axios({
		method: "get",
		url: `${endpoint}/attendance/home`,
		headers: {
			"Content-Type": "application/json",
		},
		data: {
			email,
			password,
		},
	});
};
