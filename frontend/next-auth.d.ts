import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      role: string;
      name: string;
      picture: string;
      lineId: string;
    }
    access_token: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    role: string;
    name: string;
    picture: string;
    lineId: string;
  }
}
