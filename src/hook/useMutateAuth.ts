import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
// import { singIn } from "src/utils/client";

export const useMutateAuth = () => {
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");

	//reset
	// const reset = () => {
	// 	setId("");
	// 	setPassword("");
	// };

	// //login
	// const loginMutation = useMutation(
	// 	async ({ email, password }: LoginProps) => {
	// 		const response = await axios({
	// 			method: `post`,
	// 			url: "../pages/api/signIn",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			data: {
	// 				email,
	// 				password,
	// 			},
	// 		});
	// 		if (response.data.error.data) throw new Error(response.data.error.data);
	// 	},
	// 	{
	// 		onError: (error: any) => {
	// 			alert(error);
	// 			reset();
	// 		},
	// 	}
	// );

	// return {
	// 	id,
	// 	setId,
	// 	password,
	// 	setPassword,
	// 	loginMutation,
	// };
};
