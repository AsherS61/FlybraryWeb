import { findOrCreateUser } from "@/libs/auth";
import NextAuth from "next-auth";
import LineProvider from "next-auth/providers/line";

const handler = NextAuth({
  providers: [
    LineProvider({
      clientId: process.env.LINE_CHANNEL_ID!,
      clientSecret: process.env.LINE_CHANNEL_SECRET!,
      // authorization: {
      //   params: {
      //     scope: "profile openid email",
      //   },
      // },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        // if (profile) {
        //   const userFromDB = await findOrCreateUser(profile);
        //   token.userId = userFromDB._id.toString();
        //   token.role = userFromDB.role;
        //   token.name = userFromDB.name;
        //   token.email = userFromDB.email;
        //   token.picture = userFromDB.picture;
        // }
        token.accessToken = account.access_token
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token?.accessToken as string;
      // session.user.id = token.userId as number;
      // session.user.role = token.role as string;
      // session.user.name = token.name as string;
      // session.user.email = token.email as string;
      // session.user.profilePictureUrl = token.picture as string;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.includes('/callback') && url.includes('code=')) return url;
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };