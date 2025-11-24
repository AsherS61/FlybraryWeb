'use client'

import { createContext, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'

// Context that provides the state and functions for the modal
type BannerContextType = {
  isBannerOpen: boolean
  openBanner: (content: React.ReactNode) => void
  closeBanner: () => void
  isBannerLocked: boolean
  lockBanner: () => void
  unlockBanner: () => void
}

// Create a context for the modal
const BannerContext = createContext<BannerContextType | undefined>(undefined)

// BannerProvider component that wraps the application and provides the modal context
// It manages the state of the modal (open/close) and provides functions to control it
export const BannerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isBannerOpen, setIsBannerOpen] = useState(false)
  const [isBannerLocked, setIsBannerLocked] = useState(false)
  const [content, setContent] = useState<React.ReactNode>(null)

  const openBanner = (content: React.ReactNode) => {
    setContent(content)
    setIsBannerOpen(true)
  }

  const closeBanner = () => {
    if (isBannerLocked) return
    setIsBannerOpen(false)
    setContent(null)
  }

  const lockBanner = () => {
    setIsBannerLocked(true)
  }

  const unlockBanner = () => {
    setIsBannerLocked(false)
  }

  return (
    <BannerContext.Provider
      value={{
        isBannerOpen,
        openBanner,
        closeBanner,
        isBannerLocked,
        lockBanner,
        unlockBanner,
      }}>
      {children}
      <AnimatePresence>
        {isBannerOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className={clsx(
              // --- Layout / Spacing ---
              'fixed bottom-0 left-0 right-0 z-[900] md:bottom-4 md:left-4 md:right-4'
            )}>
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </BannerContext.Provider>
  )
}

// Custom hook to use the modal context
export const useBanner = (): BannerContextType => {
  const context = useContext(BannerContext)
  if (!context) {
    throw new Error('useBanner must be used within a BannerProvider')
  }
  return context
}
