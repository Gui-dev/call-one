'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

import { queryClient } from '../lib/react-query'

interface IReactQueryProviderProps {
  children: ReactNode
}

export const ReactQueryProvider = ({ children }: IReactQueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
