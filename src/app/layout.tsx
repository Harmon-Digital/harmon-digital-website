import type { Metadata } from 'next'
import '@/styles/main.css'
import { Header } from '@/components/main/Header'

export const metadata: Metadata = {
  title: 'Harmon Digital | AI Automation Partner',
  description: 'Your go-to AI automation partner. Unlimited automation requests for a fixed monthly fee.',
  openGraph: {
    title: 'Harmon Digital | AI Automation Partner',
    description: 'Your go-to AI automation partner. Unlimited automation requests for a fixed monthly fee.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="main-body">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
