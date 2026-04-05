'use client'

import Link from 'next/link'
import styles from './services.module.css'

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.label}>What We Do</span>
          <h1 className={styles.headline}>
            Custom software. AI. Automation.<br />
            Whatever your business needs.
          </h1>
          <p className={styles.subtitle}>
            We don&apos;t sell products. We build solutions around how your team actually works — then stick around to make sure they keep working.
          </p>
          <a href="/#book" className={styles.ctaBtn}>Book my free audit</a>
        </div>
      </div>

      {/* Service Blocks */}
      <div className={styles.section}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionHeadline}>Custom Software & Apps</h2>
          <p className={styles.sectionSubtitle}>
            Internal tools, portals, dashboards, and apps — built from scratch for your workflows. When off-the-shelf doesn&apos;t cut it, we build exactly what you need.
          </p>
          <div className={styles.cardsGrid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              </div>
              <h3 className={styles.cardTitle}>Operations portals</h3>
              <p className={styles.cardDesc}>Centralized hubs where your team manages everything — orders, tasks, customers, inventory — in one place.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
              </div>
              <h3 className={styles.cardTitle}>Dashboards & reporting</h3>
              <p className={styles.cardDesc}>Real-time visibility into what matters. Revenue, performance, operations — all in one view.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>
              </div>
              <h3 className={styles.cardTitle}>Mobile & desktop apps</h3>
              <p className={styles.cardDesc}>Native and cross-platform apps for your team or your customers. Built for the way people actually use them.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <h3 className={styles.cardTitle}>CRM & sales tools</h3>
              <p className={styles.cardDesc}>Custom CRMs that match your sales process instead of forcing you into someone else&apos;s.</p>
            </div>
          </div>
          <a href="/#book" className={styles.sectionCta}>Book my free audit →</a>
        </div>
      </div>

      {/* AI Agents */}
      <div className={styles.section}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionHeadline}>AI Agents & Consulting</h2>
          <p className={styles.sectionSubtitle}>
            AI that actually does work — not chatbot widgets. Custom agents that handle email, customer service, scheduling, lead qualification, and more.
          </p>
          <div className={styles.cardsGrid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <h3 className={styles.cardTitle}>Email & communication</h3>
              <p className={styles.cardDesc}>Agents that read, draft, and send emails. Route messages. Follow up automatically when things go quiet.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <h3 className={styles.cardTitle}>Customer service</h3>
              <p className={styles.cardDesc}>Answer questions, process orders, handle complaints, and escalate when needed — around the clock.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h3 className={styles.cardTitle}>Lead qualification & scheduling</h3>
              <p className={styles.cardDesc}>Respond to leads instantly, qualify them, gather details, and book meetings — no phone tag.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
              <h3 className={styles.cardTitle}>Knowledge base & RAG bots</h3>
              <p className={styles.cardDesc}>AI that answers questions from your internal docs. Instant answers instead of hours of searching.</p>
            </div>
          </div>
          <a href="/#book" className={styles.sectionCta}>Book my free audit →</a>
        </div>
      </div>

      {/* Automation */}
      <div className={styles.section}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionHeadline}>Automation & Integrations</h2>
          <p className={styles.sectionSubtitle}>
            Connect the tools you already use and eliminate the manual work in between. If your team is copying data between systems, we can fix that.
          </p>
          <div className={styles.cardsGrid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <h3 className={styles.cardTitle}>Workflow automation</h3>
              <p className={styles.cardDesc}>Automate the repetitive tasks your team does every day. Data entry, approvals, notifications, handoffs.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </div>
              <h3 className={styles.cardTitle}>System integrations</h3>
              <p className={styles.cardDesc}>Make your tools talk to each other. CRM to accounting, orders to fulfillment, forms to databases.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
              </div>
              <h3 className={styles.cardTitle}>Data pipelines</h3>
              <p className={styles.cardDesc}>Move data between systems automatically. Clean it, transform it, and put it where it needs to go.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              </div>
              <h3 className={styles.cardTitle}>API development</h3>
              <p className={styles.cardDesc}>Custom APIs that connect your systems, expose your data, or power your integrations.</p>
            </div>
          </div>
          <a href="/#book" className={styles.sectionCta}>Book my free audit →</a>
        </div>
      </div>

      {/* Websites */}
      <div className={styles.section}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionHeadline}>Websites & Web Apps</h2>
          <p className={styles.sectionSubtitle}>
            Modern websites and web applications designed and built from scratch. Fast, responsive, and built to convert.
          </p>
          <div className={styles.cardsGrid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <h3 className={styles.cardTitle}>Business websites</h3>
              <p className={styles.cardDesc}>Clean, fast, professional websites that represent your brand and convert visitors into customers.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              </div>
              <h3 className={styles.cardTitle}>E-commerce</h3>
              <p className={styles.cardDesc}>Online stores with automated order processing, inventory sync, and payment integration.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </div>
              <h3 className={styles.cardTitle}>Web applications</h3>
              <p className={styles.cardDesc}>Full-featured web apps with user auth, dashboards, data management, and real-time features.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </div>
              <h3 className={styles.cardTitle}>Redesigns & SEO</h3>
              <p className={styles.cardDesc}>Modernize your existing site. Better design, faster load times, higher search rankings.</p>
            </div>
          </div>
          <a href="/#book" className={styles.sectionCta}>Book my free audit →</a>
        </div>
      </div>

      {/* CTA */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaSectionInner}>
          <h2 className={styles.ctaHeadline}>Not sure what you need?</h2>
          <p className={styles.ctaSubtitle}>Book my free audit and we&apos;ll figure it out together. No pressure, no pitch deck.</p>
          <Link href="/#book" className={styles.ctaBtn}>
            Book my free audit
          </Link>
        </div>
      </div>
    </div>
  )
}
