'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './ConfirmedPage.module.css'

const clientLogosTop = Array.from({ length: 7 }, (_, i) => `/clients/${i + 1}.png`)
const clientLogosBottom = Array.from({ length: 6 }, (_, i) => `/clients/${i + 8}.png`)

export function ConfirmedPage() {
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

            <h1 className={styles.headline}>Before We Talk, Read This.</h1>

            <p className={styles.subtitle}>
              Here&apos;s exactly how we work — and what happens between this call and having AI run your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How We Work */}
      <div className={styles.howSection}>
        <div className={styles.howSectionInner}>
          <span className={styles.sectionLabel}>Our Process</span>
          <h2 className={styles.howHeadline}>We build the foundation for AI to run your business.</h2>
          <p className={styles.howSubtitle}>
            Every step is designed to get you from messy manual processes to an AI-powered business that runs itself.
          </p>

          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span>1</span>
                <div className={styles.stepLine} />
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>We learn your business</h3>
                <p className={styles.stepDesc}>
                  On this call, we&apos;ll walk through how your team
                  actually works — your departments, your tools,
                  your bottlenecks. We listen before we build.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span>2</span>
                <div className={styles.stepLine} />
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>We audit your tech stack</h3>
                <p className={styles.stepDesc}>
                  We map every tool you&apos;re paying for, every workflow
                  your team touches, and every gap between them.
                  You&apos;ll see exactly where time and money are leaking.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span>3</span>
                <div className={styles.stepLine} />
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>We rebuild and replace</h3>
                <p className={styles.stepDesc}>
                  Where off-the-shelf tools fall short, we build custom
                  software. One unified platform — your Work OS —
                  that connects everything your team does.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span>4</span>
                <div className={styles.stepLine} />
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>We automate the foundation</h3>
                <p className={styles.stepDesc}>
                  Before AI, we get the plumbing right. Data flows
                  between tools automatically. Follow-ups, reporting,
                  handoffs — all running without your team touching them.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span>5</span>
                <div className={styles.stepLine} />
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>We deploy AI to run your business</h3>
                <p className={styles.stepDesc}>
                  Once the foundation is solid, we layer in AI agents
                  that handle the real work — email, customer service,
                  invoicing, scheduling. Your business runs itself.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span>6</span>
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>We train your team and stick around</h3>
                <p className={styles.stepDesc}>
                  We don&apos;t hand you software and disappear. We train
                  every person on your team, make sure it works in
                  the real world — and keep improving it every month.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem */}
      <div className={styles.whySection}>
        <div className={styles.whySectionInner}>
          <div className={styles.whyHeader}>
            <span className={styles.sectionLabel}>The Problem</span>
            <h2 className={styles.whyHeadline}>
              Right now, your business runs on a patchwork of disconnected tools.
            </h2>
            <p className={styles.whySubtitle}>
              Your team is the bridge between them — manually moving data, following up, updating spreadsheets, chasing status updates. It works, but it doesn&apos;t scale.
            </p>
          </div>

          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3 className={styles.benefitTitle}>Copy-pasting between 5+ apps</h3>
              <p className={styles.benefitDesc}>
                Your team manually moves data between
                Gmail, HubSpot, QuickBooks, Slack, and
                more. That&apos;s not scaling — that&apos;s surviving.
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h3 className={styles.benefitTitle}>Leads slipping through cracks</h3>
              <p className={styles.benefitDesc}>
                Someone forgot to follow up. The spreadsheet
                didn&apos;t update. The lead went cold. It happens
                every day in businesses like yours.
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3 className={styles.benefitTitle}>No visibility into what works</h3>
              <p className={styles.benefitDesc}>
                Your CRM doesn&apos;t know what your accounting
                software knows. So you don&apos;t know what&apos;s
                broken until it explodes.
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <h3 className={styles.benefitTitle}>Growth = more headcount</h3>
              <p className={styles.benefitDesc}>
                Right now, the only way to handle more is
                to hire more people. That&apos;s the most
                expensive way to scale.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Solution */}
      <div className={styles.servicesSection}>
        <div className={styles.servicesSectionInner}>
          <h2 className={styles.servicesHeadline}>What a Custom Work OS looks like.</h2>
          <p className={styles.servicesSubtitle}>
            One platform. Every department connected. AI agents handling the work no one should be doing — so your team can focus on what actually grows revenue.
          </p>

          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              </div>
              <h3 className={styles.benefitTitle}>Sales: leads followed automatically</h3>
              <p className={styles.benefitDesc}>
                Every inbound lead gets an instant response.
                Follow-ups happen without anyone thinking
                about it. Nothing falls through.
              </p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <h3 className={styles.benefitTitle}>Support: tickets routed instantly</h3>
              <p className={styles.benefitDesc}>
                Customer queries get answered, categorized,
                and routed to the right person — without
                a human triaging every request.
              </p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3 className={styles.benefitTitle}>Finance: invoices and expenses on autopilot</h3>
              <p className={styles.benefitDesc}>
                Invoices send themselves. Expenses get logged.
                Reconciliation happens without someone sitting
                in a spreadsheet for hours.
              </p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              </div>
              <h3 className={styles.benefitTitle}>Ops: tasks, reports, status updates</h3>
              <p className={styles.benefitDesc}>
                Project status updates, team check-ins,
                and reporting — all automated. One dashboard
                for the entire business.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className={styles.guaranteeSection}>
        <div className={styles.guaranteeSectionInner}>
          <p className={styles.guaranteeText}>
            &ldquo;Isaac and the Harmon Digital team have been a game changer for ProducifyX. Before working with them, we were buried in manual processes and spending way too much time on things that should have been automated. Isaac came in, mapped out our workflows, and built us a custom platform that handles what used to take hours. The time savings alone have been huge, but what really stands out is how much smoother everything runs now. Our team can actually focus on growing the business instead of putting out fires.&rdquo;
          </p>
          <p className={styles.guaranteeTagline}>George Zimny, Co-Founder, ProducifyX</p>
        </div>
      </div>

      {/* CTA */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaHeadline}>Let us know you read this.</h2>
          <p className={styles.ctaSubtitle}>
            Send us a quick email saying you&apos;re ready to meet so we know you&apos;re prepped and coming to the call.
          </p>
          <a
            href="mailto:meet@harmon-digital.com?subject=Ready%20to%20meet&body=I'm%20ready%20to%20meet."
            className={styles.ctaBtn}
          >
            Send &ldquo;Ready to meet&rdquo; email
          </a>
        </div>
      </div>

      {/* Logos */}
      <div className={styles.trustSection}>
        <div className={styles.trustInner}>
          <p className={styles.trustLabel}>We&apos;ve helped others like</p>
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
          <p className={styles.faqSubtitle}>Everything you need to know before we talk.</p>

          <div className={styles.faqList}>
            <div className={styles.faqItem}>
              <button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}>
                <span>What&apos;s the point of this call?</span>
                <span className={`${styles.faqIcon} ${openFaq === 0 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 0 ? styles.faqAnswerOpen : ''}`}>
                <p>We learn your business. We&apos;ll walk through your departments, tools, and daily workflows. By the end, you&apos;ll know exactly where time is being wasted — and what can be automated.</p>
              </div>
            </div>
            <div className={styles.faqItem}>
              <button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}>
                <span>How long until we see results?</span>
                <span className={`${styles.faqIcon} ${openFaq === 1 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 1 ? styles.faqAnswerOpen : ''}`}>
                <p>Most clients are live in 4–8 weeks. Some automations take days. We&apos;ll give you a clear timeline on the first call — no vague estimates.</p>
              </div>
            </div>
            <div className={styles.faqItem}>
              <button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}>
                <span>What if it doesn&apos;t work?</span>
                <span className={`${styles.faqIcon} ${openFaq === 2 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 2 ? styles.faqAnswerOpen : ''}`}>
                <p>We build in sprints and show you working software along the way — not a big reveal at the end. If something isn&apos;t right, we fix it before you&apos;ve paid for a finished product.</p>
              </div>
            </div>
            <div className={styles.faqItem}>
              <button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}>
                <span>What does it cost?</span>
                <span className={`${styles.faqIcon} ${openFaq === 3 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 3 ? styles.faqAnswerOpen : ''}`}>
                <p>It depends on what you need — that&apos;s the honest answer. But we&apos;ll tell you on the first call, not after 3 meetings. No generic proposals, no surprise invoices. You&apos;ll know the number before we start.</p>
              </div>
            </div>
            <div className={styles.faqItem}>
              <button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}>
                <span>Who is this NOT for?</span>
                <span className={`${styles.faqIcon} ${openFaq === 4 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 4 ? styles.faqAnswerOpen : ''}`}>
                <p>If your business doesn&apos;t have repeatable processes yet, we&apos;re not the right fit — you need to figure out what works before you automate it. But if your team is doing the same manual work every day and you know there&apos;s a better way, that&apos;s exactly what we fix.</p>
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
