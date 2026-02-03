'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  ClipboardList,
  Package,
  Truck,
  Users,
  CheckSquare,
  Inbox,
  Zap,
  BarChart3
} from 'lucide-react'
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
    title: "Happy Endings",
    slug: "happy-endings",
    description: "AI email agent handling 80% of customer inquiries autonomously.",
    year: "2025",
    image: "/portfolio/happyendings/hero.jpg",
  },
  {
    title: "Hoplite Capital",
    slug: "hoplite-capital",
    description: "Operations system for 3-location dealership. Owner reduced to 20 hrs/week.",
    year: "2025",
    image: "/portfolio/hoplite/hero.jpg",
  },
  {
    title: "Neighbors Bank",
    slug: "neighbors-bank",
    description: "RAG-powered Slack bot serving 200+ team members.",
    year: "2025",
    image: "/portfolio/neighborsbank/slack-conversation.png",
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
      <div className={styles.container}>
        {/* Left Content */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.heroLabel}>Custom Software & Automation</span>
          <h1 className={styles.headline}>
            We systematize your business. You sell for more.
          </h1>

          <p className={styles.subtitle}>
            We build custom software and automation that lets your business run without you.
            Buyers pay a premium for turnkey operations.
          </p>

          <a href="#book" className={styles.ctaBtn}>
            Book a free assessment
          </a>

          <div className={styles.trust}>
            <p className={styles.trustLabel}>Businesses we've worked with</p>
            <div className={styles.logoSlider}>
              <div className={styles.logoTrack}>
                {/* Double the logos for seamless infinite scroll */}
                {[...clientLogos, ...clientLogos].map((logo, index) => (
                  <div key={index} className={styles.logoSlide}>
                    <img src={logo} alt="Client logo" className={styles.clientLogo} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Vertical Divider */}
        <div className={styles.heroDivider} />

        {/* Right Screenshots */}
        <motion.div
          className={styles.screenshots}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Dashboard Card */}
          <div className={styles.screenshotCard}>
            <div className={styles.cardHeader}>
              <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                  <img src="https://i.pravatar.cc/40?img=11" alt="User avatar" />
                </div>
                <div className={styles.userDetails}>
                  <span className={styles.userName}>Operations Hub</span>
                  <span className={styles.userRole}>Internal Portal</span>
                </div>
              </div>
              <button className={styles.menuBtn}>...</button>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.sidebarSection}>
                <span className={styles.sectionLabel}>Operations</span>
                <div className={styles.navItem}><ClipboardList size={16} className={styles.navIcon} /> Orders</div>
                <div className={styles.navItem}><Package size={16} className={styles.navIcon} /> Inventory</div>
                <div className={styles.navItem}><Truck size={16} className={styles.navIcon} /> Fulfillment</div>
              </div>
              <div className={styles.sidebarSection}>
                <span className={styles.sectionLabel}>Team</span>
                <div className={styles.navItem}><Users size={16} className={styles.navIcon} /> Staff</div>
                <div className={`${styles.navItem} ${styles.navItemActive}`}><CheckSquare size={16} className={styles.navIcon} /> Tasks</div>
                <div className={styles.navItem}>
                  <Inbox size={16} className={styles.navIcon} /> Requests
                  <span className={styles.badge}>8</span>
                </div>
              </div>
              <div className={styles.sidebarSection}>
                <div className={styles.navItem}><Zap size={16} className={styles.navIcon} /> Automations</div>
                <div className={styles.navItem}><BarChart3 size={16} className={styles.navIcon} /> Reports</div>
              </div>
              <button className={styles.addNewBtn}>+ Add new</button>
            </div>
          </div>

          {/* Data Table Card */}
          <div className={styles.tableCard}>
            <div className={styles.tableHeader}>
              <h3 className={styles.tableTitle}>Active Tasks</h3>
              <button className={styles.exportBtn}>↓ Export as CSV</button>
            </div>
            <div className={styles.tableControls}>
              <button className={styles.sortBtn}>≡ Sort by priority</button>
              <button className={styles.filterBtn}>▽ Filters</button>
            </div>
            <div className={styles.tableContent}>
              <div className={styles.tableRow}>
                <span className={styles.customerName}>Process new orders</span>
                <span className={styles.customerEmail}>Auto-assigned</span>
                <span className={styles.customerOrders}>12</span>
                <span className={styles.customerSpent}>High</span>
                <span className={`${styles.statusBadge} ${styles.statusRunning}`}>Running</span>
              </div>
              <div className={styles.tableRow}>
                <span className={styles.customerName}>Inventory sync</span>
                <span className={styles.customerEmail}>Scheduled</span>
                <span className={styles.customerOrders}>—</span>
                <span className={styles.customerSpent}>Med</span>
                <span className={`${styles.statusBadge} ${styles.statusComplete}`}>Complete</span>
              </div>
              <div className={styles.tableRow}>
                <span className={styles.customerName}>Send follow-ups</span>
                <span className={styles.customerEmail}>AI Agent</span>
                <span className={styles.customerOrders}>8</span>
                <span className={styles.customerSpent}>Med</span>
                <span className={`${styles.statusBadge} ${styles.statusPending}`}>Pending</span>
              </div>
              <div className={styles.tableRow}>
                <span className={styles.customerName}>Generate report</span>
                <span className={styles.customerEmail}>Weekly</span>
                <span className={styles.customerOrders}>1</span>
                <span className={styles.customerSpent}>Low</span>
                <span className={`${styles.statusBadge} ${styles.statusQueued}`}>Queued</span>
              </div>
              <div className={styles.tableRow}>
                <span className={styles.customerName}>Update pricing</span>
                <span className={styles.customerEmail}>Manual review</span>
                <span className={styles.customerOrders}>3</span>
                <span className={styles.customerSpent}>High</span>
                <span className={`${styles.statusBadge} ${styles.statusRunning}`}>Running</span>
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
              Owner-dependent businesses<br />
              sell for less.
            </h2>
            <p className={styles.whySubtitle}>
              Buyers discount heavily for key-person risk. If everything
              runs through you, expect a lower multiple—or no deal at all.
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
              <h3 className={styles.benefitTitle}>You are the bottleneck</h3>
              <p className={styles.benefitDesc}>
                Every decision, every process, every
                customer issue runs through you.
                Buyers see risk.
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h3 className={styles.benefitTitle}>Lower valuations</h3>
              <p className={styles.benefitDesc}>
                Key-person risk means lower
                multiples. Buyers won't pay
                premium for uncertainty.
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3 className={styles.benefitTitle}>Deals drag on</h3>
              <p className={styles.benefitDesc}>
                Due diligence takes longer when
                there's nothing documented.
                Buyers get cold feet.
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
              <h3 className={styles.benefitTitle}>Deals fall through</h3>
              <p className={styles.benefitDesc}>
                Buyers walk away when they see
                how dependent the business is
                on you being there.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className={styles.servicesSection}>
        <div className={styles.servicesSectionInner}>
          <h2 className={styles.servicesHeadline}>
            What we build.<br />
            Everything buyers want to see.
          </h2>
          <p className={styles.servicesSubtitle}>
            Turnkey operations that prove your business runs without you.
            The assets that command premium multiples.
          </p>

          <div className={styles.servicesGrid}>
            <div className={styles.servicesColumn}>
              <div className={styles.serviceItem}>
                <span className={styles.serviceIcon}>◇</span>
                <span>Operations Portal</span>
              </div>
              <div className={styles.serviceItem}>
                <span className={styles.serviceIcon}>◎</span>
                <span>AI Customer Service Agent</span>
              </div>
              <div className={styles.serviceItem}>
                <span className={styles.serviceIcon}>▤</span>
                <span>Order & Fulfillment System</span>
              </div>
              <div className={styles.serviceItem}>
                <span className={styles.serviceIcon}>⌁</span>
                <span>Sales Pipeline Automation</span>
              </div>
              <div className={styles.serviceItem}>
                <span className={styles.serviceIcon}>▢</span>
                <span>Employee Onboarding System</span>
              </div>
              <div className={styles.serviceItem}>
                <span className={styles.serviceIcon}>▧</span>
                <span>Complete SOPs & Documentation</span>
              </div>
            </div>
            <div className={styles.servicesColumn}>
              <div className={styles.serviceItem}>
                <span className={styles.serviceIcon}>◈</span>
                <span>Workflow Automation</span>
              </div>
              <div className={styles.serviceItem}>
                <span className={styles.serviceIcon}>▣</span>
                <span>System Integrations</span>
              </div>
              <div className={styles.serviceItem}>
                <span className={styles.serviceIcon}>◉</span>
                <span>Real-time Dashboards</span>
              </div>
              <div className={styles.serviceItem}>
                <span className={styles.serviceIcon}>△</span>
                <span>Financial Reporting</span>
              </div>
              <div className={styles.serviceItem}>
                <span className={styles.serviceIcon}>○</span>
                <span>Knowledge Base & Training</span>
              </div>
              <div className={styles.serviceItem}>
                <span className={styles.serviceIcon}>+</span>
                <span>Custom to your business</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className={styles.howSection} id="how-it-works">
        <div className={styles.howSectionInner}>
          <h2 className={styles.howHeadline}>
            How it works.<br />
            Buyer-ready in 60-90 days.
          </h2>
          <p className={styles.howSubtitle}>
            We systematize your business. You sell for more. We get paid from the increase.
          </p>

          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span>1</span>
                <div className={styles.stepLine} />
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Free assessment</h3>
                <p className={styles.stepDesc}>
                  We analyze your operations, identify what's keeping buyers away,
                  and show you exactly what needs to be systematized. No cost,
                  no commitment.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span>2</span>
                <div className={styles.stepLine} />
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>We systematize</h3>
                <p className={styles.stepDesc}>
                  Custom automation, AI agents, and documentation—everything
                  buyers want to see. Owner involvement reduced by 60-70% within 90 days.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span>3</span>
                <div className={styles.stepLine} />
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>You go to market</h3>
                <p className={styles.stepDesc}>
                  List your business with confidence. Buyers see turnkey operations,
                  complete documentation, and zero key-person risk.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span>4</span>
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>We get paid at closing</h3>
                <p className={styles.stepDesc}>
                  You sell for more than you would have. We take 8% of the
                  increase from sale proceeds. You keep the rest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div
        ref={portfolioRef}
        onMouseMove={handleMouseMove}
        className={styles.portfolioSection}
      >
        <div className={styles.portfolioSectionInner}>
          <span className={styles.sectionLabel}>Selected Work</span>
          <h2 className={styles.portfolioHeadline}>
            Real results.<br />
            Businesses we've systematized.
          </h2>
          <p className={styles.portfolioSubtitle}>
            Operations portals, AI agents, and automation built for businesses preparing to exit.
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
              {projects.map((project, index) => (
                <img
                  key={project.title}
                  src={project.image}
                  alt={project.title}
                  className={styles.previewImage}
                  style={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    scale: hoveredIndex === index ? 1 : 1.1,
                    filter: hoveredIndex === index ? 'none' : 'blur(10px)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Project List */}
          <div className={styles.projectList}>
            {projects.map((project, index) => (
              <Link
                key={project.title}
                href={`/portfolio/${project.slug}`}
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
              </Link>
            ))}
            <div className={styles.projectListBorder} />
          </div>
        </div>
      </div>

      {/* Guarantee Section */}
      <div className={styles.guaranteeSection}>
        <div className={styles.guaranteeSectionInner}>
          <h2 className={styles.guaranteeHeadline}>Zero-Risk Guarantee</h2>
          <p className={styles.guaranteeText}>
            If your business sells for less than <strong>$150K above</strong> baseline valuation:
            full refund of upfront cost, no success fee owed, and you keep all the systems we built.
          </p>
          <p className={styles.guaranteeTagline}>We only win if you win.</p>
        </div>
      </div>

      {/* Pricing Section */}
      <div className={styles.pricingSection} id="pricing">
        <div className={styles.pricingSectionInner}>
          <h2 className={styles.pricingHeadline}>
            Two ways to work with us.
          </h2>
          <p className={styles.pricingSubtitle}>
            Whether you're growing or exiting, we build the systems you need.
          </p>

          {/* Exit Systematization - Two Cards */}
          <div className={styles.exitCards}>
            <div className={styles.exitCardLeft}>
              <h3 className={styles.exitCardName}>Exit Systematization</h3>
              <p className={styles.exitCardFor}>For businesses selling in 6-12 months.</p>
              <ul className={styles.exitCardFeatures}>
                <li><span className={styles.featureIcon}>✓</span>Full systematization package</li>
                <li><span className={styles.featureIcon}>⚡</span>AI agents & automation</li>
                <li><span className={styles.featureIcon}>◎</span>90-day engagement</li>
                <li><span className={styles.featureIcon}>○</span>Success fee paid from proceeds</li>
              </ul>
              <a href="#book" className={styles.modelCta}>Get started</a>
            </div>
            <div className={styles.exitCardsArrow}>→</div>
            <div className={styles.exitCardRight}>
              <h4 className={styles.breakdownTitle}>Example</h4>
              <div className={styles.breakdownRow}>
                <span>Business valued today</span>
                <span>$2,000,000</span>
              </div>
              <div className={styles.breakdownRow}>
                <span>Sells for after systematization</span>
                <span>$2,500,000</span>
              </div>
              <div className={styles.breakdownRow}>
                <span>Valuation increase</span>
                <span>$500,000</span>
              </div>
              <div className={styles.breakdownDivider} />
              <div className={styles.breakdownRow}>
                <span>Retainer ($2,500 × 3 months)</span>
                <span>$7,500</span>
              </div>
              <div className={styles.breakdownRow}>
                <span>Success fee (8% of increase)</span>
                <span>$40,000</span>
              </div>
              <div className={styles.breakdownDivider} />
              <div className={`${styles.breakdownRow} ${styles.breakdownTotal}`}>
                <span>You net extra</span>
                <span>$452,500</span>
              </div>
              <div className={`${styles.breakdownRow} ${styles.breakdownRoi}`}>
                <span>ROI</span>
                <span>951%</span>
              </div>
              <p className={styles.breakdownNote}>If we don't increase the valuation, no success fee is charged.</p>
            </div>
          </div>

          {/* Ongoing Retainer - Compact Card */}
          <div className={styles.retainerCard}>
            <div className={styles.retainerCardMain}>
              <div className={styles.retainerCardInfo}>
                <h3 className={styles.retainerCardName}>Ongoing Retainer</h3>
                <p className={styles.retainerCardFor}>For growing businesses. Month-to-month.</p>
              </div>
              <div className={styles.retainerCardPrice}>
                <span className={styles.retainerPrice}>$2,500–$5,000</span>
                <span className={styles.retainerPeriod}>/mo</span>
              </div>
              <a href="#book" className={styles.retainerCta}>Get started</a>
            </div>
          </div>
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
                <span>What if my valuation doesn't increase?</span>
                <span className={`${styles.faqIcon} ${openFaq === 0 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 0 ? styles.faqAnswerOpen : ''}`}>
                <p>You pay the monthly retainer during the build. Our success fee is 8% of the valuation increase, paid from sale proceeds. If systematization doesn't increase what buyers will pay, we don't collect the success fee.</p>
              </div>
            </div>
            <div className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
              >
                <span>How do you measure the valuation increase?</span>
                <span className={`${styles.faqIcon} ${openFaq === 1 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 1 ? styles.faqAnswerOpen : ''}`}>
                <p>We work with your broker or get an independent assessment to establish your baseline valuation before we start. When you sell, the increase is the difference between what you actually sell for and that baseline. Simple, transparent, no games.</p>
              </div>
            </div>
            <div className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
              >
                <span>How long until my business is ready to sell?</span>
                <span className={`${styles.faqIcon} ${openFaq === 2 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 2 ? styles.faqAnswerOpen : ''}`}>
                <p>60-90 days for full implementation. Most clients go to market within 3-4 months of starting. After that, buyers see turnkey operations instead of key-person risk.</p>
              </div>
            </div>
            <div className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
              >
                <span>What if I'm not ready to sell yet?</span>
                <span className={`${styles.faqIcon} ${openFaq === 3 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 3 ? styles.faqAnswerOpen : ''}`}>
                <p>We work best with businesses actively preparing to go to market. If you're more than 6 months out, let's talk—we can discuss whether the timing makes sense or if you should reach out when you're closer.</p>
              </div>
            </div>
            <div className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
              >
                <span>Is this right for my business?</span>
                <span className={`${styles.faqIcon} ${openFaq === 4 ? styles.faqIconOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === 4 ? styles.faqAnswerOpen : ''}`}>
                <p>If you're doing $500K+ in revenue and you're the bottleneck, probably yes. We work best with service businesses, agencies, distributors, and companies where buyers would discount for key-person risk. Book a call—we'll tell you honestly if we can help.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book a Call Section */}
      <div ref={bookCallRef} className={styles.bookCallSection} id="book">
        <div className={styles.bookCallSectionInner}>
          <h2 className={styles.bookCallHeadline}>
            See what custom software can do for <span className={`${styles.highlighted} ${highlightVisible ? styles.highlightedVisible : ''}`}>your valuation.</span>
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
                    <option value="build">Build internal software/tools</option>
                    <option value="automate">Automate existing processes</option>
                    <option value="both">Both - full systematization</option>
                    <option value="consulting">Just consulting/advice</option>
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

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerTop}>
            <div className={styles.footerLogo}>
              <img src="/logo/icon.png" alt="Harmon Digital logo" className={styles.footerLogoIcon} />
              <span>Harmon Digital</span>
            </div>
            <div className={styles.footerContact}>
              <a href="mailto:info@harmon-digital.com" className={styles.footerEmail}>info@harmon-digital.com</a>
              <div className={styles.footerSocials}>
                <a href="https://www.linkedin.com/company/harmon-digital/" target="_blank" rel="noopener noreferrer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p className={styles.footerCredit}>Made with love by Harmon Digital.</p>
            <div className={styles.footerLinks}>
              <Link href="/partners">Partners</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}
