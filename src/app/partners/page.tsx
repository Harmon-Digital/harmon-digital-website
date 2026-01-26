'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './partners.module.css'

declare global {
  interface Window {
    Cal?: {
      ns?: Record<string, ((...args: unknown[]) => void) & { q?: unknown[] }>
      (...args: unknown[]): void
    }
  }
}

function PartnerCalEmbed() {
  const calRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.Cal?.ns?.['partner-intro']) {
      window.Cal.ns['partner-intro']('inline', {
        elementOrSelector: '#my-cal-inline-partner-intro',
        config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
        calLink: 'harmon-digital/partner-intro',
      })
    } else {
      const script = document.createElement('script')
      script.innerHTML = `
        (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
        Cal("init", "partner-intro", {origin:"https://app.cal.com"});
        Cal.ns["partner-intro"]("inline", {
          elementOrSelector:"#my-cal-inline-partner-intro",
          config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true"},
          calLink: "harmon-digital/partner-intro",
        });
        Cal.ns["partner-intro"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
      `
      document.body.appendChild(script)
    }
  }, [])

  return (
    <>
      <p className={styles.qualifiedMessage}>Great! Pick a time that works for you.</p>
      <div className={styles.calEmbedWrapper}>
        <div
          ref={calRef}
          style={{ width: '100%', height: '700px', overflow: 'auto' }}
          id="my-cal-inline-partner-intro"
        />
      </div>
    </>
  )
}

export default function PartnersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formStep, setFormStep] = useState(0)
  const [highlightVisible, setHighlightVisible] = useState(false)
  const ctaSectionRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    firm: '',
    dealSize: '',
    honeypot: '',
  })

  // Intersection observer for headline animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHighlightVisible(true)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (ctaSectionRef.current) {
      observer.observe(ctaSectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // If honeypot is filled, silently reject (bot detected)
    if (formData.honeypot) {
      setFormStep(1)
      return
    }

    // Send to email service
    try {
      await fetch('/api/partner-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          firm: formData.firm,
          dealSize: formData.dealSize,
        }),
      })
    } catch (error) {
      console.error('Failed to send inquiry:', error)
    }

    setFormStep(1)
  }

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.label}>Partner Program</span>
          <h1 className={styles.headline}>
            Increase your deal values <span style={{whiteSpace: 'nowrap'}}>15-25%.</span><br />
            Earn <span style={{whiteSpace: 'nowrap'}}>$5K-$15K</span> per referral.
          </h1>
          <p className={styles.subtitle}>
            M&A advisors and brokers: we systematize your client's business,
            get paid from the valuation increase, and you earn a commission.
          </p>
          <div className={styles.heroCtas}>
            <a href="#book" className={styles.ctaBtn}>
              Become a Partner
            </a>
            <a href="#example" className={styles.ctaBtnSecondary}>
              See Example Deal
            </a>
          </div>

          <div className={styles.trust}>
            <p className={styles.trustLabel}>Businesses we've systematized</p>
            <div className={styles.logoSlider}>
              <div className={styles.logoTrack}>
                {[...Array.from({ length: 13 }, (_, i) => `/clients/${i + 1}.png`), ...Array.from({ length: 13 }, (_, i) => `/clients/${i + 1}.png`)].map((logo, index) => (
                  <div key={index} className={styles.logoSlide}>
                    <img src={logo} alt="Client logo" className={styles.clientLogo} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Problem Section */}
      <div className={styles.section}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionHeadline}>
            The problem with<br />
            owner-dependent businesses.
          </h2>
          <p className={styles.sectionSubtitle}>
            Buyers discount heavily for key-person risk. Deals take longer.
            Valuations suffer.
          </p>

          <div className={styles.problemGrid}>
            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3 className={styles.problemTitle}>Owner is the bottleneck</h3>
              <p className={styles.problemDesc}>
                Everything runs through the seller.
                No systems, no documentation.
              </p>
            </div>

            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h3 className={styles.problemTitle}>Buyers discount heavily</h3>
              <p className={styles.problemDesc}>
                Key-person risk means lower
                multiples and harder negotiations.
              </p>
            </div>

            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3 className={styles.problemTitle}>Deals drag on</h3>
              <p className={styles.problemDesc}>
                Due diligence takes longer when
                there's nothing documented.
              </p>
            </div>

            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <h3 className={styles.problemTitle}>Deals fall through</h3>
              <p className={styles.problemDesc}>
                Buyers walk away when they see
                how dependent the business is.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The Solution Section */}
      <div className={styles.section}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionHeadline}>
            We build automated systems that increase what buyers will pay.
          </h2>
          <p className={styles.sectionSubtitle}>
            Custom automation, AI agents, and documentation that let the
            business run without the owner.
          </p>

          <div className={styles.solutionGrid}>
            <div className={styles.solutionItem}>
              <span className={styles.solutionIcon}>◇</span>
              <span>Operational infrastructure</span>
            </div>
            <div className={styles.solutionItem}>
              <span className={styles.solutionIcon}>◎</span>
              <span>AI agents for customer service</span>
            </div>
            <div className={styles.solutionItem}>
              <span className={styles.solutionIcon}>▤</span>
              <span>Workflow automation</span>
            </div>
            <div className={styles.solutionItem}>
              <span className={styles.solutionIcon}>▣</span>
              <span>System integrations</span>
            </div>
            <div className={styles.solutionItem}>
              <span className={styles.solutionIcon}>◈</span>
              <span>Custom software & portals</span>
            </div>
            <div className={styles.solutionItem}>
              <span className={styles.solutionIcon}>△</span>
              <span>Complete documentation & SOPs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Commission Section */}
      <div className={styles.section} id="example">
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionHeadline}>
            You earn 15% of what we make.
          </h2>
          <p className={styles.sectionSubtitle}>
            Your client pays a small retainer during the build. We take 8% of the valuation increase at closing. You earn commission on both.
          </p>

          <div className={styles.exampleCard}>
            <h3 className={styles.exampleTitle}>Example</h3>
            <div className={styles.exampleGrid}>
              <div className={styles.exampleRow}>
                <span className={styles.exampleLabel}>Business valued today</span>
                <span className={styles.exampleValue}>$2,000,000</span>
              </div>
              <div className={styles.exampleRow}>
                <span className={styles.exampleLabel}>Sells for after systematization</span>
                <span className={styles.exampleValue}>$2,500,000</span>
              </div>
              <div className={styles.exampleRow}>
                <span className={styles.exampleLabel}>Valuation increase</span>
                <span className={styles.exampleValue}>$500,000</span>
              </div>
              <div className={styles.exampleDivider} />
              <div className={styles.exampleRow}>
                <span className={styles.exampleLabel}>Our fee (3mo retainer + 8%)</span>
                <span className={styles.exampleValue}>$47,500</span>
              </div>
              <div className={`${styles.exampleRow} ${styles.exampleHighlight}`}>
                <span className={styles.exampleLabel}>Your commission (15%)</span>
                <span className={styles.exampleValue}>$7,125</span>
              </div>
              <div className={styles.exampleDivider} />
              <div className={styles.exampleRow}>
                <span className={styles.exampleLabel}>Seller nets extra</span>
                <span className={styles.exampleValueMuted}>$452,500</span>
              </div>
            </div>
            <p className={styles.exampleNote}>If we don't increase the valuation, no success fee is charged.</p>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className={styles.section}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionHeadline}>
            We protect your reputation.
          </h2>
          <p className={styles.sectionSubtitle}>
            Your relationship with your client is everything. We treat your referrals like our own.
          </p>

          <div className={styles.trustGrid}>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>✓</span>
              <div>
                <strong>You stay in the loop</strong>
                <p>Weekly updates during implementation so you're never surprised.</p>
              </div>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>✓</span>
              <div>
                <strong>You approve major decisions</strong>
                <p>We never make changes without your client's (and your) buy-in.</p>
              </div>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>✓</span>
              <div>
                <strong>Satisfaction guaranteed</strong>
                <p>If your client isn't happy, we fix it or refund the retainer.</p>
              </div>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>✓</span>
              <div>
                <strong>Professional delivery</strong>
                <p>Clean handoffs, clear communication, no drama.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className={styles.section}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionHeadline}>
            How the partnership works.<br />
            Simple and hands-off.
          </h2>
          <p className={styles.sectionSubtitle}>
            You make the intro. We handle everything else.
          </p>

          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span>1</span>
                <div className={styles.stepLine} />
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Identify a seller</h3>
                <p className={styles.stepDesc}>
                  You're working with a business owner preparing to sell who needs
                  to reduce owner dependency before going to market.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span>2</span>
                <div className={styles.stepLine} />
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Make an introduction</h3>
                <p className={styles.stepDesc}>
                  Simple email intro to us. We'll handle the discovery call,
                  scoping, and follow-up. $2,500/month retainer from your client.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span>3</span>
                <div className={styles.stepLine} />
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>We systematize the business</h3>
                <p className={styles.stepDesc}>
                  90-day implementation. Client pays $2,500/month during this period.
                  Once complete, retainer stops and business goes to market.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span>4</span>
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Everyone gets paid at closing</h3>
                <p className={styles.stepDesc}>
                  When the business sells, we take 8% of the valuation increase.
                  You earn 15% of our fee. Your client nets the rest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className={styles.section}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionHeadline}>
            Beyond commission.<br />
            Why partners work with us.
          </h2>

          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h3 className={styles.benefitTitle}>Affordable</h3>
              <p className={styles.benefitDesc}>
                $2,500/month from your client.
                Big ROI comes at closing.
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3 className={styles.benefitTitle}>Faster closes</h3>
              <p className={styles.benefitDesc}>
                Turnkey operations mean fewer
                buyer objections and faster due diligence.
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <h3 className={styles.benefitTitle}>Stand out</h3>
              <p className={styles.benefitDesc}>
                Offer something other advisors can't.
                Exit systematization as a service.
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className={styles.benefitTitle}>Zero risk</h3>
              <p className={styles.benefitDesc}>
                If we don't increase the valuation,
                there's no success fee.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.trustedLabel}>Businesses we've worked with</p>
          <div className={styles.logoSlider}>
            <div className={styles.logoTrack}>
              {[...Array.from({ length: 13 }, (_, i) => `/clients/${i + 1}.png`), ...Array.from({ length: 13 }, (_, i) => `/clients/${i + 1}.png`)].map((logo, index) => (
                <div key={index} className={styles.logoSlide}>
                  <img src={logo} alt="Client logo" className={styles.clientLogo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className={styles.section}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionHeadline}>
            Common questions.
          </h2>

          <div className={styles.faqList}>
            <div className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
              >
                <span>What if the valuation doesn't increase?</span>
                <span className={`${styles.faqIcon} ${openFaq === 0 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 0 ? styles.faqAnswerOpen : ''}`}>
                <p>Your client pays the monthly retainer during the build. Our success fee is 8% of the valuation increase, paid from sale proceeds. No increase means no success fee.</p>
              </div>
            </div>

            <div className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
              >
                <span>When do I get paid?</span>
                <span className={`${styles.faqIcon} ${openFaq === 1 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 1 ? styles.faqAnswerOpen : ''}`}>
                <p>Commission is paid within 30 days of the business closing. You earn 15% of our success fee—paid from sale proceeds, same as us.</p>
              </div>
            </div>

            <div className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
              >
                <span>What if my client isn't ready to sell yet?</span>
                <span className={`${styles.faqIcon} ${openFaq === 2 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 2 ? styles.faqAnswerOpen : ''}`}>
                <p>We work best with businesses actively preparing to go to market. If they're 6+ months out, let's talk—we can discuss whether the timing makes sense or if they should reach out when they're closer.</p>
              </div>
            </div>

            <div className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
              >
                <span>What types of businesses do you work with?</span>
                <span className={`${styles.faqIcon} ${openFaq === 3 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 3 ? styles.faqAnswerOpen : ''}`}>
                <p>Service businesses, agencies, distributors, and companies doing $500K+ in revenue where the owner is currently the bottleneck. We'll tell you honestly if a referral is a fit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div ref={ctaSectionRef} className={styles.ctaSection} id="book">
        <div className={styles.ctaSectionInner}>
          <h2 className={styles.ctaHeadline}>
            Let's start a <span className={`${styles.highlighted} ${highlightVisible ? styles.highlightedVisible : ''}`}>conversation.</span>
          </h2>

          {formStep === 0 && (
            <form className={styles.partnerForm} onSubmit={handleFormSubmit}>
              <p className={styles.formSubtitle}>
                Tell us about your practice so we can come prepared.
              </p>

              {/* Honeypot field */}
              <input
                type="text"
                name="website_url"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@firm.com"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="firm">Firm name</label>
                  <input
                    type="text"
                    id="firm"
                    required
                    value={formData.firm}
                    onChange={(e) => setFormData({ ...formData, firm: e.target.value })}
                    placeholder="Your firm or brokerage"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="dealSize">Typical deal size</label>
                  <input
                    type="text"
                    id="dealSize"
                    value={formData.dealSize}
                    onChange={(e) => setFormData({ ...formData, dealSize: e.target.value })}
                    placeholder="e.g. $1M-$5M (optional)"
                  />
                </div>
              </div>

              <button type="submit" className={styles.formSubmitBtn}>
                Continue
              </button>
            </form>
          )}

          {formStep === 1 && <PartnerCalEmbed />}

          <div className={styles.nextSteps}>
            <h3 className={styles.nextStepsTitle}>What happens next?</h3>
            <ol className={styles.nextStepsList}>
              <li>We'll email within 24 hours to schedule a 15-minute call</li>
              <li>We'll discuss your client pipeline and deal flow</li>
              <li>If it's a fit, we'll send the partnership agreement</li>
              <li>You start referring clients and earning commission</li>
            </ol>
          </div>

          <p className={styles.ctaEmail}>
            Prefer email? <a href="mailto:info@harmon-digital.com">info@harmon-digital.com</a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerTop}>
            <Link href="/" className={styles.footerLogo}>
              <img src="/logo/icon.png" alt="Harmon Digital logo" className={styles.footerLogoIcon} />
              <span>Harmon Digital</span>
            </Link>
            <div className={styles.footerContact}>
              <a href="mailto:info@harmon-digital.com" className={styles.footerEmail}>info@harmon-digital.com</a>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p className={styles.footerCredit}>Made with love by Harmon Digital.</p>
            <div className={styles.footerLinks}>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
