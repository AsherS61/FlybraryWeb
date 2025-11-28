import { findOrCreateUser } from "@/libs/auth";
import NextAuth, { Profile } from "next-auth";
import LineProvider from "next-auth/providers/line";

const handler = NextAuth({
  providers: [
    LineProvider({
      clientId: process.env.LINE_CHANNEL_ID!,
      clientSecret: process.env.LINE_CHANNEL_SECRET!,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          image: profile.picture,
          email: profile.email ?? null,
          lineId: profile.sub,
        };
      },
    }
  )],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      console.log("Line Account:", account);
      console.log("LINE profile:", profile);
      
      // if (account && profile) {
      //   token.accessToken = account.access_token;
      //   token.idToken = account.id_token;

      //   const userFromDB = await findOrCreateUser({
      //     displayName: profile.name,    
      //     picture: profile.image,
      //     lineId: profile.sub,   
      //   });
        
      //   token.userId = userFromDB.id;
      //   token.role = userFromDB.role;
      //   token.name = userFromDB.name;
      //   token.picture = userFromDB.picture;
      //   token.lineId = userFromDB.lineId;
      // }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
        session.idToken = token.idToken as string;

        session.user.id = token.userId as number;
        session.user.role = token.role as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
        session.user.lineId = token.lineId as string;
      }

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