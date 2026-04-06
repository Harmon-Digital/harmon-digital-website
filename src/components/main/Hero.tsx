'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import styles from './Hero.module.css'
import { trackMetaEvent } from '@/components/analytics/MetaPixel'

const lookingForLabels: Record<string, string> = {
  'ai': 'AI Agents or AI Consulting',
  'automate': 'Automate Existing Processes',
  'build': 'Custom Software or App',
  'website': 'Website or Web App',
  'consulting': 'Not Sure — Just Want to Talk',
}

// Cal.com embed component
function CalEmbed({ formData, onBooked }: { formData: Record<string, string>; onBooked: () => void }) {
  const calRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // @ts-ignore
    window.__homeCalBooked = () => {
      trackMetaEvent('Schedule', {
        content_name: 'Homepage Cal Booking',
        content_category: 'Contact',
      })
      onBooked()
    }

    const rawPhone = (formData.phone || '').replace(/[\s\-\(\)]/g, '')
    const intlPhone = rawPhone.startsWith('+') ? rawPhone : rawPhone.startsWith('1') ? `+${rawPhone}` : `+1${rawPhone}`

    const notesLines = [
      `Looking for: ${lookingForLabels[formData.lookingFor] || formData.lookingFor}`,
      formData.needs ? `Needs: ${formData.needs}` : '',
    ].filter(Boolean).join('\n')

    const prefill = {
      name: formData.name || '',
      email: formData.email || '',
      aiAgentCallPhoneNumber: formData.phone ? intlPhone : '',
      title: lookingForLabels[formData.lookingFor] || formData.lookingFor || '',
      notes: notesLines,
    }

    // @ts-ignore
    if (window.Cal) {
      // @ts-ignore
      window.Cal.ns["audit"]("inline", {
        elementOrSelector: "#my-cal-inline-15min",
        config: { layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "light", prefill },
        calLink: "harmon-digital/audit",
      })
      // @ts-ignore
      window.Cal.ns["audit"]("on", {
        action: "bookingSuccessful",
        // @ts-ignore
        callback: () => window.__homeCalBooked()
      })
    } else {
      const script = document.createElement('script')
      script.innerHTML = `
        (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
        Cal("init", "audit", {origin:"https://app.cal.com"});
        Cal.ns["audit"]("inline", {
          elementOrSelector:"#my-cal-inline-15min",
          config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light","prefill":${JSON.stringify(prefill)}},
          calLink: "harmon-digital/audit",
        });
        Cal.ns["audit"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
        Cal.ns["audit"]("on", {
          action: "bookingSuccessful",
          callback: function() {
            if (window.__homeCalBooked) window.__homeCalBooked();
          }
        });
      `
      document.body.appendChild(script)
    }
  }, [onBooked, formData])

  return (
    <>
      <p className={styles.qualifiedMessage}>Great! Pick a time that works for you.</p>
      <div className={styles.calEmbedWrapper}>
        <div
          ref={calRef}
          style={{ width: '100%', height: '700px', overflow: 'auto' }}
          id="my-cal-inline-15min"
        />
      </div>
    </>
  )
}

const clientLogos = Array.from({ length: 13 }, (_, i) => `/clients/${i + 1}.png`)

const projects = [
  {
    title: "Etto Leisure Carts",
    slug: "hoplite-capital",
    description: "Custom operations software for a multi-location golf cart dealership. Inventory, sales, service, and accounting — all connected.",
    year: "2025",
    image: "/portfolio/hoplite/hero.jpg",
  },
  {
    title: "SunMed Growers",
    slug: "sunmed-growers",
    description: "Custom investor tracker and document management for a $20M debt round.",
    year: "2025",
    image: "/portfolio/sunmed-hero.jpg",
  },
  {
    title: "Noble TeleHealth",
    slug: "noble-telehealth",
    description: "Custom healthcare app that replaced manual booking and scheduling with an automated patient portal.",
    year: "2025",
    image: "/portfolio/noble-hero.jpg",
  },
  {
    title: "Neighbors Bank",
    slug: "neighbors-bank",
    description: "RAG-powered Slack bot serving 200+ team members with instant answers from internal docs.",
    year: "2025",
    image: "/portfolio/neighborsbank-hero.jpg",
  },
  {
    title: "Happy Endings",
    slug: "happy-endings",
    description: "AI email agent and full internal system — orders, kitchen, training, inventory. One platform for the entire business.",
    year: "2025",
    image: "/portfolio/happyendings/hero.jpg",
  },
  {
    title: "Flume Internet",
    slug: "flume-internet",
    description: "Custom CRM built on Airtable and n8n. Full pipeline tracking, customer management, and automated workflows.",
    year: "2025",
    image: "/portfolio/flume-hero.jpg",
  },
  {
    title: "Unstack",
    slug: "unstack",
    description: "AI-powered business operations platform built by Harmon Digital. A SaaS product that gives businesses their own AI-enabled workspace.",
    year: "2025",
    image: "/portfolio/unstack-hero.jpg",
  },
  {
    title: "ProducifyX",
    slug: "producifyx",
    description: "Custom platform that replaced hours of manual work with automated workflows and a centralized dashboard.",
    year: "2025",
    image: "/portfolio/producifyx/hero.jpg",
  },
]

export function Hero() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [highlightVisible, setHighlightVisible] = useState(false)
  const portfolioRef = useRef<HTMLDivElement>(null)
  const bookCallRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  // Multi-step qualification form (same as LP)
  const [formStep, setFormStep] = useState(1)
  const [submitError, setSubmitError] = useState(false)
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

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }))
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePosition])

  // Intersection observer for highlight animation
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

    if (bookCallRef.current) {
      observer.observe(bookCallRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (portfolioRef.current) {
      const rect = portfolioRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    setIsVisible(false)
  }

  const saveLead = async (step: number, data: typeof formData, status = 'partial') => {
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, lastCompletedStep: step, status }),
      })
    } catch (error) {
      console.error('Failed to save lead:', error)
    }
  }

  const handleFormNext = () => {
    if (formStep >= 2 && formData.email) saveLead(formStep, formData)
    setFormStep((s) => s + 1)
  }

  const handleFormBack = () => setFormStep((s) => s - 1)

  const handleFormSubmit = async (data: typeof formData) => {
    if (data.honeypot) { setFormStep(8); return }

    const isNotAFit = data.monthlyRevenue === 'pre-revenue'
    saveLead(6, data, isNotAFit ? 'not-a-fit' : 'submitted')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Email send failed')
      setSubmitError(false)
    } catch (error) {
      console.error('Failed to submit form:', error)
      setSubmitError(true)
    }

    trackMetaEvent('Lead', {
      content_name: 'Homepage Contact Form',
      content_category: 'Contact',
    })

    if (isNotAFit) { setFormStep(8); return }
    setFormStep(7)
  }

  return (
    <section className={styles.hero}>
      <div className={styles.heroCenter}>
        <motion.div
          className={styles.heroCenterContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.heroHeadline}>
            We build the AI foundation<br />your business is missing.
          </h1>

          <p className={styles.heroSubtitle}>
            Custom AI tools, automation, and software that handle the work your team shouldn&apos;t be doing manually. So you can scale without the headcount.
          </p>

          <a href="#book" className={styles.heroCta}>
            Book my free audit
          </a>

        </motion.div>
      </div>

      <div className={styles.trust}>
        <div className={styles.logoSlider}>
          <div className={styles.logoTrack}>
            {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
              <div key={index} className={styles.logoSlide}>
                <img src={logo} alt="Client logo" className={styles.clientLogo} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className={styles.whySection}>
        <div className={styles.whySectionInner}>
          <div className={styles.whyHeader}>
            <h2 className={styles.whyHeadline}>
              Your team is doing work<br />
              that should be automated.
            </h2>
            <p className={styles.whySubtitle}>
              Every hour spent on manual work is an hour not spent on growth.
              Most teams don&apos;t realize how much time they&apos;re losing until someone maps it out.
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
              <h3 className={styles.benefitTitle}>Paying for tools you work around</h3>
              <p className={styles.benefitDesc}>
                5 SaaS subscriptions and your team
                still uses spreadsheets to fill the gaps.
                That&apos;s money and time wasted.
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h3 className={styles.benefitTitle}>People doing repetitive work</h3>
              <p className={styles.benefitDesc}>
                Data entry, copy-paste, status updates,
                follow-ups — your best people are
                stuck doing the lowest-value tasks.
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3 className={styles.benefitTitle}>Nothing is connected</h3>
              <p className={styles.benefitDesc}>
                Your CRM doesn&apos;t know what your
                accounting software knows. So someone
                manually bridges the gap. Every day.
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
                Right now, the only way to do more
                is to hire more. That&apos;s the most
                expensive way to scale.
              </p>
            </div>
          </div>

          <a href="#book" className={styles.sectionCta}>Book my free audit →</a>
        </div>
      </div>

      {/* Services Section */}
      <div className={styles.servicesSection} id="services">
        <div className={styles.servicesSectionInner}>
          <h2 className={styles.servicesHeadline}>
            What your AI foundation looks like.
          </h2>
          <p className={styles.servicesSubtitle}>
            Every business is different. We audit your operations and build exactly what you need — nothing more, nothing less.
          </p>

          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <h3 className={styles.benefitTitle}>AI agents that do real work</h3>
              <p className={styles.benefitDesc}>
                Not chatbots. Agents that handle email, customer service,
                lead qualification, scheduling — autonomously.
              </p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <h3 className={styles.benefitTitle}>Automation that eliminates busywork</h3>
              <p className={styles.benefitDesc}>
                Connect your tools, automate your workflows,
                and stop paying people to move data between systems.
              </p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              </div>
              <h3 className={styles.benefitTitle}>Custom software built for your workflow</h3>
              <p className={styles.benefitDesc}>
                Internal tools, portals, dashboards, and apps —
                designed around how your team actually works.
              </p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <h3 className={styles.benefitTitle}>Websites &amp; apps that convert</h3>
              <p className={styles.benefitDesc}>
                Modern websites, web apps, and e-commerce —
                fast, clean, and built to drive revenue.
              </p>
            </div>
          </div>

          <a href="#book" className={styles.sectionCta}>Book my free audit →</a>
        </div>
      </div>

      {/* How It Works Section */}
      <div className={styles.howSection} id="how-it-works">
        <div className={styles.howSectionInner}>
          <h2 className={styles.howHeadline}>
            How it works.
          </h2>
          <p className={styles.howSubtitle}>
            We don&apos;t guess. We audit, build, and launch — most clients are live in 4-8 weeks.
          </p>

          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span>1</span>
                <div className={styles.stepLine} />
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>We find where you&apos;re losing time</h3>
                <p className={styles.stepDesc}>
                  Free call. We map your workflows, identify the bottlenecks,
                  and show you exactly what can be automated.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span>2</span>
                <div className={styles.stepLine} />
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>We build the fix</h3>
                <p className={styles.stepDesc}>
                  Custom AI tools, automation, or software — scoped to your
                  business, built in sprints, no surprises.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span>3</span>
                <div className={styles.stepLine} />
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Your team starts using it</h3>
                <p className={styles.stepDesc}>
                  We deploy, train your people, and make sure
                  it works in the real world — not just in a demo.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span>4</span>
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>We keep improving it</h3>
                <p className={styles.stepDesc}>
                  As your business changes, your tools should too.
                  We stick around and keep making it better.
                </p>
              </div>
            </div>
          </div>

          <a href="#book" className={styles.sectionCta}>Book my free audit →</a>
        </div>
      </div>

      {/* Portfolio Section */}
      <div
        ref={portfolioRef}
        onMouseMove={handleMouseMove}
        className={styles.portfolioSection}
      >
        <div className={styles.portfolioSectionInner}>
          <span className={styles.sectionLabel}>Proof</span>
          <h2 className={styles.portfolioHeadline}>
            We&apos;ve done this before.<br />
            Here&apos;s what happened.
          </h2>
          <p className={styles.portfolioSubtitle}>
            Real businesses. Real systems. Real results.
          </p>

          {/* Floating Image Preview */}
          <div
            className={styles.imagePreview}
            style={{
              left: portfolioRef.current?.getBoundingClientRect().left ?? 0,
              top: portfolioRef.current?.getBoundingClientRect().top ?? 0,
              transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 100}px, 0)`,
              opacity: isVisible ? 1 : 0,
              scale: isVisible ? 1 : 0.8,
            }}
          >
            <div className={styles.imagePreviewInner}>
              {projects.filter(p => p.image).map((project, index) => {
                const realIndex = projects.indexOf(project)
                return (
                <img
                  key={project.title}
                  src={project.image!}
                  alt={project.title}
                  className={styles.previewImage}
                  style={{
                    opacity: hoveredIndex === realIndex ? 1 : 0,
                    scale: hoveredIndex === realIndex ? 1 : 1.1,
                    filter: hoveredIndex === realIndex ? 'none' : 'blur(10px)',
                  }}
                />
                )
              })}
            </div>
          </div>

          {/* Project List */}
          <div className={styles.projectList}>
            {projects.map((project, index) => {
              const Wrapper = project.slug ? Link : 'div' as any
              const wrapperProps = project.slug
                ? { href: `/portfolio/${project.slug}` }
                : {}
              return (
              <Wrapper
                key={project.title}
                {...wrapperProps}
                className={styles.projectItem}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className={styles.projectItemInner}>
                  <div
                    className={styles.projectHighlight}
                    style={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  />

                  <div className={styles.projectContent}>
                    <div className={styles.projectMain}>
                      <div className={styles.projectTitleRow}>
                        <h3 className={styles.projectTitle}>
                          <span className={styles.projectTitleText}>
                            {project.title}
                            <span
                              className={styles.projectUnderline}
                              style={{ width: hoveredIndex === index ? '100%' : '0%' }}
                            />
                          </span>
                        </h3>
                        <ArrowUpRight
                          className={styles.projectArrow}
                          style={{
                            opacity: hoveredIndex === index ? 1 : 0,
                            transform: hoveredIndex === index
                              ? 'translate(0, 0)'
                              : 'translate(-8px, 8px)',
                          }}
                        />
                      </div>
                      <p
                        className={styles.projectDescription}
                        style={{ color: hoveredIndex === index ? 'rgba(255,255,255,0.7)' : '#888' }}
                      >
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Wrapper>
              )
            })}
            <div className={styles.projectListBorder} />
          </div>

          <Link href="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '32px', fontSize: '14px', fontWeight: 500, color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}>
            See all work →
          </Link>
        </div>
      </div>


      {/* Testimonial */}
      <div className={styles.guaranteeSection}>
        <div className={styles.guaranteeSectionInner}>
          <p className={styles.guaranteeText}>
            &ldquo;Isaac came in, mapped out our workflows, and built us a custom platform that handles what used to take hours. Our team can actually focus on growing the business instead of putting out fires.&rdquo;
          </p>
          <p className={styles.guaranteeTagline}>George Zimny, Co-Founder, ProducifyX</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className={styles.faqSection}>
        <div className={styles.faqSectionInner}>
          <h2 className={styles.faqHeadline}>
            Common questions.<br />
            Straight answers.
          </h2>
          <p className={styles.faqSubtitle}>
            Everything you need to know before we talk.
          </p>

          <div className={styles.faqList}>
            <div className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
              >
                <span>Why not just hire a developer?</span>
                <span className={`${styles.faqIcon} ${openFaq === 0 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 0 ? styles.faqAnswerOpen : ''}`}>
                <p>You can. But a good full-time developer costs $80-150K/year, takes months to find, and still needs someone to manage them. We come in, build what you need, and you're live in weeks — not quarters. And if you need ongoing work, we're there for that too.</p>
              </div>
            </div>
            <div className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
              >
                <span>How long until we see results?</span>
                <span className={`${styles.faqIcon} ${openFaq === 1 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 1 ? styles.faqAnswerOpen : ''}`}>
                <p>Most clients are live in 4-8 weeks. Some automations take days. We'll give you a clear timeline on the first call — no vague estimates.</p>
              </div>
            </div>
            <div className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
              >
                <span>What if it doesn't work?</span>
                <span className={`${styles.faqIcon} ${openFaq === 2 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 2 ? styles.faqAnswerOpen : ''}`}>
                <p>We build in sprints and show you working software along the way — not a big reveal at the end. If something isn't right, we fix it before you've paid for a finished product. Most clients stay on retainer because the systems keep getting better over time.</p>
              </div>
            </div>
            <div className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
              >
                <span>What does it cost?</span>
                <span className={`${styles.faqIcon} ${openFaq === 3 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 3 ? styles.faqAnswerOpen : ''}`}>
                <p>It depends on what you need — that's the honest answer. But we'll tell you on the first call, not after 3 meetings. No generic proposals, no surprise invoices. You'll know the number before we start.</p>
              </div>
            </div>
            <div className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
              >
                <span>Who is this NOT for?</span>
                <span className={`${styles.faqIcon} ${openFaq === 4 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 4 ? styles.faqAnswerOpen : ''}`}>
                <p>If your business doesn't have repeatable processes yet, we're not the right fit — you need to figure out what works before you automate it. But if your team is doing the same manual work every day and you know there's a better way, that's exactly what we fix.</p>
              </div>
            </div>
          </div>

          <a href="#book" className={styles.sectionCta}>Book my free audit →</a>
        </div>
      </div>

      {/* Book a Call Section — Multi-step form */}
      <div ref={bookCallRef} className={styles.bookCallSection} id="book">
        <div className={styles.bookCallSectionInner}>
          <h2 className={styles.bookCallHeadline}>
            Get a free AI audit of <span className={`${styles.highlighted} ${highlightVisible ? styles.highlightedVisible : ''}`}>your operations.</span>
          </h2>

          {formStep <= 6 && (
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${(formStep / 6) * 100}%` }} />
            </div>
          )}

          <input type="text" name="website_url" value={formData.honeypot} onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })} style={{ position: 'absolute', left: '-9999px', opacity: 0 }} tabIndex={-1} autoComplete="off" />

          {submitError && (
            <div className={styles.errorBanner}>
              <p>Something went wrong sending your info. Your data is saved — try again.</p>
              <button className={styles.errorRetryBtn} onClick={() => handleFormSubmit(formData)}>Retry</button>
            </div>
          )}

          {/* Step 1: What do you need? */}
          {formStep === 1 && (
            <div className={styles.qualifyForm}>
              <h3 className={styles.formHeadline}>What are you looking for?</h3>
              <p className={styles.formSubtitle}>Pick the one that best describes your need.</p>
              <div className={styles.optionGrid}>
                {[
                  { value: 'ai', label: 'AI Agents or AI Consulting', key: 'A' },
                  { value: 'automate', label: 'Automate Existing Processes', key: 'B' },
                  { value: 'build', label: 'Custom Software or App', key: 'C' },
                  { value: 'website', label: 'Website or Web App', key: 'D' },
                  { value: 'consulting', label: 'Not Sure — Just Want to Talk', key: 'E' },
                ].map((opt) => (
                  <button key={opt.value} className={`${styles.optionCard} ${formData.lookingFor === opt.value ? styles.optionCardActive : ''}`} onClick={() => { setFormData({ ...formData, lookingFor: opt.value }); setTimeout(() => setFormStep(2), 200) }}>
                    <span className={styles.optionKey}>{opt.key}</span>
                    <span className={styles.optionLabel}>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Contact info */}
          {formStep === 2 && (
            <div className={styles.qualifyForm}>
              <h3 className={styles.formHeadline}>How do we reach you?</h3>
              <div className={styles.formGroup}>
                <label htmlFor="hp-name">Name</label>
                <input type="text" id="hp-name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your full name" autoFocus />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="hp-email">Email</label>
                <input type="email" id="hp-email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="you@company.com" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="hp-phone">Phone</label>
                <input type="tel" id="hp-phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="(555) 555-5555" />
              </div>
              <div className={styles.formNav}>
                <button className={styles.formBackBtn} onClick={handleFormBack}>Back</button>
                <button className={styles.formSubmitBtn} disabled={!formData.name || !formData.email || !formData.phone} onClick={handleFormNext}>Continue</button>
              </div>
            </div>
          )}

          {/* Step 3: What do you need help with */}
          {formStep === 3 && (
            <div className={styles.qualifyForm}>
              <h3 className={styles.formHeadline}>What do you need help with?</h3>
              <div className={styles.formGroup}>
                <textarea id="hp-needs" value={formData.needs} onChange={(e) => setFormData({ ...formData, needs: e.target.value })} placeholder="Tell us about your project, pain points, or goals..." rows={4} autoFocus />
              </div>
              <div className={styles.formNav}>
                <button className={styles.formBackBtn} onClick={handleFormBack}>Back</button>
                <button className={styles.formSubmitBtn} disabled={!formData.needs} onClick={handleFormNext}>Continue</button>
              </div>
            </div>
          )}

          {/* Step 4: Hours on manual work */}
          {formStep === 4 && (
            <div className={styles.qualifyForm}>
              <h3 className={styles.formHeadline}>How many hours per week does your team spend on manual or repetitive tasks?</h3>
              <div className={styles.optionGrid}>
                {[
                  { value: '0-5', label: '0 - 5 hours', key: 'A' },
                  { value: '5-15', label: '5 - 15 hours', key: 'B' },
                  { value: '15-30', label: '15 - 30 hours', key: 'C' },
                  { value: '30+', label: '30+ hours', key: 'D' },
                  { value: 'unsure', label: 'Not sure', key: 'E' },
                ].map((opt) => (
                  <button key={opt.value} className={`${styles.optionCard} ${formData.manualHours === opt.value ? styles.optionCardActive : ''}`} onClick={() => { const updated = { ...formData, manualHours: opt.value }; setFormData(updated); if (updated.email) saveLead(4, updated); setTimeout(() => setFormStep(5), 200) }}>
                    <span className={styles.optionKey}>{opt.key}</span>
                    <span className={styles.optionLabel}>{opt.label}</span>
                  </button>
                ))}
              </div>
              <div className={styles.formNav}><button className={styles.formBackBtn} onClick={handleFormBack}>Back</button></div>
            </div>
          )}

          {/* Step 5: Monthly revenue */}
          {formStep === 5 && (
            <div className={styles.qualifyForm}>
              <h3 className={styles.formHeadline}>What&apos;s your approximate monthly revenue?</h3>
              <div className={styles.optionGrid}>
                {[
                  { value: 'pre-revenue', label: 'Pre-revenue', key: 'A' },
                  { value: '0-10k', label: 'Under $10K', key: 'B' },
                  { value: '10-50k', label: '$10K - $50K', key: 'C' },
                  { value: '50-200k', label: '$50K - $200K', key: 'D' },
                  { value: '200k+', label: '$200K+', key: 'E' },
                ].map((opt) => (
                  <button key={opt.value} className={`${styles.optionCard} ${formData.monthlyRevenue === opt.value ? styles.optionCardActive : ''}`} onClick={() => { const updated = { ...formData, monthlyRevenue: opt.value }; setFormData(updated); if (updated.email) saveLead(5, updated); setTimeout(() => setFormStep(6), 200) }}>
                    <span className={styles.optionKey}>{opt.key}</span>
                    <span className={styles.optionLabel}>{opt.label}</span>
                  </button>
                ))}
              </div>
              <div className={styles.formNav}><button className={styles.formBackBtn} onClick={handleFormBack}>Back</button></div>
            </div>
          )}

          {/* Step 6: Credit score */}
          {formStep === 6 && (
            <div className={styles.qualifyForm}>
              <h3 className={styles.formHeadline}>We offer flexible payment options so budget doesn&apos;t hold you back. Most clients start with a small deposit and pay as we deliver. To see what you qualify for, what&apos;s your estimated credit score?</h3>
              <div className={styles.optionGrid}>
                {[
                  { value: 'below-600', label: 'Below 600', key: 'A' },
                  { value: '600-650', label: '600 - 650', key: 'B' },
                  { value: '650-700', label: '650 - 700', key: 'C' },
                  { value: '700-750', label: '700 - 750', key: 'D' },
                  { value: '750-800+', label: '750 - 800+', key: 'E' },
                ].map((opt) => (
                  <button key={opt.value} className={`${styles.optionCard} ${formData.creditScore === opt.value ? styles.optionCardActive : ''}`} onClick={() => { const updated = { ...formData, creditScore: opt.value }; setFormData(updated); setTimeout(() => handleFormSubmit(updated), 200) }}>
                    <span className={styles.optionKey}>{opt.key}</span>
                    <span className={styles.optionLabel}>{opt.label}</span>
                  </button>
                ))}
              </div>
              <div className={styles.formNav}><button className={styles.formBackBtn} onClick={handleFormBack}>Back</button></div>
            </div>
          )}

          {/* Step 7: Qualified — Cal embed */}
          {formStep === 7 && <CalEmbed key={JSON.stringify(formData)} formData={formData} onBooked={() => saveLead(7, formData, 'booked')} />}

          {/* Step 8: Rejected / Not a fit */}
          {formStep === 8 && (
            <div className={styles.thankYouMessage}>
              <div className={styles.thankYouIcon}>&#10003;</div>
              <h3>Thanks for your interest!</h3>
              <p>We&apos;ve received your information and will be in touch if there&apos;s a fit.</p>
            </div>
          )}
        </div>
      </div>

    </section>
  )
}
