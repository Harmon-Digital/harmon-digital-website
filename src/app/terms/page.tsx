'use client'

import Link from 'next/link'
import styles from '../privacy/legal.module.css'

export default function TermsOfService() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          &larr; Back to home
        </Link>

        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.lastUpdated}>Last updated: January 2025</p>

        <div className={styles.content}>
          <section>
            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using the Harmon Digital website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2>Services</h2>
            <p>
              Harmon Digital provides custom software development, automation, and AI solutions for businesses. Our services include but are not limited to:
            </p>
            <ul>
              <li>Custom internal software and portals</li>
              <li>Workflow automation</li>
              <li>AI agents and integrations</li>
              <li>System integrations</li>
              <li>Ongoing maintenance and support</li>
            </ul>
            <p>
              Specific deliverables, timelines, and pricing are defined in individual project agreements.
            </p>
          </section>

          <section>
            <h2>Client Responsibilities</h2>
            <p>As a client, you agree to:</p>
            <ul>
              <li>Provide accurate and complete information about your business and requirements</li>
              <li>Respond to requests for feedback and approvals in a timely manner</li>
              <li>Ensure you have the rights to any content or data you provide to us</li>
              <li>Pay invoices according to agreed-upon terms</li>
              <li>Use delivered software in accordance with applicable laws</li>
            </ul>
          </section>

          <section>
            <h2>Intellectual Property</h2>
            <p>
              Upon full payment, clients receive ownership of custom code and deliverables created specifically for their project. Harmon Digital retains the right to use general knowledge, techniques, and non-proprietary components in future projects.
            </p>
            <p>
              Third-party tools, libraries, and integrations remain subject to their respective licenses.
            </p>
          </section>

          <section>
            <h2>Confidentiality</h2>
            <p>
              We treat all client information as confidential. We will not share your business information, processes, or data with third parties except as necessary to provide our services or as required by law.
            </p>
          </section>

          <section>
            <h2>Payment Terms</h2>
            <p>
              Payment terms are specified in individual project agreements. Standard terms include:
            </p>
            <ul>
              <li>Monthly subscription fees are billed at the beginning of each month</li>
              <li>Invoices are due within 15 days of receipt</li>
              <li>Late payments may result in service suspension</li>
            </ul>
          </section>

          <section>
            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Harmon Digital shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
            </p>
            <p>
              Our total liability for any claim arising from our services shall not exceed the amount paid by you for the services in the twelve months preceding the claim.
            </p>
          </section>

          <section>
            <h2>Warranties and Disclaimers</h2>
            <p>
              We warrant that our services will be performed in a professional and workmanlike manner. We do not guarantee specific business outcomes, revenue increases, or time savings.
            </p>
            <p>
              Our website and informational content are provided "as is" without warranties of any kind.
            </p>
          </section>

          <section>
            <h2>Termination</h2>
            <p>
              Either party may terminate a service agreement with 30 days written notice. Upon termination:
            </p>
            <ul>
              <li>All outstanding payments become due</li>
              <li>We will provide reasonable transition assistance</li>
              <li>You retain ownership of completed, paid-for deliverables</li>
            </ul>
          </section>

          <section>
            <h2>Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify existing clients of material changes. Continued use of our services after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              For questions about these terms, please contact us at:
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
