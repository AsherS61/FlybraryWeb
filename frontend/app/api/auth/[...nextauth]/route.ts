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
    maxAge: 30 * 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      console.log("Line Account:", account);
      console.log("LINE profile:", profile);
      
      if (account && profile) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        const lineProfile = profile as LineProfile;

        const userFromDB = await findOrCreateUser({
          displayName: lineProfile.name,    
          picture: lineProfile.picture,
          lineId: lineProfile.sub,   
        });

        console.log("USER: " , userFromDB);
        
        token.userId = userFromDB.data?._id;
        token.role = userFromDB.data?.role;
        token.name = userFromDB.data?.name;
        token.picture = userFromDB.data?.profile;
        token.sub = userFromDB.data?.lineId;
      }

      console.log("TOKEN:", token)

      return token;
    },
    async session({ session, token }) {
      console.log("SESSION CALLBACK: ", { token });
      session.user.userId = token.userId as string;
      session.user.role = token.role as string;
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