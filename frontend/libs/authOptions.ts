// src/libs/auth/authOptions.ts
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { login } from './auth'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null
        }

        try {
          const loginResponse = await login({
            email: credentials.email, 
            password: credentials.password 
          })

          if (!loginResponse.success) {
            console.error('FAS login failed:', loginResponse)
            return null
          }

          return {
            token: loginResponse.data.token,
            role: loginResponse.data.role,
            id: String(loginResponse.data.profile.id),
            name: loginResponse.data.profile.name,
            profilePictureUrl: loginResponse.data.profile.profilePictureUrl,
            email: loginResponse.data.profile.email,
            tel: loginResponse.data.profile.tel,
            lineId: loginResponse.data.profile.lineId,
          }
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      },
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      token = { ...token, ...user }

      if (trigger === 'update') {
        token = { ...token, ...session.user }
      }

      // const ninetyDaysInSeconds = 90 * 24 * 60 * 60;
      // token.exp = Math.floor(Date.now() / 1000) + ninetyDaysInSeconds;
      return token
    },
    async session({ session, token }) {
      session.user = token as any
      return session
    },
    async redirect({ url, baseUrl }) {
      // Special case for callback URL with code
      if (url.includes('/callback') && url.includes('code=')) {
        return url
      }

      // Standard NextAuth redirect logic
      if (url.startsWith('/')) return `${baseUrl}${url}`
      if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
}