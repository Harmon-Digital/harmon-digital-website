import type { Metadata } from 'next'
import '@/styles/main.css'
import { Header } from '@/components/main/Header'
import { Footer } from '@/components/main/Footer'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { MetaPixel } from '@/components/analytics/MetaPixel'
import {
  OrganizationSchema,
  ProfessionalServiceSchema,
  FAQSchema,
  WebSiteSchema,
} from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: {
    default: 'Harmon Digital | Custom Software, AI & Automation',
    template: '%s | Harmon Digital',
  },
  description: 'We build custom software, AI agents, websites, and automation for businesses. Not templates — software built around how your team actually works.',
  keywords: [
    'custom software development',
    'AI agents for business',
    'business automation',
    'custom internal tools',
    'workflow automation',
    'web app development',
    'AI consulting',
    'software for small business',
    'custom web development',
    'process automation',
  ],
  authors: [{ name: 'Harmon Digital, LLC' }],
  creator: 'Harmon Digital, LLC',
  publisher: 'Harmon Digital, LLC',
  category: 'Technology',
  metadataBase: new URL('https://harmon-digital.com'),
  alternates: {
    canonical: 'https://harmon-digital.com',
  },
  openGraph: {
    title: 'Harmon Digital | Custom Software, AI & Automation',
    description: 'We build custom software, AI agents, websites, and automation for businesses. Not templates — software built around how your team actually works.',
    url: 'https://harmon-digital.com',
    siteName: 'Harmon Digital',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Harmon Digital - Custom Software, AI & Automation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harmon Digital | Custom Software, AI & Automation',
    description: 'Custom software, AI agents, and automation built for your business.',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Information" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLM Full Information" />
        <OrganizationSchema />
        <ProfessionalServiceSchema />
        <FAQSchema />
        <WebSiteSchema />
      </head>
      <body className="main-body" suppressHydrationWarning>
        <GoogleAnalytics />
        <MetaPixel />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
