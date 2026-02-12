'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './ai-agents.module.css'
import { trackMetaEvent } from '@/components/analytics/MetaPixel'

declare global {
  interface Window {
    Cal?: {
      ns?: Record<string, ((...args: unknown[]) => void) & { q?: unknown[] }>
      (...args: unknown[]): void
    }
  }
}

function AgentCalEmbed() {
  const calRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.Cal?.ns?.['15min']) {
      window.Cal.ns['15min']('inline', {
        elementOrSelector: '#my-cal-inline-agents',
        config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
        calLink: 'harmon-digital/15min',
      })
      window.Cal.ns['15min']('on', {
        action: 'bookingSuccessful',
        callback: () => {
          trackMetaEvent('Schedule', {
            content_name: 'AI Agents Cal Booking',
            content_category: 'Services',
          })
        }
      })
    } else {
      const script = document.createElement('script')
      script.innerHTML = `
        (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
        Cal("init", "15min", {origin:"https://app.cal.com"});
        Cal.ns["15min"]("inline", {
          elementOrSelector:"#my-cal-inline-agents",
          config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true"},
          calLink: "harmon-digital/15min",
        });
        Cal.ns["15min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
        Cal.ns["15min"]("on", {
          action: "bookingSuccessful",
          callback: function() {
            if (window.fbq) {
              window.fbq('track', 'Schedule', {
                content_name: 'AI Agents Cal Booking',
                content_category: 'Services'
              });
            }
          }
        });
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
          id="my-cal-inline-agents"
        />
      </div>
    </>
  )
}

export default function AIAgentsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [highlightVisible, setHighlightVisible] = useState(false)
  const [formStep, setFormStep] = useState(0)
  const ctaSectionRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '',
    honeypot: '',
  })

  useEffect(() => {
    trackMetaEvent('ViewContent', {
      content_name: 'AI Agents Service',
      content_category: 'Services',
    })
  }, [])

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

    if (formData.honeypot) {
      setFormStep(1)
      return
    }

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          lookingFor: 'ai-agents',
          needs: `Company: ${formData.company}, Team size: ${formData.teamSize}`,
        }),
      })
    } catch (error) {
      console.error('Failed to send inquiry:', error)
    }

    trackMetaEvent('Lead', {
      content_name: 'AI Agents Form Submission',
      content_category: 'Services',
    })

    setFormStep(1)
  }

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.label}>AI Agent Operations</span>
          <h1 className={styles.headline}>
            AI agents that run your business operations 24/7.
          </h1>
          <p className={styles.subtitle}>
            We install AI agents directly into your business. They handle email, scheduling, project management, reporting, customer service — whatever your team does manually today.
          </p>
          <div className={styles.heroCtas}>
            <a href="#book" className={styles.ctaBtn}>
              Book a free call
            </a>
            <a href="#how-it-works" className={styles.ctaBtnSecondary}>
              See how it works
            </a>
          </div>

          <div className={styles.trust}>
            <p className={styles.trustLabel}>Businesses running on our AI agents</p>
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

      {/* Not a Chatbot Section */}
      <div className={styles.section}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionHeadline}>
            These aren't chatbots.<br />
            They're digital employees.
          </h2>
          <p className={styles.sectionSubtitle}>
            Most "AI solutions" are glorified chat widgets. Our agents are different. They run 24/7, connect to your actual tools, remember context across conversations, and take action on their own.
          </p>

          <div className={styles.comparisonGrid}>
            <div className={styles.comparisonCard}>
              <h3 className={styles.comparisonTitle}>Typical chatbot</h3>
              <ul className={styles.comparisonList}>
                <li className={styles.comparisonBad}>Answers basic FAQs</li>
                <li className={styles.comparisonBad}>Forgets everything between sessions</li>
                <li className={styles.comparisonBad}>Can't access your tools</li>
                <li className={styles.comparisonBad}>Needs a human to do anything real</li>
                <li className={styles.comparisonBad}>Only works when someone asks it something</li>
              </ul>
            </div>
            <div className={`${styles.comparisonCard} ${styles.comparisonCardGood}`}>
              <h3 className={styles.comparisonTitle}>Our AI agents</h3>
              <ul className={styles.comparisonList}>
                <li className={styles.comparisonGood}>Handle full workflows end-to-end</li>
                <li className={styles.comparisonGood}>Remember everything — full context, always</li>
                <li className={styles.comparisonGood}>Connected to your email, CRM, calendar, and more</li>
                <li className={styles.comparisonGood}>Take action autonomously</li>
                <li className={styles.comparisonGood}>Run 24/7, even when nobody's asking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* What They Do Section */}
      <div className={styles.section}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionHeadline}>
            What your AI agents can do.
          </h2>
          <p className={styles.sectionSubtitle}>
            If your team does it manually today, there's probably an agent for it.
          </p>

          <div className={styles.capabilitiesGrid}>
            <div className={styles.capabilityCard}>
              <span className={styles.capabilityIcon}>✉</span>
              <h3 className={styles.capabilityTitle}>Email & communication</h3>
              <p className={styles.capabilityDesc}>
                Read, draft, and send emails. Route messages to the right person. Follow up automatically when things go quiet.
              </p>
            </div>
            <div className={styles.capabilityCard}>
              <span className={styles.capabilityIcon}>📅</span>
              <h3 className={styles.capabilityTitle}>Scheduling & calendar</h3>
              <p className={styles.capabilityDesc}>
                Coordinate meetings, manage availability, send reminders, and handle rescheduling without the back-and-forth.
              </p>
            </div>
            <div className={styles.capabilityCard}>
              <span className={styles.capabilityIcon}>📋</span>
              <h3 className={styles.capabilityTitle}>Project management</h3>
              <p className={styles.capabilityDesc}>
                Create tasks, update statuses, assign work, and keep your team on track across tools like ClickUp, Asana, or Monday.
              </p>
            </div>
            <div className={styles.capabilityCard}>
              <span className={styles.capabilityIcon}>📊</span>
              <h3 className={styles.capabilityTitle}>Reporting & analytics</h3>
              <p className={styles.capabilityDesc}>
                Pull data from your systems, generate reports, and surface insights — daily, weekly, or on-demand.
              </p>
            </div>
            <div className={styles.capabilityCard}>
              <span className={styles.capabilityIcon}>💬</span>
              <h3 className={styles.capabilityTitle}>Customer service</h3>
              <p className={styles.capabilityDesc}>
                Answer customer questions, process orders, handle complaints, and escalate when needed — around the clock.
              </p>
            </div>
            <div className={styles.capabilityCard}>
              <span className={styles.capabilityIcon}>⚡</span>
              <h3 className={styles.capabilityTitle}>Custom workflows</h3>
              <p className={styles.capabilityDesc}>
                Whatever your team does repeatedly, we can build an agent for it. Data entry, approvals, onboarding — you name it.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className={styles.section} id="how-it-works">
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionHeadline}>
            How we build your agents.<br />
            From audit to launch in 30 days.
          </h2>
          <p className={styles.sectionSubtitle}>
            We don't guess what you need. We watch how your team actually works, then build agents to help them do it faster.
          </p>

          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span>1</span>
                <div className={styles.stepLine} />
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>We audit your operations</h3>
                <p className={styles.stepDesc}>
                  We sit down 1-on-1 with each employee on your team. We shadow what they do, map their workflows, and identify every task that could be handled by an AI agent.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span>2</span>
                <div className={styles.stepLine} />
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>We build custom agents for each role</h3>
                <p className={styles.stepDesc}>
                  Every agent is purpose-built for a specific job in your business. Not generic templates — custom agents trained on your processes, your data, and your tools.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span>3</span>
                <div className={styles.stepLine} />
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>We deploy locally or in the cloud</h3>
                <p className={styles.stepDesc}>
                  You choose where your agents run. On your own machines where your data never leaves your office, or hosted by us in the cloud — fully managed.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span>4</span>
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>We train your team to work alongside them</h3>
                <p className={styles.stepDesc}>
                  Your employees learn how to collaborate with their AI agents. How to give them instructions, review their work, and get the most out of them every day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Approach Section */}
      <div className={styles.section}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionHeadline}>
            Built around your people,<br />
            not instead of them.
          </h2>
          <p className={styles.sectionSubtitle}>
            We don't replace your team. We give each person an AI partner that handles the boring stuff so they can focus on the work that actually matters.
          </p>

          <div className={styles.approachGrid}>
            <div className={styles.approachItem}>
              <span className={styles.approachIcon}>✓</span>
              <div>
                <strong>1-on-1 with every employee</strong>
                <p>We shadow each person individually. We learn their workflows, their pain points, and what eats up their day.</p>
              </div>
            </div>
            <div className={styles.approachItem}>
              <span className={styles.approachIcon}>✓</span>
              <div>
                <strong>Agents that match how they work</strong>
                <p>Each agent is designed for a specific person's role. It knows their tools, their preferences, and their responsibilities.</p>
              </div>
            </div>
            <div className={styles.approachItem}>
              <span className={styles.approachIcon}>✓</span>
              <div>
                <strong>Your team stays in control</strong>
                <p>Agents assist and accelerate — they don't make decisions your team hasn't approved. Humans always have the final say.</p>
              </div>
            </div>
            <div className={styles.approachItem}>
              <span className={styles.approachIcon}>✓</span>
              <div>
                <strong>Continuous improvement</strong>
                <p>As your team works with their agents, the agents get smarter. We tune and optimize based on real usage.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Infrastructure Section */}
      <div className={styles.section}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionHeadline}>
            Your infrastructure, your choice.
          </h2>
          <p className={styles.sectionSubtitle}>
            Not every business wants their data in the cloud. We give you options.
          </p>

          <div className={styles.infraCards}>
            <div className={styles.infraCard}>
              <div className={styles.infraIcon}>🏢</div>
              <h3 className={styles.infraTitle}>Local deployment</h3>
              <p className={styles.infraDesc}>Agents run on your machines, in your office. Your data never leaves your network. Perfect for businesses with strict privacy requirements or sensitive customer data.</p>
              <ul className={styles.infraFeatures}>
                <li>Full data sovereignty</li>
                <li>No cloud dependency</li>
                <li>Works offline</li>
                <li>You own everything</li>
              </ul>
            </div>
            <div className={styles.infraCard}>
              <div className={styles.infraIcon}>☁️</div>
              <h3 className={styles.infraTitle}>Cloud deployment</h3>
              <p className={styles.infraDesc}>We host and manage everything for you. Zero maintenance on your end. Automatic updates, monitoring, and scaling as your needs grow.</p>
              <ul className={styles.infraFeatures}>
                <li>Fully managed by us</li>
                <li>Automatic updates</li>
                <li>24/7 monitoring</li>
                <li>Scales with your business</li>
              </ul>
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
              <button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}>
                <span>How long does setup take?</span>
                <span className={`${styles.faqIcon} ${openFaq === 0 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 0 ? styles.faqAnswerOpen : ''}`}>
                <p>Most businesses are up and running with their first agents in 2-4 weeks. We start with an audit, build your custom agents, deploy them, and train your team. More complex setups with many roles or integrations may take 4-6 weeks.</p>
              </div>
            </div>

            <div className={styles.faqItem}>
              <button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}>
                <span>Will this replace my employees?</span>
                <span className={`${styles.faqIcon} ${openFaq === 1 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 1 ? styles.faqAnswerOpen : ''}`}>
                <p>No. Our agents are designed to help your team, not replace them. Think of it like giving each employee a really smart assistant. They handle the repetitive, time-consuming tasks so your people can focus on higher-value work.</p>
              </div>
            </div>

            <div className={styles.faqItem}>
              <button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}>
                <span>Is my data safe?</span>
                <span className={`${styles.faqIcon} ${openFaq === 2 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 2 ? styles.faqAnswerOpen : ''}`}>
                <p>Absolutely. With local deployment, your data never leaves your machines. With cloud deployment, we use encrypted, isolated environments. Either way, you control your data and we never share it with anyone.</p>
              </div>
            </div>

            <div className={styles.faqItem}>
              <button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}>
                <span>What tools do your agents work with?</span>
                <span className={`${styles.faqIcon} ${openFaq === 3 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 3 ? styles.faqAnswerOpen : ''}`}>
                <p>Gmail, Outlook, Slack, ClickUp, Asana, Monday, HubSpot, Salesforce, Google Calendar, Airtable, QuickBooks, Xero — and many more. If it has an API, we can probably connect to it. We'll map your full tool stack during the audit.</p>
              </div>
            </div>

            <div className={styles.faqItem}>
              <button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}>
                <span>What does it cost?</span>
                <span className={`${styles.faqIcon} ${openFaq === 4 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 4 ? styles.faqAnswerOpen : ''}`}>
                <p>Pricing depends on the number of agents, complexity of workflows, and deployment type. Most businesses land between $3,000–$5,000/month. Book a call and we'll give you an honest quote after understanding your needs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div ref={ctaSectionRef} className={styles.ctaSection} id="book">
        <div className={styles.ctaSectionInner}>
          <h2 className={styles.ctaHeadline}>
            Ready to put AI agents to <span className={`${styles.highlighted} ${highlightVisible ? styles.highlightedVisible : ''}`}>work?</span>
          </h2>

          {formStep === 0 && (
            <form className={styles.contactForm} onSubmit={handleFormSubmit}>
              <p className={styles.formSubtitle}>
                Tell us about your business and we'll come prepared with ideas.
              </p>

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
                    placeholder="you@company.com"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your company name"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="teamSize">Team size</label>
                  <input
                    type="text"
                    id="teamSize"
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    placeholder="e.g. 5-10 people (optional)"
                  />
                </div>
              </div>

              <button type="submit" className={styles.formSubmitBtn}>
                Continue
              </button>
            </form>
          )}

          {formStep === 1 && <AgentCalEmbed />}

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
              <Link href="/services/ai-agents">AI Agents</Link>
              <Link href="/partner">Partners</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
