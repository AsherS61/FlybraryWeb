import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      token: string // JWT token
      role: string // User role

      // user data
      id: number
      name: string
      profilePictureUrl: string

      studentId?: string
      isFromIdp?: boolean

      email?: string
      tel?: string
      lineId?: string

      university?: string
      faculty?: string
      department?: string
      program?: string
      admissionYear?: string
    }
  }
}