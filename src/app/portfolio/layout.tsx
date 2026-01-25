import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio | Harmon Digital',
  description: 'See our work: custom software, AI agents, and automation systems built for real businesses. Internal portals, workflow automation, and more.',
  openGraph: {
    title: 'Portfolio | Harmon Digital',
    description: 'See our work: custom software, AI agents, and automation systems built for real businesses.',
  },
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
