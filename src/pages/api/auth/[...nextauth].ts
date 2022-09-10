import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";
import { UserSignIn } from "src/hook/userSignIn";

export default NextAuth({
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "メールアドレス",
				},
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials, req) => {
				const postData = {
					email: credentials?.email,
					password: credentials?.password,
				};

				// APIのpostにて、ユーザーテーブルからログインユーザデータを取得してくる
				// postSigninUserメソッドは別途定義している(axiosを使用）
				const res: any = await UserSignIn(postData);
				console.log("bye");

				if (res.statusText !== "OK") {
					console.log("~~status Error~~");

					// throw new Error(res);
					return null;
				} else {
					console.log("~~status ok~~");

					const token = {
						accessToken: res.data.access_token,
						tokenType: res.data.token_type,
						email: credentials?.email,
						name: res.data.name,
					};

					return token;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, account }) {
			// 最初のサインイン
			if (account && user) {
				return {
					...token,
					accessToken: user.accessToken,
					refreshToken: user.refreshToken,
				};
			}

			return token;
		},
		async session({ session, token }) {
			console.log("~~this is session ~~");
			signOut();

			session.accessToken = token.accessToken;
			session.refreshToken = token.refreshToken;
			session.accessTokenExpires = token.accessTokenExpires;

			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	// サインイン・サインアウトで飛ぶカスタムログインページを指定
	// サインアウト時に、”Are you sure you want to sign out?”と聞かれるページを挟むのをスキップする
	pages: {
		signIn: "/",
		signOut: "/",
	},
	// Enable debug messages in the console if you are having problems
	debug: process.env.NODE_ENV === "development",
});
