import Link from 'next/link'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <a href="/" className={styles.footerLogo}>
            <img src="/logo/icon.png" alt="Harmon Digital logo" className={styles.footerLogoIcon} />
            <span>Harmon Digital</span>
          </a>
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
            <Link href="/services">Services</Link>
            <Link href="/portfolio">Work</Link>
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
