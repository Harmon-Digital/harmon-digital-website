import type { Metadata } from 'next'
import '@/styles/main.css'
import { Header } from '@/components/main/Header'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import {
  OrganizationSchema,
  ProfessionalServiceSchema,
  FAQSchema,
  WebSiteSchema,
} from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: {
    default: 'Harmon Digital | Custom Software & Automation',
    template: '%s | Harmon Digital',
  },
  description: 'Custom software and automation for businesses built to exit or scale. AI-powered development delivered in 3-6 months.',
  keywords: [
    'custom software development',
    'business automation',
    'AI development',
    'internal tools',
    'workflow automation',
    'business systems',
    'software for small business',
    'operations software',
    'AI agents',
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
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
