import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true
})

export const metadata: Metadata = {
  title: 'Vibe Coding Course - Build Your MVP in 30 Days',
  description: 'Join Vibe Coding Course and learn to build, test, and launch your MVP in just one month.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
