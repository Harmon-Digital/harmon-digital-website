import type { Metadata } from 'next'

const projects: Record<string, { title: string; description: string; image?: string }> = {
  'mikes-fences': {
    title: "Mike's Fences - AI Appointment Setting Agent",
    description: "Custom AI agent for lead qualification and automated scheduling. Instant response, 40% more estimates scheduled.",
  },
  'hoplite-capital': {
    title: "Hoplite Capital - Multi-Location Dealership Software",
    description: "Custom work software connecting Airtable, Make.com, Shopmonkey & QuickBooks for a golf cart dealership.",
    image: "/portfolio/hoplite/hero.jpg",
  },
  'neighbors-bank': {
    title: "Neighbors Bank - RAG-Powered Slack Bot",
    description: "AI Slack bot for 200+ underwriters. Instant answers from internal docs, eliminating hours of manual lookup.",
    image: "/portfolio/neighborsbank/slack-conversation.png",
  },
  'happy-endings': {
    title: "Happy Endings - Full Operations System",
    description: "AI email agent and complete internal system: orders, kitchen, training, inventory. One platform runs the entire business.",
    image: "/portfolio/happyendings/hero.jpg",
  },
  'table-rock-black-lights': {
    title: "Table Rock Black Lights - E-Commerce & Automation",
    description: "Website redesign with e-commerce and automated order workflows for a fishing lighting company.",
  },
  'producifyx': {
    title: "ProducifyX - Staffing Agency Portal & ATS",
    description: "Custom portal and applicant tracking system. Owner saved 20+ hours/week with unified operations.",
    image: "/portfolio/producifyx/hero.jpg",
  },
}

export function generateProjectMetadata(slug: string): Metadata {
  const project = projects[slug]

  if (!project) {
    return {
      title: 'Project | Harmon Digital',
    }
  }

  return {
    title: `${project.title} | Harmon Digital`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Harmon Digital`,
      description: project.description,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  }
}
