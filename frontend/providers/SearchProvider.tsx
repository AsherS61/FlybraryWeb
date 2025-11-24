'use client'

import { createContext, useContext, useState } from 'react'

// Context that provides the state and functions for the modal
type SearchContextType = {
  searchTrigger: number
  triggerSearch: () => void
}

// Create a context for the modal
const SearchContext = createContext<SearchContextType | undefined>(undefined)

// SearchProvider component that wraps the application and provides the modal context
// It manages the state of the modal (open/close) and provides functions to control it
export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTrigger, setSearchTrigger] = useState(0)

  const triggerSearch = () => {
    setSearchTrigger((prev) => prev + 1) // notify change
  }

  return (
    <SearchContext.Provider value={{ triggerSearch, searchTrigger }}>
      {children}
    </SearchContext.Provider>
  )
}

// Custom hook to use the modal context
export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}
