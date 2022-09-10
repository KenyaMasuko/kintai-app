import "../styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { ReactElement, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { NextPage } from "next";

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({
	Component,
	// @ts-ignore
	pageProps: { session, ...pageProps },
	router,
}: AppPropsWithLayout) {
	// useEffect(() => {
	// 	// ここに全ページ共通で行う処理
	// 	router.push("/login");
	// }, []);

	// todo ユーザーのログイン状態を判定する
	//userの状態によって処理を分ける
	// todo レンダリング時にバリデーションを実行

	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>

			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					/** Put your mantine theme override here */
					colorScheme: "light",
				}}
			>
				<SessionProvider session={session}>
					<Component {...pageProps} />
				</SessionProvider>
			</MantineProvider>
		</>
	);
}
