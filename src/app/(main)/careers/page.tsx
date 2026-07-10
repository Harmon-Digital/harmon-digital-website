import Link from 'next/link'
import type { Metadata } from 'next'
import styles from './careers.module.css'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join Harmon Digital. We build custom software and AI agents for founders who want their business to run without them in the middle of every decision.',
}

export default function CareersPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.label}>Careers</span>
        <h1 className={styles.title}>
          Come build the systems<br />
          that run the businesses of tomorrow.
        </h1>
        <p className={styles.subtitle}>
          We&apos;re a small, focused team building custom software and AI agents for founders and operators. We don&apos;t hire for seats — we hire for ownership.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Who we are.</h2>
          <p className={styles.text}>
            Harmon Digital is a custom software and AI agency based in Austin. We work with founders and operators who need to get repetitive, founder-dependent work out of their teams&apos; hands — automated, documented, and ready to hand off.
          </p>
          <p className={styles.text}>
            Our flagship build is <strong>ProducifyX Connect</strong>, a multi-tenant SaaS platform that replaced ten separate tools for a staffing agency. We&apos;ve shipped work for PE portcos, private banks, telehealth companies, food brands, and more.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>What we look for.</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueItem}>
              <h3 className={styles.valueItemTitle}>You ship</h3>
              <p className={styles.valueItemDesc}>
                We measure progress in things that work, not tickets closed. We want people who default to shipping and iterating rather than planning forever.
              </p>
            </div>
            <div className={styles.valueItem}>
              <h3 className={styles.valueItemTitle}>You care about the operator</h3>
              <p className={styles.valueItemDesc}>
                We build for people who run real businesses. That means understanding the messy operational reality, not just the technical spec.
              </p>
            </div>
            <div className={styles.valueItem}>
              <h3 className={styles.valueItemTitle}>You own outcomes</h3>
              <p className={styles.valueItemDesc}>
                Small team, no layers. If you take on a project, you own it end to end — scoping, building, shipping, and making sure it keeps working after launch.
              </p>
            </div>
            <div className={styles.valueItem}>
              <h3 className={styles.valueItemTitle}>You&apos;re curious about AI</h3>
              <p className={styles.valueItemDesc}>
                We build AI into almost every project now. You don&apos;t need to be an ML researcher, but you should be fluent in what modern AI models can and can&apos;t do.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>How we work.</h2>
          <p className={styles.text}>
            Fully remote, Austin-optional. We keep the team small on purpose. Direct work with founders and operators — no account managers, no layers. You&apos;ll ship code, run calls, and see the impact of your work show up in someone&apos;s business within weeks.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Open roles.</h2>
          <p className={styles.text}>
            We don&apos;t always have open roles posted, but we&apos;re always open to hearing from builders who&apos;d be a fit. If you&apos;re a full-stack engineer, an AI/agent builder, or a designer who ships, we want to meet you.
          </p>
        </div>

        <div className={styles.cta}>
          <h2 className={styles.ctaTitle}>Interested?</h2>
          <p className={styles.ctaSubtitle}>Send us a note. Tell us what you&apos;ve built.</p>
          <Link href="mailto:isaac@harmon-digital.com?subject=Careers" className={styles.ctaButton}>
            Get in touch
          </Link>
        </div>
      </div>

      <div className={styles.poweredBy}>
        <span className={styles.poweredByLabel}>Powered by</span>
        <img
          src="/producifyx/producifyx-logo.png"
          alt="ProducifyX"
          className={styles.poweredByLogo}
        />
      </div>
    </div>
  )
}
