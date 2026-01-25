'use client'

import { useEffect, useState } from 'react'
import styles from './Header.module.css'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Trigger when scrolled past ~80% of viewport height
      setIsScrolled(window.scrollY > window.innerHeight * 0.8)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={`${styles.container} ${isScrolled ? styles.containerScrolled : ''}`}>
        <a href="/" className={styles.logo}>
          <img src="/logo/icon.png" alt="Harmon Digital" className={styles.logoIcon} />
          <span>Harmon Digital</span>
        </a>

        <a href="#book" className={styles.ctaBtn}>
          Book a call
        </a>
      </div>
    </header>
  )
}
