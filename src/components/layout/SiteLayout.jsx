import { useEffect, useState } from 'react'
import { REGISTER_URL } from '../../config/urls'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const links = [
    { label: 'About', href: '#about', target: 'about' },
    { label: 'Schedule', href: '/schedule' },
    { label: 'Panelists', href: '#panelists', target: 'panelists' },
    { label: 'Sponsors', href: '/sponsors' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (event, target) => {
    const section = document.getElementById(target)

    setMenuOpen(false)
    if (!section) return

    event.preventDefault()
    section.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
    window.history.replaceState(null, '', `#${target}`)
  }

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 flex h-16 w-full items-center justify-between px-6 transition-all duration-500 md:h-[72px] md:px-10 ${scrolled ? 'is-scrolled' : ''}`}
      style={{
        background: scrolled ? 'rgba(38, 24, 19, 0.88)' : menuOpen ? 'rgba(0, 0, 0, 0.97)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(247, 51, 1, 0.32)' : '1px solid transparent',
        boxShadow: scrolled ? '0 10px 32px rgba(247, 51, 1, 0.1)' : 'none',
      }}
    >
      <a href="#home" className="flex shrink-0 items-center" aria-label="10 Hours Houston home" onClick={(event) => scrollToSection(event, 'home')}>
        <img className="brand-logo block h-auto w-[120px]" src="/10-hours-houston-logo.svg" alt="10 Hours Houston" />
      </a>

      <button
        className="menu-button ml-auto hidden flex-col items-center justify-center gap-1.5 p-1"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((value) => !value)}
      >
        <span /><span /><span />
      </button>

      <nav className={`main-nav ml-auto flex items-center gap-8 ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        {links.map(({ label, href, target }, index) => (
          <a className={index === 4 ? 'nav-register' : ''} href={href} key={label} onClick={target ? (event) => scrollToSection(event, target) : undefined}>
            {label}
          </a>
        ))}
      </nav>

      <a className="header-register ml-8 inline-flex shrink-0 items-center bg-[#f73301] px-5 py-2.5 transition-colors hover:bg-[#c42a01]" href={REGISTER_URL} target="_blank" rel="noreferrer">
        Register
      </a>
    </header>
  )
}

export function SocialIcon({ name, className = 'h-5 w-5' }) {
  const commonProps = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    'aria-hidden': true,
  }

  if (name === 'Instagram') {
    return (
      <svg {...commonProps}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  if (name === 'TikTok') {
    return (
      <svg {...commonProps} fill="currentColor" stroke="none">
        <path d="M15.6 3c.32 2.22 1.57 3.55 3.74 3.69v3.15a8.4 8.4 0 0 1-3.7-.86v6.1a5.92 5.92 0 1 1-5.1-5.87v3.2a2.75 2.75 0 1 0 1.91 2.67V3h3.15Z" />
      </svg>
    )
  }

  if (name === 'Facebook') {
    return (
      <svg {...commonProps} fill="currentColor" stroke="none">
        <path d="M13.7 21v-8h2.7l.4-3.1h-3.1V7.93c0-.9.25-1.51 1.56-1.51h1.67V3.63a22.3 22.3 0 0 0-2.43-.13c-2.4 0-4.05 1.47-4.05 4.16V9.9H7.73V13h2.72v8h3.25Z" />
      </svg>
    )
  }

  if (name === 'YouTube') {
    return (
      <svg {...commonProps}>
        <path d="M21.2 7.1a2.8 2.8 0 0 0-2-2C17.45 4.6 12 4.6 12 4.6s-5.45 0-7.2.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2.3 12a29 29 0 0 0 .5 4.9 2.8 2.8 0 0 0 2 2c1.75.5 7.2.5 7.2.5s5.45 0 7.2-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-4.9 29 29 0 0 0-.5-4.9Z" />
        <path d="m10 15.2 5-3.2-5-3.2v6.4Z" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  return (
    <svg {...commonProps} fill="currentColor" stroke="none">
      <path d="M5.4 7.8A1.8 1.8 0 1 0 5.4 4a1.8 1.8 0 0 0 0 3.8ZM3.8 9.3H7V20H3.8V9.3ZM9 9.3h3v1.46h.04c.42-.8 1.45-1.65 2.98-1.65 3.18 0 3.77 2.1 3.77 4.82V20h-3.16v-5.38c0-1.28-.02-2.94-1.79-2.94-1.8 0-2.07 1.4-2.07 2.85V20H9V9.3Z" />
    </svg>
  )
}

export function Footer() {
  const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/10hourshouston' },
    { name: 'Facebook', href: 'https://www.facebook.com/share/1J3EpML7BD/?mibextid=wwXIfr' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/10-hours-houston/' },
    { name: 'YouTube', href: '#' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@10hourshouston' },
  ]

  return (
    <footer className="border-t border-white/8 bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <img src="/10-hours-houston-logo.svg" alt="10 Hours Houston" className="mb-4 h-10 w-auto object-contain brightness-0 invert" />
            <img src="/witnesses-white.png" alt="Witnesses" className="mb-6 h-8 w-auto object-contain opacity-60" />
          </div>

          <div>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">Where</p>
            <p className="text-sm leading-relaxed text-white/65">
              Dominion Chapel Houston<br />
              1203 Cravens Rd<br />
              Stafford, TX 77477
            </p>
            <a
              href="https://maps.google.com/?q=1203+Cravens+Rd+Stafford+TX"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-[#f73301] transition-opacity hover:opacity-80"
            >
              Open in Maps →
            </a>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">When</p>
            <p className="text-sm text-white/65">Saturday, October 31, 2026</p>
            <p className="text-sm text-white/65">10:00 AM — 8:00 PM</p>
            <a href="/schedule" className="mt-4 inline-flex text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f73301] transition-opacity hover:opacity-75">View full schedule →</a>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">Contact</p>
            <a href="mailto:contact@10hourshouston.com" className="mb-6 block text-sm text-white/50 transition-colors hover:text-white">
              contact@10hourshouston.com
            </a>
            <a href="/sponsors" className="mb-6 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f73301] transition-opacity hover:opacity-75">
              Partner with us →
            </a>
            <div className="flex gap-4">
              {socialLinks.map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  title={name}
                  className="text-white/30 transition-colors hover:text-white"
                >
                  <SocialIcon name={name} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/6 pt-8 sm:flex-row sm:items-center">
          <p className="text-[11px] tracking-wide text-white/20">© 2026 10 Hours Houston. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export function InnerPageHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[#f73301]/35 bg-[#261813]/95 px-6 shadow-[0_10px_32px_rgba(247,51,1,0.10)] backdrop-blur-md md:h-[72px] md:px-10">
      <a href="/" className="flex shrink-0 items-center" aria-label="10 Hours Houston home">
        <img className="sponsor-brand block h-auto w-[120px]" src="/10-hours-houston-logo.svg" alt="10 Hours Houston" />
      </a>
      <div className="flex items-center gap-5">
        <a href="/" className="sponsor-back-link text-[10px] font-semibold uppercase tracking-[0.16em] transition-opacity hover:opacity-75">
          ← Back Home
        </a>
        <a className="sponsor-register hidden bg-[#f73301] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#c42a01] sm:inline-flex" href={REGISTER_URL} target="_blank" rel="noreferrer">
          Register
        </a>
      </div>
    </header>
  )
}

