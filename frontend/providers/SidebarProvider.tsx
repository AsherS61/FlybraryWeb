'use client'

import { checkIsMobile } from "../utils/device"
import React, { createContext, useContext, useState, ReactNode } from 'react'

// Context that provides the state and functions for the sidebar
type SidebarContextType = {
  isSidebarOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
  toggleSidebar: () => void
}

// Create a context for the sidebar
const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

// SidebarProvider component that wraps the application and provides the sidebar context
// It manages the state of the sidebar (open/close) and provides functions to control it
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    typeof window !== 'undefined' ? !checkIsMobile() : true
  )

  // Ensure sidebar state is correct on client after hydration
  React.useEffect(() => {
    setIsSidebarOpen(!checkIsMobile())
  }, [])

  const openSidebar = () => setIsSidebarOpen(true)
  const closeSidebar = () => setIsSidebarOpen(false)
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev)

  return (
    <SidebarContext.Provider
      value={{ isSidebarOpen, openSidebar, closeSidebar, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

// Custom hook to use the sidebar context
export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
