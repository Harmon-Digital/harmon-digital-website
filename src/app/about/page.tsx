import Link from 'next/link'
import styles from './about.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Harmon Digital is a software and AI agency based in Austin, TX. We build custom software, AI agents, and automation so founders can focus on scaling.',
}

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.label}>About Us</span>
        <h1 className={styles.title}>
          We build the systems<br />
          that let your business run itself.
        </h1>
        <p className={styles.subtitle}>
          We don&apos;t replace your team — we give them leverage. Custom AI tools and automation that handle the repetitive work, so your people can focus on what they&apos;re actually good at. No bottlenecks. No busywork. Just scale.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.photoSection}>
          <img
            src="/about-isaac.jpeg"
            alt="Harmon Digital team"
            className={styles.photo}
          />
        </div>

        <div className={styles.bio}>
          <p className={styles.bioText}>
            <strong>Most founders are stuck doing work that doesn&apos;t scale.</strong> Managing spreadsheets, copying data between tools, answering the same emails, chasing down status updates. It&apos;s the stuff that keeps the lights on but doesn&apos;t move the business forward.
          </p>
          <p className={styles.bioText}>
            We build AI-enabled work software and tools so that work can truly be automated. Custom platforms, AI agents, and integrations that handle the repetitive stuff — so founders and their teams can focus on scaling, selling, and building something bigger.
          </p>
          <p className={styles.bioText}>
            We&apos;re not a massive agency. We&apos;re a focused team that works directly with founders and operators. No layers of account managers. No generic playbooks. We learn your business, build what fits, and stick around to make sure it keeps working.
          </p>
          <p className={styles.bioText}>
            Based in Austin and working out of Capital Factory, we&apos;ve helped businesses across industries — from golf cart dealerships to national mortgage lenders — eliminate manual work and build systems that run without constant attention.
          </p>
        </div>

        <div className={styles.valuesSection}>
          <h2 className={styles.valuesTitle}>How we work.</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueItem}>
              <h3 className={styles.valueItemTitle}>Build for the real workflow</h3>
              <p className={styles.valueItemDesc}>
                We don&apos;t build from a template and hope it fits. We learn how your team actually works, then design around that.
              </p>
            </div>
            <div className={styles.valueItem}>
              <h3 className={styles.valueItemTitle}>Ship fast, iterate often</h3>
              <p className={styles.valueItemDesc}>
                Most projects launch in weeks, not months. We get something working in your hands quickly, then refine based on real usage.
              </p>
            </div>
            <div className={styles.valueItem}>
              <h3 className={styles.valueItemTitle}>Stay in the loop</h3>
              <p className={styles.valueItemDesc}>
                You&apos;ll always know what we&apos;re working on and why. No disappearing for weeks. No surprises at the end.
              </p>
            </div>
            <div className={styles.valueItem}>
              <h3 className={styles.valueItemTitle}>Stick around</h3>
              <p className={styles.valueItemDesc}>
                We don&apos;t build it and walk away. Most clients keep us on retainer for ongoing improvements, new features, and support.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cta}>
        <h2 className={styles.ctaTitle}>Want to work together?</h2>
        <p className={styles.ctaSubtitle}>Book my free audit and let&apos;s talk about what you&apos;re building.</p>
        <Link href="/#book" className={styles.ctaButton}>
          Book my free audit
        </Link>
      </div>
    </div>
  )
}
