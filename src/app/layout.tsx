import type { Metadata } from 'next'

import './styles/globals.css'

import { Roboto } from 'next/font/google'
import { ServerStylesheet } from './components/server-styles'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Call.one',
  description: 'Call One',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ServerStylesheet>{children}</ServerStylesheet>
      </body>
    </html>
  )
}
