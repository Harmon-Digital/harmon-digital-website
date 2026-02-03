'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Monitor } from 'lucide-react'
import styles from './project.module.css'

const projects = [
  {
    title: "Mike's Fences",
    slug: "mikes-fences",
    category: "AI Agent",
    description: "Custom appointment setting agent for a custom wood fence company.",
    fullDescription: "Mike's Fences builds custom wood fences that enhance the privacy, security, and beauty of properties. But Mike was missing leads because he couldn't respond fast enough—customers would submit quote requests and wait days for a callback. We built a custom appointment setting agent that responds immediately, qualifies the lead, gathers project details, and schedules estimates automatically. Now Mike focuses on building fences, not playing phone tag.",
    year: "2025",
    services: ["AI Lead Qualification", "Automated Scheduling", "CRM Integration", "SMS/Email Responses", "Quote Generation"],
    results: ["Instant lead response", "40% more estimates scheduled", "Zero missed inquiries", "Owner freed from phone"],
    stats: [
      { value: "40%", label: "More Estimates" },
      { value: "0", label: "Missed Leads" },
      { value: "24/7", label: "Response Time" },
      { value: "6", label: "Week Build" },
    ],
    timeline: "6 weeks",
    testimonial: {
      quote: "I used to spend half my day on the phone playing phone tag. Now I show up, give the estimate, and close the deal. The AI handles everything else.",
      author: "Mike",
      role: "Owner, Mike's Fences"
    },
    screenshots: [],
  },
  {
    title: "Hoplite Capital / Etto Leisure Carts",
    slug: "hoplite-capital",
    category: "Database & Automation",
    description: "Custom work software for a multi-location golf cart dealership.",
    fullDescription: "Hoplite Capital is a single-family office that acquired Etto Leisure Carts, a high-end golf cart dealership operating across multiple locations. The business had no centralized tracking—inventory, sales, repairs, quotes, and invoices were all manual and disconnected. We built comprehensive custom work software using Airtable, Make.com, Shopmonkey integration, and QuickBooks. Now they have real-time visibility across all operations with automated workflows for quotes, invoicing, inventory, sales, service tickets, and team management.",
    year: "2025",
    services: ["Custom Airtable Database", "Make.com Automations", "Shopmonkey Integration", "QuickBooks Integration", "Quote & Invoice Automation", "Multi-Location Inventory"],
    results: ["Real-time visibility across all operations", "Eliminated manual administrative work", "Multi-location inventory management", "Sales, service & accounting connected"],
    stats: [
      { value: "3+", label: "Locations" },
      { value: "100%", label: "Automated Quotes" },
      { value: "Real-Time", label: "Inventory" },
      { value: "0", label: "Manual Tracking" },
    ],
    timeline: "6 weeks",
    testimonial: null,
    screenshots: [
      { src: "/portfolio/hoplite/hero.jpg", alt: "Etto Leisure Carts", large: true },
      { src: "/portfolio/hoplite/quote-workflow.png", alt: "Quote Generation Workflow", large: true },
      { src: "/portfolio/hoplite/shopmonkey-workflow.png", alt: "Shopmonkey Integration" },
    ],
  },
  {
    title: "Neighbors Bank",
    slug: "neighbors-bank",
    category: "AI Agent",
    description: "RAG-powered Slack bot for 50+ underwriters.",
    fullDescription: "Neighbors Bank is a national mortgage lender with 50+ underwriters handling USDA, FHA, VA, and conventional loans. Their team was wasting hours searching through shared drives and documents, with manual escalation processes via emails and manager tags. We built a custom Slack bot using RAG technology—underwriters ask questions in plain English and get instant answers from internal documents, with automated escalations and custom commands for advanced workflows.",
    year: "2025",
    services: ["Custom RAG Slack Bot", "Pinecone Vector Store", "OpenAI Embeddings", "Automated Escalations", "Custom Slack Commands", "Knowledge Base Integration"],
    results: ["Answer retrieval: hours to seconds", "Eliminated manual back-and-forth", "Accelerated loan processing", "Improved underwriter-manager collaboration"],
    stats: [
      { value: "200+", label: "Daily Users" },
      { value: "Seconds", label: "Answer Time" },
      { value: "24/7", label: "Availability" },
      { value: "0", label: "Manual Lookups" },
    ],
    timeline: "2 months",
    testimonial: {
      quote: "Our underwriters used to spend an hour a day just looking things up. Now they ask the bot and get answers in seconds. It's like having a senior analyst available 24/7.",
      author: "Operations Lead",
      role: "Neighbors Bank"
    },
    screenshots: [
      { src: "/portfolio/neighborsbank/slack-conversation.png", alt: "n8n Workflow", large: true },
      { src: "/portfolio/neighborsbank/slack-bot.png", alt: "Slack Bot Interface", large: true },
      { src: "/portfolio/neighborsbank/rag-pipeline.png", alt: "RAG Pipeline Architecture", large: true },
    ],
  },
  {
    title: "Happy Endings",
    slug: "happy-endings",
    category: "Operations System",
    description: "Full internal operations system for an ice cream company.",
    fullDescription: "Happy Endings was juggling multiple expensive software tools that didn't talk to each other. We built them an AI email agent and an entire internal system—orders, kitchen management, employee training, traceability and tracking, wholesale ordering, and inventory. One platform that runs their entire business. We eliminated their external software costs, and they plan to use this system as an asset when they sell the business.",
    year: "2025",
    services: ["AI Email Agent", "Order Management", "Kitchen Operations", "Employee Training Portal", "Traceability & Tracking", "Wholesale Ordering", "Inventory Management"],
    results: ["Eliminated external software costs", "Entire business runs in one system", "Asset for future business sale", "AI handles wholesale orders automatically"],
    stats: [
      { value: "100%", label: "Order Capture" },
      { value: "0", label: "Lost Orders" },
      { value: "30%", label: "Cost Reduction" },
      { value: "3", label: "Month Build" },
    ],
    timeline: "3 months",
    testimonial: {
      quote: "We went from losing orders every week to never missing one. The system just works. And it costs us less than our old software.",
      author: "Owner",
      role: "Happy Endings"
    },
    screenshots: [
      { src: "/portfolio/happyendings/hero.jpg", alt: "Happy Endings Ice Cream", large: true },
      { src: "/portfolio/happyendings/admin-dashboard.png", alt: "Admin Dashboard", large: true },
      { src: "/portfolio/happyendings/customer-portal.png", alt: "Customer Portal" },
    ],
  },
  {
    title: "Table Rock Black Lights",
    slug: "table-rock-black-lights",
    category: "E-Commerce & Automation",
    description: "Website redesign and automated order workflows.",
    fullDescription: "Table Rock Black Lights sells fishing lighting equipment but was held back by an outdated website lacking e-commerce capabilities and automated workflows. We redesigned their website with modern e-commerce functionality and built automated order workflows that handle everything from purchase to fulfillment. Now orders flow smoothly and the team spends less time on manual data entry.",
    year: "2024",
    services: ["Website Redesign", "E-Commerce Setup", "Automated Order Workflows", "Payment Integration", "Inventory Sync"],
    results: ["Modern e-commerce presence", "Automated order processing", "Reduced manual data entry", "Improved customer experience"],
    stats: [
      { value: "100%", label: "Order Automation" },
      { value: "New", label: "E-Commerce Site" },
      { value: "0", label: "Manual Entry" },
      { value: "2", label: "Month Build" },
    ],
    timeline: "2 months",
    testimonial: null,
    screenshots: [],
  },
]

export default function ProjectPage() {
  const params = useParams()
  const slug = params.slug as string
  const projectIndex = projects.findIndex((p) => p.slug === slug)
  const project = projects[projectIndex]
  const nextProject = projects[(projectIndex + 1) % projects.length]

  if (!project) {
    return (
      <div className={styles.page}>
        <div className={styles.hero}>
          <div className={styles.heroInner}>
            <h1 className={styles.title}>Project not found</h1>
            <Link href="/portfolio" className={styles.backLink}>
              <ArrowLeft size={16} />
              Back to portfolio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/portfolio" className={styles.backLink}>
            <ArrowLeft size={16} />
            Back to portfolio
          </Link>

          <div className={styles.meta}>
            <span className={styles.category}>{project.category}</span>
            <span className={styles.divider}>·</span>
            <span className={styles.timeline}>{project.timeline}</span>
          </div>

          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.tagline}>{project.description}</p>
        </div>
      </div>

      {/* Screenshot Hero */}
      <div className={styles.screenshotHero}>
        <div className={styles.screenshotWrapper}>
          {project.screenshots.length > 0 ? (
            <img
              src={project.screenshots[0].src}
              alt={project.screenshots[0].alt}
              className={styles.screenshotImage}
            />
          ) : (
            <div className={styles.screenshotPlaceholder}>
              <div className={styles.placeholderContent}>
                <div className={styles.placeholderIcon}>
                  <Monitor size={48} color="#333" />
                </div>
                <p className={styles.placeholderText}>Project screenshot coming soon</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Challenge */}
        <div className={styles.section}>
          <p className={styles.sectionLabel}>The Challenge</p>
          <p className={styles.challengeText}>{project.fullDescription}</p>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          {project.stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* What We Built / Results */}
        <div className={styles.twoColumn}>
          <div>
            <h3 className={styles.columnTitle}>What We Built</h3>
            <ul className={styles.list}>
              {project.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.columnTitle}>Results</h3>
            <ul className={styles.list}>
              {project.results.map((result) => (
                <li key={result}>{result}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Gallery */}
      {project.screenshots.length > 1 && (
        <div className={styles.gallery}>
          <div className={styles.galleryGrid}>
            {project.screenshots.slice(1).map((screenshot, index) => (
              <div
                key={index}
                className={`${styles.galleryItem} ${screenshot.large ? styles.large : ''}`}
              >
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  className={styles.galleryImage}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonial */}
      {project.testimonial && (
        <div className={styles.testimonial}>
          <div className={styles.quoteIcon}>"</div>
          <p className={styles.quoteText}>{project.testimonial.quote}</p>
          <p className={styles.quoteAuthor}>
            <strong>{project.testimonial.author}</strong> — {project.testimonial.role}
          </p>
        </div>
      )}

      {/* CTA */}
      <div className={styles.cta}>
        <h2 className={styles.ctaTitle}>Want results like this?</h2>
        <p className={styles.ctaSubtitle}>Let's talk about what we can build for your business.</p>
        <Link href="/#book" className={styles.ctaButton}>
          Book a call
        </Link>
      </div>

      {/* Next Project */}
      <div className={styles.nextProject}>
        <p className={styles.nextLabel}>Next Project</p>
        <Link href={`/portfolio/${nextProject.slug}`} className={styles.nextLink}>
          {nextProject.title}
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  )
}
