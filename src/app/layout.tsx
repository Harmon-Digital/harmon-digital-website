import type { Metadata } from 'next'
import '@/styles/main.css'
import { Header } from '@/components/main/Header'

export const metadata: Metadata = {
  title: 'Harmon Digital | Custom Software & Automation',
  description: 'Custom software and automation for businesses built to exit or scale. AI-powered development delivered in 3-6 months.',
  keywords: ['custom software', 'business automation', 'AI development', 'internal tools', 'workflow automation', 'business systems'],
  authors: [{ name: 'Harmon Digital' }],
  creator: 'Harmon Digital',
  metadataBase: new URL('https://harmon-digital.com'),
  openGraph: {
    title: 'Harmon Digital | Custom Software & Automation',
    description: 'Custom software and automation for businesses built to exit or scale. AI-powered development delivered in 3-6 months.',
    url: 'https://harmon-digital.com',
    siteName: 'Harmon Digital',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Harmon Digital - Custom Software & Automation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harmon Digital | Custom Software & Automation',
    description: 'Custom software and automation for businesses built to exit or scale.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
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
