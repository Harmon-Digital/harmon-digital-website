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
    title: "Table Rock Black Lights",
    slug: "table-rock-black-lights",
    category: "E-Commerce & Automation",
    description: "Website redesign and automated order workflows for a fishing lighting company. Modernized e-commerce with streamlined operations.",
    year: "2024",
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
          Systems we've built.<br />
          Businesses transformed.
        </h1>
        <p className={styles.subtitle}>
          Real projects for real businesses. Each one designed to let the owner step back.
        </p>
      </div>

      <div className={styles.portfolioSection}>
        {/* Project List */}
        <div className={styles.projectList}>
          {projects.map((project, index) => (
            <Link
              key={project.title}
              href={`/portfolio/${project.slug}`}
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
            </Link>
          ))}
          <div className={styles.projectListBorder} />
        </div>
      </div>

      <div className={styles.cta}>
        <h2 className={styles.ctaTitle}>Ready to systematize your business?</h2>
        <p className={styles.ctaSubtitle}>Book a call and we'll show you what's possible.</p>
        <Link href="/#book" className={styles.ctaButton}>
          Book a call
        </Link>
      </div>
    </div>
  )
}
