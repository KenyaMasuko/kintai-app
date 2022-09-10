import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserSignIn } from "src/utils/userSignIn";

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
				const res = await UserSignIn(postData);
				console.log("bye");

				if (res.data.messages !== "OK") {
					// throw new Error(res);
					console.log("こんにちは");

					return null;
				} else {
					console.log("こんばんわ");

					const user = {
						name: res.data[0].shimei,
						email: res.data[0].user_code,
					};
					return user;
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
					accessToken: user.token,
					refreshToken: user.refreshToken,
				};
			}

			return token;
		},
		async session({ session, token }) {
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
		signIn: "/login",
		signOut: "/login",
	},
	// Enable debug messages in the console if you are having problems
	debug: process.env.NODE_ENV === "development",
});
