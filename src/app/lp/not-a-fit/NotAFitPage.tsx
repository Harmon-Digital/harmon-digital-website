'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './NotAFitPage.module.css'

const clientLogosTop = Array.from({ length: 7 }, (_, i) => `/clients/${i + 1}.png`)
const clientLogosBottom = Array.from({ length: 6 }, (_, i) => `/clients/${i + 8}.png`)

export function NotAFitPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.logoBlock}>
              <a href="/" className={styles.logoLink}>
                <img src="/logo/icon.png" alt="Harmon Digital" className={styles.logoIcon} />
                <span>Harmon Digital</span>
              </a>
              <div className={styles.rating}>
                <div className={styles.trustpilotStars}>
                  <div className={styles.starBox}>&#9733;</div>
                  <div className={styles.starBox}>&#9733;</div>
                  <div className={styles.starBox}>&#9733;</div>
                  <div className={styles.starBox}>&#9733;</div>
                  <div className={styles.starBox}>&#9733;</div>
                </div>
                <span className={styles.ratingText}>Rated 5.0 by 10+ businesses</span>
              </div>
            </div>

            <p className={styles.logoTagline}>Custom Software, AI &amp; Automation</p>

            <h1 className={styles.headline}>You Might Not Need Us — Yet.</h1>

            <p className={styles.subtitle}>
              The truth is, you can get most of the way there with the AI tools available today. We work best with established businesses that have large teams and need a full tech stack refresh. But there&apos;s plenty you can start doing right now.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <div className={styles.whySection}>
        <div className={styles.whySectionInner}>
          <div className={styles.whyHeader}>
            <span className={styles.sectionLabel}>Who We Work With</span>
            <h2 className={styles.whyHeadline}>
              We partner with established businesses looking to modernize their entire tech stack.
            </h2>
            <p className={styles.whySubtitle}>
              Our sweet spot is teams of 10+ who have outgrown off-the-shelf tools. When your workflows are complex, your team is large, and the cost of manual work is real — that&apos;s where custom AI and automation delivers the biggest return.
            </p>
          </div>

          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className={styles.benefitTitle}>Large teams with complex workflows</h3>
              <p className={styles.benefitDesc}>
                When 10+ people are doing interconnected
                work, custom systems become the difference
                between chaos and clarity.
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                </svg>
              </div>
              <h3 className={styles.benefitTitle}>Established revenue and processes</h3>
              <p className={styles.benefitDesc}>
                Businesses that already have repeatable
                workflows and consistent revenue. That&apos;s
                the foundation automation scales on.
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <h3 className={styles.benefitTitle}>Full tech stack refresh</h3>
              <p className={styles.benefitDesc}>
                Not a patchwork of disconnected tools. We
                audit everything and build one connected
                platform that replaces what isn&apos;t working.
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </div>
              <h3 className={styles.benefitTitle}>Long-term AI integration</h3>
              <p className={styles.benefitDesc}>
                We don&apos;t just build and leave. Most clients
                stay on retainer because their AI system
                keeps improving as the business grows.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tools */}
      <div className={styles.toolsSection}>
        <div className={styles.toolsSectionInner}>
          <h2 className={styles.toolsHeadline}>What you can do on your own right now.</h2>
          <p className={styles.toolsSubtitle}>
            You don&apos;t need a custom build to start getting value from AI. These tools can take you a long way.
          </p>

          <div className={styles.toolsGrid}>
            <div className={styles.toolCard}>
              <div className={styles.toolIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                </svg>
              </div>
              <h3 className={styles.toolTitle}>Claude Code</h3>
              <p className={styles.toolDesc}>
                An AI coding agent that can build software
                for you from a description. Use it to create
                internal tools, scripts, and automations
                without hiring a developer.
              </p>
            </div>

            <div className={styles.toolCard}>
              <div className={styles.toolIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h3 className={styles.toolTitle}>Claude Co-Worker</h3>
              <p className={styles.toolDesc}>
                An AI assistant that works alongside your team.
                Use it to handle email, draft responses, summarize
                documents, and replace the repetitive thinking
                your team does every day.
              </p>
            </div>

            <div className={styles.toolCard}>
              <div className={styles.toolIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>
                </svg>
              </div>
              <h3 className={styles.toolTitle}>Unstack</h3>
              <p className={styles.toolDesc}>
                An AI-powered workspace that gives your business
                its own centralized hub — with AI agents, workflow
                automation, and custom tools all in one place.
                Built by us, available at{' '}
                <a href="https://unstack.us" target="_blank" rel="noopener noreferrer" className={styles.toolLink}>
                  unstack.us
                </a>
              </p>
            </div>
          </div>

          <p className={styles.toolNote}>
            Start here. When you&apos;re ready for the full build, come back.
          </p>
        </div>
      </div>

      {/* Logos */}
      <div className={styles.trustSection}>
        <div className={styles.trustInner}>
          <p className={styles.trustLabel}>We&apos;ve helped businesses like</p>
          <div className={styles.logoSlider}>
            <div className={styles.logoTrack}>
              {[...clientLogosTop, ...clientLogosTop, ...clientLogosTop, ...clientLogosTop, ...clientLogosTop].map((logo, index) => (
                <div key={index} className={styles.logoSlide}>
                  <img src={logo} alt="Client logo" className={styles.clientLogo} />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.logoSlider}>
            <div className={`${styles.logoTrack} ${styles.logoTrackReverse}`}>
              {[...clientLogosBottom, ...clientLogosBottom, ...clientLogosBottom, ...clientLogosBottom, ...clientLogosBottom].map((logo, index) => (
                <div key={index} className={styles.logoSlide}>
                  <img src={logo} alt="Client logo" className={styles.clientLogo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className={styles.faqSection}>
        <div className={styles.faqSectionInner}>
          <h2 className={styles.faqHeadline}>Common questions.<br />Straight answers.</h2>

          <div className={styles.faqList}>
            <div className={styles.faqItem}>
              <button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}>
                <span>Does this mean you&apos;ll never work with us?</span>
                <span className={`${styles.faqIcon} ${openFaq === 0 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 0 ? styles.faqAnswerOpen : ''}`}>
                <p>Not at all. It just means the tools available right now can probably get you most of the way there on your own. When you&apos;re ready for the full custom build, come back — we&apos;ll be here.</p>
              </div>
            </div>
            <div className={styles.faqItem}>
              <button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}>
                <span>Can I still reach out if I need something else?</span>
                <span className={`${styles.faqIcon} ${openFaq === 1 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 1 ? styles.faqAnswerOpen : ''}`}>
                <p>Absolutely. The qualification form is built around our core AI and automation work — but if you need a website or have another project in mind, just email us at info@harmon-digital.com.</p>
              </div>
            </div>
            <div className={styles.faqItem}>
              <button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}>
                <span>How will I know when I&apos;m ready for the full build?</span>
                <span className={`${styles.faqIcon} ${openFaq === 2 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 2 ? styles.faqAnswerOpen : ''}`}>
                <p>When you&apos;ve got a team that&apos;s outgrown the tools you&apos;re using, and the cost of manual work is starting to hurt — that&apos;s the moment. You&apos;ll feel it.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <a href="/" className={styles.footerLogo}>
            <img src="/logo/icon.png" alt="Harmon Digital" className={styles.footerLogoIcon} />
            <span>Harmon Digital</span>
          </a>
          <p className={styles.footerCopy}>&copy; {new Date().getFullYear()} Harmon Digital, LLC</p>
        </div>
      </footer>
    </div>
  )
}
