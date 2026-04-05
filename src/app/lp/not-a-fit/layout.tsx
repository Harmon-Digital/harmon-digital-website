import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Not Quite the Right Fit Yet | Harmon Digital',
  description: 'Your business is still early — and that\'s okay. Here\'s what you should focus on before AI and automation make sense.',
}

export default function NotAFitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
