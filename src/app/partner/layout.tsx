import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partner Program for M&A Advisors | Harmon Digital',
  description: 'Earn 15% commission on $35K-$100K projects. Help your clients systematize operations before sale and increase their valuations.',
  openGraph: {
    title: 'Partner Program for M&A Advisors | Harmon Digital',
    description: 'Earn 15% commission on $35K-$100K projects. Help your clients systematize operations before sale.',
  },
}

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
