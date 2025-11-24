// This file contains utility functions to check the type of device being used.
export const checkIsMobile = (): boolean => {
  const userAgent = navigator.userAgent
  return /android.+mobile|ip(hone|[oa]d)/i.test(userAgent)
}

// Check is the os is windows
export const checkIsWindows = (): boolean => {
  const userAgent = navigator.userAgent
  return /windows/i.test(userAgent)
}
