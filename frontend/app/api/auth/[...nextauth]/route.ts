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
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;

        if (profile) {
          const userFromDB = await findOrCreateUser({
            displayName: profile.name,    
            picture: profile.image,
            lineId: profile.sub,   
          });

          token.userId = userFromDB.id.toString();
          token.role = userFromDB.role;
          token.name = userFromDB.name;
          token.picture = userFromDB.picture;
          token.lineId = userFromDB.lineId;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.idToken = token.idToken as string;

      session.user.id = token?.userId as number;
      session.user.role = token?.role as string;
      session.user.name = token?.name as string;
      session.user.image = token?.picture as string;
      session.user.lineId = token?.lineId as string;

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
