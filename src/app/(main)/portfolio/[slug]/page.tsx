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
    heroImage: "/portfolio/mikesfences-hero.jpg",
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
    title: "SunMed Growers",
    slug: "sunmed-growers",
    category: "Custom Software",
    heroImage: "/portfolio/sunmed-hero.jpg",
    description: "Custom investor tracker and document management for a $20M debt round.",
    fullDescription: "SunMed Growers was raising a $20M debt round and needed a way to track investors, manage documents, and streamline the entire capital raise process. They were juggling spreadsheets, email threads, and manual document sends — a nightmare at that scale. We built a custom tracker and document sending platform that centralized investor communications, automated document distribution, and gave their team real-time visibility into the status of every investor in the pipeline.",
    year: "2025",
    services: ["Investor Tracking Platform", "Automated Document Distribution", "Pipeline Dashboard", "Status Tracking", "Investor Communications"],
    results: ["Centralized $20M raise process", "Eliminated manual document sends", "Real-time investor pipeline visibility", "Streamlined due diligence"],
    stats: [
      { value: "$20M", label: "Debt Round" },
      { value: "0", label: "Manual Doc Sends" },
      { value: "Real-Time", label: "Pipeline Tracking" },
      { value: "Custom", label: "Built to Fit" },
    ],
    timeline: "6 weeks",
    testimonial: null,
    screenshots: [],
  },
  {
    title: "Noble TeleHealth",
    slug: "noble-telehealth",
    category: "Custom Application",
    heroImage: "/portfolio/noble-hero.jpg",
    description: "Custom healthcare application that replaced manual booking and scheduling.",
    fullDescription: "Noble TeleHealth needed a custom application to replace their manual booking and scheduling process. Patients and providers were stuck in a clunky workflow that led to missed appointments, double-bookings, and hours of administrative overhead. We built a custom healthcare application that handles the entire scheduling flow — patients book directly, providers manage availability, and the system handles confirmations and reminders automatically.",
    year: "2025",
    services: ["Custom Booking Application", "Provider Scheduling", "Patient Portal", "Automated Reminders", "Calendar Integration"],
    results: ["Eliminated manual scheduling", "Zero double-bookings", "Reduced admin overhead", "Improved patient experience"],
    stats: [
      { value: "0", label: "Double Bookings" },
      { value: "100%", label: "Automated Scheduling" },
      { value: "Custom", label: "Healthcare App" },
      { value: "24/7", label: "Patient Booking" },
    ],
    timeline: "8 weeks",
    testimonial: null,
    screenshots: [],
  },
  {
    title: "Neighbors Bank",
    slug: "neighbors-bank",
    category: "AI Agent",
    heroImage: "/portfolio/neighborsbank-hero.jpg",
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
    screenshots: [],
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
    title: "Flume Internet",
    slug: "flume-internet",
    category: "Custom CRM",
    heroImage: "/portfolio/flume-hero.jpg",
    description: "Custom CRM for a growing internet service provider.",
    fullDescription: "Flume Internet was managing their entire customer pipeline and operations manually — spreadsheets, email threads, and disconnected tools. We built them a custom CRM on Airtable and n8n that handles the full customer lifecycle: lead tracking, pipeline management, customer onboarding, support tickets, and automated follow-ups. Everything connected, nothing falling through the cracks.",
    year: "2025",
    services: ["Custom Airtable CRM", "n8n Automation", "Pipeline Management", "Customer Onboarding Workflows", "Automated Follow-ups", "Reporting Dashboard"],
    results: ["Full pipeline visibility", "Eliminated manual tracking", "Automated customer onboarding", "Connected all operations in one system"],
    stats: [
      { value: "1", label: "Centralized CRM" },
      { value: "0", label: "Manual Tracking" },
      { value: "100%", label: "Pipeline Visibility" },
      { value: "Custom", label: "Built to Fit" },
    ],
    timeline: "4 weeks",
    testimonial: null,
    screenshots: [],
  },
  {
    title: "Unstack",
    slug: "unstack",
    category: "SaaS Product",
    heroImage: "/portfolio/unstack-hero.jpg",
    description: "AI-powered business operations platform built by Harmon Digital.",
    fullDescription: "Unstack is a SaaS product built and operated by Harmon Digital. It's an AI-powered business operations platform that gives each organization its own workspace — complete with AI agents, workflow automation, and custom tools. Built from the ground up as a productized version of the systems we build for clients. Organizations get their own subdomain and a fully managed AI-enabled environment to run their operations.",
    year: "2025",
    services: ["Full-Stack SaaS Development", "AI Agent Infrastructure", "Multi-Tenant Architecture", "Organization Management", "Marketplace", "Custom Workspace Builder"],
    results: ["Multiple organizations onboarded", "AI-powered operations for each client", "Fully productized platform", "Recurring SaaS revenue"],
    stats: [
      { value: "10+", label: "Organizations" },
      { value: "AI", label: "Powered" },
      { value: "SaaS", label: "Product" },
      { value: "Live", label: "Platform" },
    ],
    timeline: "Ongoing",
    testimonial: null,
    screenshots: [],
  },
  {
    title: "ProducifyX",
    slug: "producifyx",
    category: "Custom Software",
    description: "Custom platform replacing hours of manual work with automated workflows.",
    fullDescription: "ProducifyX was buried in manual processes and spending way too much time on things that should have been automated. We mapped out their workflows and built a custom platform that handles what used to take hours. The time savings alone have been huge, but what really stands out is how much smoother everything runs now. Their team can actually focus on growing the business instead of putting out fires.",
    year: "2025",
    services: ["Custom Platform", "Workflow Automation", "Centralized Dashboard", "Process Mapping", "Team Onboarding"],
    results: ["Hours of manual work eliminated", "All workflows centralized", "Team focused on growth", "Smoother day-to-day operations"],
    stats: [
      { value: "5-8", label: "Hrs Saved/Week" },
      { value: "100%", label: "Workflows Automated" },
      { value: "1", label: "Platform" },
      { value: "Custom", label: "Built to Fit" },
    ],
    timeline: "6 weeks",
    testimonial: {
      quote: "Isaac and the Harmon Digital team have been a game changer for ProducifyX. Before working with them, we were buried in manual processes and spending way too much time on things that should have been automated. Isaac came in, mapped out our workflows, and built us a custom platform that handles what used to take hours. The time savings alone have been huge, but what really stands out is how much smoother everything runs now. Our team can actually focus on growing the business instead of putting out fires. If you're a business owner who feels like you're doing too much yourself, talk to Isaac. He'll find where you're wasting time and fix it.",
      author: "George Zimny",
      role: "Co-Founder, ProducifyX"
    },
    video: "/testimonial-producifyx.mp4",
    videoPoster: "/testimonial-poster.jpg",
    screenshots: [
      { src: "/portfolio/producifyx/hero.jpg", alt: "ProducifyX Platform", large: true },
      { src: "/portfolio/producifyx/admin-dashboard.png", alt: "Admin Dashboard", large: true },
      { src: "/portfolio/producifyx/admin-overview.png", alt: "Admin Overview" },
    ],
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
          ) : project.heroImage ? (
            <img
              src={project.heroImage}
              alt={project.title}
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

        {/* Video Testimonial */}
        {project.video && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '48px 0' }}>
            <video
              controls
              preload="metadata"
              playsInline
              poster={project.videoPoster}
              style={{ width: '100%', maxWidth: '640px', borderRadius: '12px', background: '#111' }}
            >
              <source src={project.video} type="video/mp4" />
            </video>
          </div>
        )}

        {/* Testimonial */}
        {project.testimonial && (
          <div style={{ margin: '48px 0', padding: '32px', background: '#141414', borderRadius: '12px' }}>
            <p style={{ fontSize: '17px', lineHeight: 1.7, color: '#ccc', margin: '0 0 16px 0', fontStyle: 'italic' }}>
              &ldquo;{project.testimonial.quote}&rdquo;
            </p>
            <p style={{ fontSize: '14px', color: '#3959ff', fontWeight: 500, margin: 0 }}>
              {project.testimonial.author} — {project.testimonial.role}
            </p>
          </div>
        )}

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

      {/* CTA */}
      <div className={styles.cta}>
        <h2 className={styles.ctaTitle}>Want results like this?</h2>
        <p className={styles.ctaSubtitle}>Let's talk about what we can build for your business.</p>
        <Link href="/#book" className={styles.ctaButton}>
          Book my free audit
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
