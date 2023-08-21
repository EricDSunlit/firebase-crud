import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'anime-crud',
  description: 'Anime CRUD with firebase'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cn(
        'bg-white text-slate-900 antialiased light',
        inter.className
      )}
    >
      <body className="antialiased max-h-screen w-screen">
        <Navbar />
        <main className="md:px-7 overflow-x-hidden">{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
