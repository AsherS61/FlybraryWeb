import type { Metadata } from 'next'
import { Noto_Sans_Thai } from 'next/font/google'
// @ts-ignore
import './globals.css'
import { ModalProvider } from '../providers/ModalProvider'
import NextAuthProvider from '../providers/NextAuthProvider'
import MainLayout from '../components/layout/MainLayout'
import { BannerProvider } from '../providers/BannerProvider'
import { SearchProvider } from '../providers/SearchProvider'
import { SnackbarProvider } from '../providers/SnackbarProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/authOptions'

const notoSansThai = Noto_Sans_Thai({
  subsets: ['latin', 'thai'], // Specify the Thai subset for proper character display
  variable: '--font-noto-sans-thai', // Optional: Create a CSS variable for easier styling
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'], // Choose desired font weights
})

export const metadata: Metadata = {
  title: 'Flybrary',
  description: 'ระบบยืม-คืนหนังสือ',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
      <NextAuthProvider session={session} >
          <SearchProvider>
            <SnackbarProvider>
              <ModalProvider>
                <BannerProvider>
                  <MainLayout>{children}</MainLayout>
                </BannerProvider>
              </ModalProvider>
            </SnackbarProvider>
          </SearchProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}