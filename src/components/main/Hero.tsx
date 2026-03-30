'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import styles from './Hero.module.css'
import { trackMetaEvent } from '@/components/analytics/MetaPixel'

// Cal.com embed component
function CalEmbed() {
  const calRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // @ts-ignore
    if (window.Cal) {
      // Cal already loaded, just initialize
      // @ts-ignore
      window.Cal.ns["15min"]("inline", {
        elementOrSelector: "#my-cal-inline-15min",
        config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
        calLink: "harmon-digital/15min",
      })
      // @ts-ignore
      window.Cal.ns["15min"]("on", {
        action: "bookingSuccessful",
        callback: () => {
          trackMetaEvent('Schedule', {
            content_name: 'Homepage Cal Booking',
            content_category: 'Contact',
          })
        }
      })
    } else {
      // Load Cal.com embed script
      const script = document.createElement('script')
      script.innerHTML = `
        (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
        Cal("init", "15min", {origin:"https://app.cal.com"});
        Cal.ns["15min"]("inline", {
          elementOrSelector:"#my-cal-inline-15min",
          config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true"},
          calLink: "harmon-digital/15min",
        });
        Cal.ns["15min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
        Cal.ns["15min"]("on", {
          action: "bookingSuccessful",
          callback: function() {
            if (window.fbq) {
              window.fbq('track', 'Schedule', {
                content_name: 'Homepage Cal Booking',
                content_category: 'Contact'
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

  // Qualification form state
  const [formStep, setFormStep] = useState(0) // 0 = form, 1 = qualified, 2 = not qualified
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    lookingFor: '',
    needs: '',
    honeypot: '', // spam trap - should remain empty
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Spam check - if honeypot is filled, it's a bot
    if (formData.honeypot) {
      setFormStep(2)
      return
    }

    // Only filter out salespeople trying to sell services
    const isSalesPitch = formData.lookingFor === 'sell'
    if (isSalesPitch) {
      setFormStep(2)
      return
    }

    // Send form data to API
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
    } catch (error) {
      console.error('Failed to submit form:', error)
    }

    // Track Lead event for Meta Pixel
    trackMetaEvent('Lead', {
      content_name: 'Homepage Contact Form',
      content_category: 'Contact',
    })

    // Everyone else is qualified
    setFormStep(1)
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

          <div className={styles.trust}>
            <div className={styles.logoSlider}>
              <div className={styles.logoTrack}>
                {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
                  <div key={index} className={styles.logoSlide}>
                    <img src={logo} alt="Client logo" className={styles.clientLogo} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
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

      {/* Book a Call Section */}
      <div ref={bookCallRef} className={styles.bookCallSection} id="book">
        <div className={styles.bookCallSectionInner}>
          <h2 className={styles.bookCallHeadline}>
            Get a free AI audit of <span className={`${styles.highlighted} ${highlightVisible ? styles.highlightedVisible : ''}`}>your operations.</span>
          </h2>

          {formStep === 0 && (
            <form className={styles.qualifyForm} onSubmit={handleFormSubmit}>
              <p className={styles.formSubtitle}>Tell us what you need so we can come prepared.</p>

              {/* Honeypot field - hidden from users, bots will fill it */}
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

                <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                  <label htmlFor="lookingFor">What are you looking for?</label>
                  <select
                    id="lookingFor"
                    required
                    value={formData.lookingFor}
                    onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                  >
                    <option value="">Select one</option>
                    <option value="build">Build custom software or an app</option>
                    <option value="ai">AI agents or AI consulting</option>
                    <option value="automate">Automate existing processes</option>
                    <option value="website">Website or web app</option>
                    <option value="consulting">Not sure yet — just want to talk</option>
                    <option value="sell">I want to sell you something</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="needs">Tell us about your project</label>
                <textarea
                  id="needs"
                  value={formData.needs}
                  onChange={(e) => setFormData({ ...formData, needs: e.target.value })}
                  placeholder="What would you like to build or automate? (optional)"
                  rows={3}
                />
              </div>

              <button type="submit" className={styles.formSubmitBtn}>
                Continue
              </button>
            </form>
          )}

          {formStep === 1 && <CalEmbed />}

          {formStep === 2 && (
            <div className={styles.thankYouMessage}>
              <div className={styles.thankYouIcon}>✓</div>
              <h3>Thanks for your interest!</h3>
              <p>We've received your information and will be in touch soon.</p>
            </div>
          )}
        </div>
      </div>

    </section>
  )
}
