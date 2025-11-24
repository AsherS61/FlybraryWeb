'use client'

import clsx from 'clsx'
import { createContext, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../components/ui/Button'
import { formatDateTimeEn } from '../utils/date/dateFormatter'
import { XMarkIcon } from '@heroicons/react/24/outline'

// Snackbar interface
interface Snackbar {
  id?: string
  title: React.ReactNode
  description?: React.ReactNode
  duration?: number
  actionLabel?: string
  onAction?: () => void
}

// Context that provides the state and functions for the snackbar
type SnackbarContextType = {
  snackbars: Snackbar[]
  addSnackbar: (snackbar: Snackbar) => void
  removeSnackbar: (id: string) => void
  clearSnackbars: () => void
}

// Create a context for the snackbar
const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
)

// SnackbarProvider component that wraps the application and provides the snackbar context
// It manages the state of the snackbar (open/close) and provides functions to control it
export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [snackbars, setSnackbars] = useState<Snackbar[]>([])

  const addSnackbar = (snackbar: Snackbar) => {
    // If there is no id, generate a new one using date time
    const timeStamp = Date.now().toString()
    if (!snackbar.id) {
      snackbar.id = timeStamp
    }

    // If there are no description use date time as description
    if (!snackbar.description) {
      snackbar.description = formatDateTimeEn(new Date())
    }

    // Add snackbar to the list
    setSnackbars((prev) => [...prev, snackbar])

    // Automatically remove the snackbar after the specified duration
    setTimeout(() => {
      removeSnackbar(snackbar.id || timeStamp)
    }, snackbar.duration || 3000)
  }

  const removeSnackbar = (id: string) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id))
  }

  const clearSnackbars = () => {
    setSnackbars([])
  }

  return (
    <SnackbarContext.Provider
      value={{ snackbars, addSnackbar, removeSnackbar, clearSnackbars }}>
      {children}
      {/* Render snackbar */}
      <Snackbar snackbars={snackbars} removeSnackbar={removeSnackbar} />
    </SnackbarContext.Provider>
  )
}

// Custom hook to use the modal context
export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext)
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  }
  return context
}

// Snackbar component that displays the snackbar messages
export const Snackbar = ({ snackbars, removeSnackbar }: SnackbarProps) => {
  const handleClose = (snackbar: Snackbar) => {
    if (snackbar.onAction) {
      snackbar.onAction()
    }
    removeSnackbar(snackbar.id || '')
  }

  return (
    <div
      className={clsx(
        'fixed right-4 top-4 z-[1100] flex flex-col gap-2 sm:bottom-4 sm:top-auto',
        'transition-all duration-200 ease-in-out'
      )}>
      <AnimatePresence>
        {snackbars.map((snackbar) => (
          <motion.div
            key={snackbar.id}
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className={clsx(
              'relative flex w-52 flex-row items-center justify-between rounded-md p-2 shadow-lg sm:w-80',
              'bg-white text-gray-900',
              'border border-gray-200',
              'transition-all duration-200'
            )}>
            <div className={clsx('flex w-full flex-col gap-y-2')}>
              <h1 className={clsx('font-semibold', 'text-gray-900')}>
                {snackbar.title}
              </h1>
              <p className={clsx('text-sm', 'text-gray-600')}>
                {snackbar.description}
              </p>
            </div>
            {snackbar.actionLabel ? (
              <Button onClick={() => handleClose(snackbar)} wFit>
                {snackbar.actionLabel}
              </Button>
            ) : (
              <Button variant='text' onClick={() => handleClose(snackbar)} wFit>
                <XMarkIcon className='h-6 w-6' />
              </Button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

interface SnackbarProps {
  snackbars: Snackbar[]
  removeSnackbar: (id: string) => void
}
