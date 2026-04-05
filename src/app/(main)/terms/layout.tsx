import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Harmon Digital',
  description: 'Terms of service for Harmon Digital, LLC. Understand your rights and responsibilities when using our services.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
