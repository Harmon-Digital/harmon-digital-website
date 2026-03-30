'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import styles from './portfolio.module.css'

const projects = [
  {
    title: "Mike's Fences",
    slug: "mikes-fences",
    category: "AI Agent",
    description: "Custom appointment setting agent for a custom wood fence company. Handles inbound leads, qualifies prospects, and schedules estimates automatically.",
    year: "2025",
    logo: null,
  },
  {
    title: "Hoplite Capital / Etto Leisure Carts",
    slug: "hoplite-capital",
    category: "Database & Automation",
    description: "Custom work software for a multi-location golf cart dealership. Airtable, Make.com, Shopmonkey & QuickBooks all connected.",
    year: "2025",
    logo: "/clients/2.png",
  },
  {
    title: "SunMed Growers",
    slug: "sunmed-growers",
    category: "Custom Software",
    description: "Custom investor tracker and document management platform for a $20M debt round.",
    year: "2025",
    logo: null,
  },
  {
    title: "Noble TeleHealth",
    slug: "noble-telehealth",
    category: "Custom Application",
    description: "Custom healthcare application that replaced manual booking and scheduling with an automated patient portal.",
    year: "2025",
    logo: null,
  },
  {
    title: "Neighbors Bank",
    slug: "neighbors-bank",
    category: "AI Agent",
    description: "RAG-powered Slack bot for 50+ underwriters. Instant answers from internal docs, automated escalations, hours of lookup time eliminated.",
    year: "2025",
    logo: "/clients/6.png",
  },
  {
    title: "Happy Endings",
    slug: "happy-endings",
    category: "Operations System",
    description: "AI email agent and full internal system—orders, kitchen, training, traceability, wholesale, and inventory. Their entire business runs in one platform.",
    year: "2025",
    logo: "/clients/10.png",
  },
  {
    title: "Flume Internet",
    slug: "flume-internet",
    category: "Custom CRM",
    description: "Custom CRM built on Airtable and n8n for a growing internet service provider. Full pipeline tracking, customer management, and automated workflows.",
    year: "2025",
    logo: null,
  },
  {
    title: "Unstack",
    slug: "unstack",
    category: "SaaS Product",
    description: "AI-powered business operations platform built by Harmon Digital. Gives businesses their own AI-enabled workspace.",
    year: "2025",
    logo: null,
  },
  {
    title: "ProducifyX",
    slug: "producifyx",
    category: "Custom Software",
    description: "Custom platform replacing hours of manual work with automated workflows and a centralized dashboard.",
    year: "2025",
    logo: null,
  },
]

export default function PortfolioPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.label}>Our Work</span>
        <h1 className={styles.title}>
          Software we've shipped.<br />
          Results that matter.
        </h1>
        <p className={styles.subtitle}>
          Real projects for real businesses. Custom software, AI agents, and automation.
        </p>
      </div>

      <div className={styles.portfolioSection}>
        {/* Project List */}
        <div className={styles.projectList}>
          {projects.map((project, index) => {
            const Wrapper = project.slug ? Link : 'div' as any
            const wrapperProps = project.slug
              ? { href: `/portfolio/${project.slug}` }
              : {}
            return (
            <Wrapper
              key={project.title}
              {...wrapperProps}
              className={styles.projectItem}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className={styles.projectItemInner}>
                <div
                  className={styles.projectHighlight}
                  style={{ opacity: hoveredIndex === index ? 1 : 0 }}
                />

                <div className={styles.projectContent}>
                  <div className={styles.projectMain}>
                    <div className={styles.projectTitleRow}>
                      <h3 className={styles.projectTitle}>
                        <span className={styles.projectTitleText}>
                          {project.title}
                          <span
                            className={styles.projectUnderline}
                            style={{ width: hoveredIndex === index ? '100%' : '0%' }}
                          />
                        </span>
                      </h3>
                      <span className={styles.projectCategory}>{project.category}</span>
                      <ArrowUpRight
                        className={styles.projectArrow}
                        style={{
                          opacity: hoveredIndex === index ? 1 : 0,
                          transform: hoveredIndex === index
                            ? 'translate(0, 0)'
                            : 'translate(-8px, 8px)',
                        }}
                      />
                    </div>
                    <p
                      className={styles.projectDescription}
                      style={{ color: hoveredIndex === index ? 'rgba(255,255,255,0.7)' : '#888' }}
                    >
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            </Wrapper>
            )
          })}
          <div className={styles.projectListBorder} />
        </div>
      </div>

      <div className={styles.cta}>
        <h2 className={styles.ctaTitle}>Ready to build something?</h2>
        <p className={styles.ctaSubtitle}>Book my free audit and we'll show you what's possible.</p>
        <Link href="/#book" className={styles.ctaButton}>
          Book my free audit
        </Link>
      </div>
    </div>
  )
}
