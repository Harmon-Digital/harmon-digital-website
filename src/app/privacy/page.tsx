'use client'

import Link from 'next/link'
import styles from './legal.module.css'

export default function PrivacyPolicy() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          &larr; Back to home
        </Link>

        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last updated: January 2025</p>

        <div className={styles.content}>
          <section>
            <h2>Introduction</h2>
            <p>
              Harmon Digital ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2>Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Contact Information:</strong> Name, email address, company name, and website URL when you submit our contact form or book a call.</li>
              <li><strong>Business Information:</strong> Information about your business stage and project requirements that you voluntarily provide.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and referring sources.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies.</li>
            </ul>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your inquiries and provide our services</li>
              <li>Schedule and conduct discovery calls</li>
              <li>Send relevant communications about our services</li>
              <li>Improve our website and user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2>Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share your information with:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> Third-party tools we use to operate our business (e.g., scheduling software, email services).</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
            </ul>
          </section>

          <section>
            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2>Cookies</h2>
            <p>
              We use cookies to improve your browsing experience and analyze website traffic. You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2>Third-Party Services</h2>
            <p>
              Our website may contain links to third-party websites or integrate with third-party services (such as Cal.com for scheduling). These services have their own privacy policies, and we encourage you to review them.
            </p>
          </section>

          <section>
            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our data practices, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> hello@harmon-digital.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
