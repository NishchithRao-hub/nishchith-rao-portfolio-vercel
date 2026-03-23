'use client'

import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'About',      href: '#about'      },
  { label: 'Experience', href: '#experience'  },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Education',  href: '#education'  },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Life',       href: '#life'       },
  { label: 'Contact',    href: '#contact'    },
]

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [showNavbar, setShowNavbar] = useState(false)

  useEffect(() => {
    let scrollTimer

    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      const heroEl = document.getElementById('hero')
      if (heroEl && window.scrollY < heroEl.offsetHeight - 120) {
        setActiveSection('')
      }

      setShowNavbar(true)
      window.clearTimeout(scrollTimer)
      scrollTimer = window.setTimeout(() => setShowNavbar(false), 2500)
    }

    const onMouseMove = e => {
      if (e.clientY <= 90) {
        setShowNavbar(true)
      }
    }

    window.addEventListener('scroll', onScroll)
    window.addEventListener('mousemove', onMouseMove)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
      window.clearTimeout(scrollTimer)
    }
  }, [])

  // Highlight active nav link based on scroll position
  useEffect(() => {
    const ids = navLinks.map(l => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleTop = e => {
    e.preventDefault()
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background-primary/90 backdrop-blur-md border-b border-border-subtle'
          : 'bg-transparent'
      }`}
      style={{
        opacity: showNavbar || menuOpen ? 1 : 0,
        transform: showNavbar || menuOpen ? 'translateY(0)' : 'translateY(-110%)',
        pointerEvents: showNavbar || menuOpen ? 'auto' : 'none',
      }}
    >
      <div className="container-custom flex items-center justify-between h-16">

        {/* Logo / Name */}
        <a
          href="#"
          onClick={handleTop}
          className="font-mono text-lg md:text-xl font-semibold text-text-primary hover:text-accent-blue transition-colors"
        >
          <span className="text-accent-blue">{'<'}</span>
          NR
          <span className="text-accent-blue">{' />'}</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-5">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => handleNav(e, link.href)}
              className={`px-4 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                activeSection === link.href.replace('#', '')
                  ? 'text-accent-blue bg-accent-blue/10'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background-elevated'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background-secondary border-t border-border-subtle px-6 py-4 flex flex-col gap-1">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => handleNav(e, link.href)}
              className={`py-2 text-sm transition-colors ${
                activeSection === link.href.replace('#', '')
                  ? 'text-accent-blue'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}