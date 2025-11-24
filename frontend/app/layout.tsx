import type { Metadata } from 'next'
import { Noto_Sans_Thai } from 'next/font/google'
// @ts-ignore
import './globals.css'
import { ModalProvider } from '../providers/ModalProvider'
import NextAuthProvider from '../providers/NextAuthProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libs/authOptions'
import MainLayout from '@/components/layout/MainLayout'

const notoSansThai = Noto_Sans_Thai({
  subsets: ['latin', 'thai'], // Specify the Thai subset for proper character display
  variable: '--font-noto-sans-thai', // Optional: Create a CSS variable for easier styling
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'], // Choose desired font weights
})

export const metadata: Metadata = {
  title: 'Talent Journey',
  description: 'ระบบลงทะเบียนเข้ากิจกรรม Talent Journey ของเด็ก CEDT',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Get the user's session based on the request
  const session = await getServerSession(authOptions)

  return (
    <html lang='en'>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body className={`${notoSansThai.className} antialiased`}>
        <NextAuthProvider session={session}>
          <ModalProvider>
            <MainLayout>{children}</MainLayout>
          </ModalProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}