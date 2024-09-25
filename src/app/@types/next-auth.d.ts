import NextAuth from 'next-auth'

declare module 'next-auth' {
  export interface User {
    id: string
    username: string
    name: string
    email: string
    avatar_url: string
  }

  export interface Session {
    user: {
      id: string | null | undefined
      username: string
      name?: string | null | undefined
      email?: string | null | undefined
      avatar_url: string | null | undefined
    }
  }
}
