'use client'

import { SessionProvider } from 'next-auth/react'

export default function NextAuthProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session: any
}): React.ReactNode {
  return <SessionProvider session={session} refetchInterval={5 * 60} refetchOnWindowFocus={true} >{children}</SessionProvider>
}