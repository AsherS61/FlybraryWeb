import { findOrCreateUser } from "@/libs/auth";
import NextAuth from "next-auth";
import LineProvider from "next-auth/providers/line";

const handler = NextAuth({
  providers: [
    LineProvider({
      clientId: process.env.LINE_CHANNEL_ID!,
      clientSecret: process.env.LINE_CHANNEL_SECRET!,
      authorization: {
        params: {
          scope: "profile openid email",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const userFromDB = await findOrCreateUser(profile);
        token.userId = userFromDB._id.toString();
        token.role = userFromDB.role;
        token.name = userFromDB.name;
        token.email = userFromDB.email;
        token.picture = userFromDB.picture;
      }
      return token;
    },
    async session({ session, token }) {
      // Keep id as string to avoid NaN when converting types
      session.user.id = token.userId as string;
      session.user.role = token.role as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.profilePictureUrl = token.picture as string;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (!url) return baseUrl;
      if (typeof url === "string" && url.includes("/callback") && url.includes("code=")) return url;
      if (typeof url === "string" && url.startsWith("/")) return `${baseUrl}${url}`;
      try {
        const dest = new URL(typeof url === "string" ? url : String(url));
        if (dest.origin === baseUrl) return url as string;
      } catch (e) {
        // malformed or relative URL; fallthrough to baseUrl
      }
      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
