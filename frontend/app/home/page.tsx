'use client'

// import next
import { useRouter } from 'next/navigation'
import BannerSection from './components/BannerSection'
import { useSession } from 'next-auth/react'

export default function Home() {
  // Primary variables
  const router = useRouter()

  const { data: session } = useSession();
  console.log("USER PROFILE: ", session)

  return (
    <main className='flex flex-col leading-none mt-20'>
        HOME PAGE
    </main>
  )
}
