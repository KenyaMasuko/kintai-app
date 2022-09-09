import Head from "next/head";
import React, { FC, ReactNode } from "react";

type Props = {
	children: ReactNode;
	title: string;
};

export const MainLayout: FC<Props> = ({ children, title }) => {
	return (
		<div className="bg-gray-100 h-screen w-screen flex justify-center items-center">
			<Head>
				<title>{title}</title>
			</Head>
			<main className="w-2/4 mx-auto">{children}</main>
		</div>
	);
};
