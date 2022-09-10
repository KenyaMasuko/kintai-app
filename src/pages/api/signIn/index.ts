// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	if (req.method === "POST") {
		const data = req.body;
		const response = await axios({
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			data,
		});
	}
	res.status(200).json({ name: "John Doe" });
};

export default handler;
