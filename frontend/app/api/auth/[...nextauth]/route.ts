import { findOrCreateUser } from "@/libs/auth";
import NextAuth from "next-auth";
import LineProvider from "next-auth/providers/line";
interface LineProfile {
  sub: string;
  name: string;
  picture: string;
  email?: string;
  lineId: string;
}

export const handler = NextAuth({
  providers: [
    LineProvider({
      clientId: process.env.LINE_CHANNEL_ID!,
      clientSecret: process.env.LINE_CHANNEL_SECRET!,
      authorization: {
        params: {
          scope: "openid profile email",
        },
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
      const p = profile as LineProfile;
      
      if (account && profile) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;

        const userFromDB = await findOrCreateUser({
          displayName: profile.name,    
          picture: profile.image,
          lineId: profile.sub,   
        });
        
        token.userId = userFromDB.id;
        token.role = userFromDB.role;
        token.name = p.name;
        token.picture = p.picture;
        token.sub = p.sub;
      }

      console.log("TOKEN:", token)

      return token;
    },
    async session({ session, token }) {
      console.log("SESSION CALLBACK: ", { token });
      // session.user.id = token.userId as number;
      // session.user.role = token.role as string;
      session.user.name = token.name as string;
      session.user.picture = token.picture as string;
      session.user.lineId = token.sub as string;

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