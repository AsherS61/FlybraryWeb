'use client'

// import next
import { useRouter } from 'next/navigation'
import BannerSection from './components/BannerSection'

export default function Home() {
  // Primary variables
  const router = useRouter()

  return (
    <main className='flex flex-col leading-none'>
        {/* <BannerSection /> */}
        HOME PAGE
    </main>
  )
}
