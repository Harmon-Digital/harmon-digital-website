import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Harmon Digital',
  description: 'Privacy policy for Harmon Digital, LLC. Learn how we collect, use, and protect your personal data.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
