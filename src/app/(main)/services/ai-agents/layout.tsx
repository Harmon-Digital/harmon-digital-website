import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Agents for Business Operations',
  description: 'We install AI agents into your business that handle email, scheduling, project management, reporting, and customer service — 24/7. Custom-built for your team.',
  keywords: [
    'AI agents',
    'business automation',
    'AI operations',
    'AI assistant',
    'business AI',
    'workflow automation',
    'AI customer service',
    'AI email agent',
    'AI scheduling',
    'AI project management',
  ],
  openGraph: {
    title: 'AI Agents for Business Operations | Harmon Digital',
    description: 'We install AI agents into your business that handle email, scheduling, project management, reporting, and customer service — 24/7.',
    url: 'https://harmon-digital.com/services/ai-agents',
  },
}

export default function AIAgentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
