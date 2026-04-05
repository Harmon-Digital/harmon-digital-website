import type { Metadata } from 'next'
import { generateProjectMetadata } from './metadata'

type Props = {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return generateProjectMetadata(slug)
}

export default function ProjectLayout({ children }: Props) {
  return children
}
