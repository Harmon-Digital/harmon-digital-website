import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get a Free AI Audit | Harmon Digital',
  description: 'We build custom AI tools, automation, and software that handle the work your team shouldn\'t be doing manually. Book your free audit today.',
}

export default function LandingPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
