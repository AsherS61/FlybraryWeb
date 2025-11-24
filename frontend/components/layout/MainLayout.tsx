'use client'

import MenuBar from './MenuBar'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({
  children,
}: ConditionalLayoutProps) {
  return (
    <>
      <MenuBar />
        <div className='container mt-24'>
            {children}
        </div>
    </>
  )
}