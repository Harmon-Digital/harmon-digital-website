'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import styles from './LandingPage.module.css'
import { trackMetaEvent } from '@/components/analytics/MetaPixel'

const clientLogosTop = Array.from({ length: 7 }, (_, i) => `/clients/${i + 1}.png`)
const clientLogosBottom = Array.from({ length: 6 }, (_, i) => `/clients/${i + 8}.png`)

const stats = [
  { metric: "$0", label: "down to get started with financing" },
  { metric: "4-8 Wks", label: "average time to launch" },
  { metric: "3-5x", label: "ROI in the first year" },
  { metric: "100%", label: "of clients stay on retainer" },
]

// Cal.com embed component
function CalEmbed({ onBooked, formData }: { onBooked: () => void; formData: Record<string, string> }) {
  const calRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Store callback on window so inline script can access it
    // @ts-ignore
    window.__lpCalBooked = () => {
      trackMetaEvent('Schedule', {
        content_name: 'Landing Page Cal Booking',
        content_category: 'Contact',
      })
      onBooked()
    }

    const lookingForLabels: Record<string, string> = {
      'ai': 'AI Agents or AI Consulting',
      'automate': 'Automate Existing Processes',
      'build': 'Custom Software or App',
      'website': 'Website or Web App',
      'consulting': 'Not Sure — Just Want to Talk',
    }
    const manualHoursLabels: Record<string, string> = {
      '0-5': '0-5 hrs/wk', '5-15': '5-15 hrs/wk', '15-30': '15-30 hrs/wk',
      '30+': '30+ hrs/wk', 'unsure': 'Unsure',
    }
    const revenueLabels: Record<string, string> = {
      '0-10k': '<$10K/mo', '10-50k': '$10-50K/mo', '50-200k': '$50-200K/mo', '200k+': '$200K+/mo',
    }

    const notesLines = [
      `Looking for: ${lookingForLabels[formData.lookingFor] || formData.lookingFor}`,
      formData.needs ? `Needs: ${formData.needs}` : '',
      `Manual hours: ${manualHoursLabels[formData.manualHours] || formData.manualHours}`,
      `Revenue: ${revenueLabels[formData.monthlyRevenue] || formData.monthlyRevenue}`,
      `Credit score: ${formData.creditScore}`,
    ].filter(Boolean).join('\n')

    const prefill = {
      name: formData.name || '',
      email: formData.email || '',
      smsReminderNumber: formData.phone || '',
      notes: notesLines,
    }

    // @ts-ignore
    if (window.Cal) {
      // @ts-ignore
      window.Cal.ns["15min"]("inline", {
        elementOrSelector: "#lp-cal-inline-15min",
        config: { layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "light", prefill },
        calLink: "harmon-digital/15min",
      })
      // @ts-ignore
      window.Cal.ns["15min"]("on", {
        action: "bookingSuccessful",
        // @ts-ignore
        callback: () => window.__lpCalBooked()
      })
    } else {
      const script = document.createElement('script')
      script.innerHTML = `
        (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
        Cal("init", "15min", {origin:"https://app.cal.com"});
        Cal.ns["15min"]("inline", {
          elementOrSelector:"#lp-cal-inline-15min",
          config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light","prefill":${JSON.stringify(prefill)}},
          calLink: "harmon-digital/15min",
        });
        Cal.ns["15min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
        Cal.ns["15min"]("on", {
          action: "bookingSuccessful",
          callback: function() {
            if (window.__lpCalBooked) window.__lpCalBooked();
          }
        });
      `
      document.body.appendChild(script)
    }
  }, [onBooked, formData])

  return (
    <div className={styles.calFullScreen}>
      <p className={styles.qualifiedMessage}>Great! Pick a time that works for you.</p>
      <div
        ref={calRef}
        style={{ width: '100%', height: '100%', overflow: 'auto' }}
        id="lp-cal-inline-15min"
      />
    </div>
  )
}

export function LandingPage() {
  const router = useRouter()
  // Steps: 1 = looking for, 2 = contact info, 3 = needs, 4 = manual hours, 5 = revenue, 6 = financing → 7 = cal, 8 = rejected
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({
    lookingFor: '',
    name: '',
    email: '',
    phone: '',
    needs: '',
    manualHours: '',
    monthlyRevenue: '',
    creditScore: '',
    honeypot: '',
  })

  const saveLead = async (step: number, data: typeof formData, status = 'partial') => {
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          lastCompletedStep: step,
          status,
        }),
      })
    } catch (error) {
      console.error('Failed to save lead:', error)
    }
  }

  const handleNext = () => {
    const nextStep = formStep + 1
    // Auto-save after step 2 (we now have email+phone) and every step after
    if (formStep >= 2 && formData.email) {
      saveLead(formStep, formData)
    }
    setFormStep(nextStep)
  }

  const handleBack = () => {
    setFormStep((s) => s - 1)
  }

  const handleSubmit = async () => {
    // Honeypot check
    if (formData.honeypot) {
      setFormStep(8)
      return
    }

    const isNotAFit = formData.monthlyRevenue === 'pre-revenue'
    const status = isNotAFit ? 'not-a-fit' : 'submitted'

    // Save final lead data
    saveLead(6, formData, status)

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
    } catch (error) {
      console.error('Failed to submit form:', error)
    }

    trackMetaEvent('Lead', {
      content_name: 'Landing Page Contact Form',
      content_category: 'Contact',
    })

    // Qualification filter: pre-revenue businesses don't have processes to automate yet
    if (isNotAFit) {
      router.push('/lp/not-a-fit')
      return
    }

    setFormStep(7)
  }

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

            <h1 className={styles.headline}>
              We Build The AI Foundation Your Business Is Missing.
            </h1>

            <a href="#form" className={styles.heroCta}>
              Get My Free Audit
            </a>

            <div className={styles.trust}>
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
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className={styles.formSection} id="form">
        <div className={styles.formSectionInner}>
          {formStep <= 6 && (
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${(formStep / 6) * 100}%` }} />
            </div>
          )}
          {/* Honeypot */}
          <input
            type="text"
            name="website_url"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Step 1: What do you need? */}
          {formStep === 1 && (
            <div className={styles.qualifyForm}>
              <h2 className={styles.formHeadline}>What are you looking for?</h2>
              <p className={styles.formSubtitle}>Pick the one that best describes your need.</p>
              <div className={styles.optionGrid}>
                {[
                  { value: 'ai', label: 'AI Agents or AI Consulting', key: 'A', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><path d="M20 21v-2a4 4 0 0 0-3-3.87"/><path d="M4 21v-2a4 4 0 0 1 3-3.87"/><circle cx="12" cy="17" r="1"/><path d="M12 14v3"/></svg> },
                  { value: 'automate', label: 'Automate Existing Processes', key: 'B', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/><circle cx="12" cy="12" r="4"/></svg> },
                  { value: 'build', label: 'Custom Software or App', key: 'C', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg> },
                  { value: 'website', label: 'Website or Web App', key: 'D', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
                  { value: 'consulting', label: 'Not Sure — Just Want to Talk', key: 'E', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    className={`${styles.optionCard} ${formData.lookingFor === opt.value ? styles.optionCardActive : ''}`}
                    onClick={() => {
                      setFormData({ ...formData, lookingFor: opt.value })
                      setTimeout(() => setFormStep(2), 200)
                    }}
                  >
                    <span className={styles.optionIcon}>{opt.icon}</span>
                    <span className={styles.optionLabel}>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Contact info */}
          {formStep === 2 && (
            <div className={styles.qualifyForm}>
              <h2 className={styles.formHeadline}>How do we reach you?</h2>
              <div className={styles.formGroup}>
                <label htmlFor="lp-name">Name</label>
                <input
                  type="text"
                  id="lp-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  autoFocus
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lp-email">Email</label>
                <input
                  type="email"
                  id="lp-email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@company.com"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lp-phone">Phone</label>
                <input
                  type="tel"
                  id="lp-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(555) 555-5555"
                />
              </div>
              <div className={styles.formNav}>
                <button className={styles.formBackBtn} onClick={handleBack}>Back</button>
                <button
                  className={styles.formSubmitBtn}
                  disabled={!formData.name || !formData.email || !formData.phone}
                  onClick={handleNext}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: What do you need help with */}
          {formStep === 3 && (
            <div className={styles.qualifyForm}>
              <h2 className={styles.formHeadline}>What do you need help with?</h2>
              <div className={styles.formGroup}>
                <textarea
                  id="lp-needs"
                  value={formData.needs}
                  onChange={(e) => setFormData({ ...formData, needs: e.target.value })}
                  placeholder="Tell us about your project, pain points, or goals..."
                  rows={4}
                  autoFocus
                />
              </div>
              <div className={styles.formNav}>
                <button className={styles.formBackBtn} onClick={handleBack}>Back</button>
                <button
                  className={styles.formSubmitBtn}
                  disabled={!formData.needs}
                  onClick={handleNext}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Hours spent on manual work */}
          {formStep === 4 && (
            <div className={styles.qualifyForm}>
              <h2 className={styles.formHeadline}>How many hours per week does your team spend on manual or repetitive tasks?</h2>
              <div className={styles.optionGrid}>
                {[
                  { value: '0-5', label: '0 - 5 hours', key: 'A' },
                  { value: '5-15', label: '5 - 15 hours', key: 'B' },
                  { value: '15-30', label: '15 - 30 hours', key: 'C' },
                  { value: '30+', label: '30+ hours', key: 'D' },
                  { value: 'unsure', label: 'Not sure', key: 'E' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    className={`${styles.optionCard} ${formData.manualHours === opt.value ? styles.optionCardActive : ''}`}
                    onClick={() => {
                      const updated = { ...formData, manualHours: opt.value }
                      setFormData(updated)
                      if (updated.email) saveLead(4, updated)
                      setTimeout(() => setFormStep(5), 200)
                    }}
                  >
                    <span className={styles.optionKey}>{opt.key}</span>
                    <span className={styles.optionLabel}>{opt.label}</span>
                  </button>
                ))}
              </div>
              <div className={styles.formNav}>
                <button className={styles.formBackBtn} onClick={handleBack}>Back</button>
              </div>
            </div>
          )}

          {/* Step 5: Monthly revenue */}
          {formStep === 5 && (
            <div className={styles.qualifyForm}>
              <h2 className={styles.formHeadline}>What&apos;s your approximate monthly revenue?</h2>
              <div className={styles.optionGrid}>
                {[
                  { value: 'pre-revenue', label: 'Pre-revenue', key: 'A' },
                  { value: '0-10k', label: 'Under $10K', key: 'B' },
                  { value: '10-50k', label: '$10K - $50K', key: 'C' },
                  { value: '50-200k', label: '$50K - $200K', key: 'D' },
                  { value: '200k+', label: '$200K+', key: 'E' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    className={`${styles.optionCard} ${formData.monthlyRevenue === opt.value ? styles.optionCardActive : ''}`}
                    onClick={() => {
                      const updated = { ...formData, monthlyRevenue: opt.value }
                      setFormData(updated)
                      if (updated.email) saveLead(5, updated)
                      setTimeout(() => setFormStep(6), 200)
                    }}
                  >
                    <span className={styles.optionKey}>{opt.key}</span>
                    <span className={styles.optionLabel}>{opt.label}</span>
                  </button>
                ))}
              </div>
              <div className={styles.formNav}>
                <button className={styles.formBackBtn} onClick={handleBack}>Back</button>
              </div>
            </div>
          )}

          {/* Step 6: Financing / Credit Score */}
          {formStep === 6 && (
            <div className={styles.qualifyForm}>
              <h2 className={styles.formHeadline}>We offer flexible payment options so budget doesn&apos;t hold you back. Most clients start with a small deposit and pay as we deliver. To see what you qualify for, what&apos;s your estimated credit score?</h2>
              <div className={styles.optionGrid}>
                {[
                  { value: 'below-600', label: 'Below 600', key: 'A' },
                  { value: '600-650', label: '600 - 650', key: 'B' },
                  { value: '650-700', label: '650 - 700', key: 'C' },
                  { value: '700-750', label: '700 - 750', key: 'D' },
                  { value: '750-800+', label: '750 - 800+', key: 'E' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    className={`${styles.optionCard} ${formData.creditScore === opt.value ? styles.optionCardActive : ''}`}
                    onClick={() => {
                      setFormData({ ...formData, creditScore: opt.value })
                      setTimeout(() => {
                        handleSubmit()
                      }, 200)
                    }}
                  >
                    <span className={styles.optionKey}>{opt.key}</span>
                    <span className={styles.optionLabel}>{opt.label}</span>
                  </button>
                ))}
              </div>
              <div className={styles.formNav}>
                <button className={styles.formBackBtn} onClick={handleBack}>Back</button>
              </div>
            </div>
          )}

          {/* Step 7: Qualified — show cal */}
          {formStep === 7 && <CalEmbed key={JSON.stringify(formData)} onBooked={() => { saveLead(7, formData, 'booked'); router.push('/lp/confirmed') }} formData={formData} />}

          {/* Step 8: Not qualified */}
          {formStep === 8 && (
            <div className={styles.thankYouMessage}>
              <div className={styles.thankYouIcon}>&#10003;</div>
              <h3>Thanks for your interest!</h3>
              <p>We&apos;ve received your information and will be in touch if there&apos;s a fit.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Grid */}
      <section className={styles.statsSection}>
        <div className={styles.statsInner}>
          <div className={styles.statsGrid}>
            {stats.map((s, i) => (
              <div key={i} className={styles.statCard}>
                <span className={styles.statMetric}>{s.metric}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className={styles.testimonialSection}>
        <div className={styles.testimonialInner}>
          <p className={styles.testimonialQuote}>
            &ldquo;Isaac came in, mapped out our workflows, and built us a custom platform that handles what used to take hours. Our team can actually focus on growing the business instead of putting out fires.&rdquo;
          </p>
          <div className={styles.testimonialAuthor}>
            <p className={styles.testimonialName}>George Zimny</p>
            <p className={styles.testimonialRole}>Co-Founder, ProducifyX</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaHeadline}>
            Stop losing time to manual work.
          </h2>
          <p className={styles.ctaSubtitle}>
            Book a free call. We&apos;ll map your workflows, find the bottlenecks, and show you exactly what can be automated.
          </p>
          <a href="#form" className={styles.ctaButton}>
            Get my free audit
          </a>
        </div>
      </section>

      {/* Minimal Footer */}
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
