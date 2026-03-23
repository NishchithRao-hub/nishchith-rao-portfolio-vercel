'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const roles = [
  'Software Engineer',
  'Backend Engineer',
  'Full-Stack Engineer',
  'AI/ML Engineer',
]

const techStack = [
  'Java', 'Python', 'Go', 'Spring Boot', 'Node.js',
  'React', 'AWS', 'Kafka', 'Kubernetes', 'PyTorch',
]

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [visible,   setVisible]   = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setRoleIndex(i => (i + 1) % roles.length)
        setVisible(true)
      }, 350)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between bg-grid overflow-hidden"
      style={{
        backgroundColor: '#070D09',
        backgroundImage: `
          linear-gradient(rgba(74, 222, 128, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(74, 222, 128, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: '44px 44px',
      }}
    >
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(55,138,221,0.13), transparent)',
      }} />

      {/* ── Main content ── */}
      <div className="container-custom relative z-10 w-full flex-1 flex items-center">
        <div className="w-full grid md:grid-cols-2 gap-12 items-center py-28">

          {/* ── Left ── */}
          <div className="flex flex-col gap-5" style={{ animation: 'fadeUp 0.7s ease forwards' }}>

            {/* Status pill */}
            <div className="flex items-center gap-2 w-fit">
              <span className="w-2 h-2 rounded-full" style={{
                background: 'var(--color-accent-teal)',
                boxShadow: '0 0 8px var(--color-accent-teal)',
                animation: 'pulse 2.5s ease-in-out infinite',
              }} />
              <span className="section-label">Open to full-time opportunities</span>
            </div>

            {/* Name */}
            <div style={{ lineHeight: 1.05 }}>
              <h1 style={{
                fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)',
                fontWeight: 800, letterSpacing: '-0.03em',
                color: 'var(--color-text-primary)',
              }}>
                Nishchith
              </h1>
              <h2 style={{
                fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)',
                fontWeight: 800, letterSpacing: '-0.03em',
                color: 'var(--color-text-secondary)',
              }}>
                Rao
              </h2>
            </div>

            {/* Role ticker */}
            <div className="flex items-center gap-2 h-8">
              <span className="font-mono text-sm" style={{ color: 'var(--color-accent-blue)' }}>
                &gt;_
              </span>
              <span className="font-medium text-lg" style={{
                color: 'var(--color-accent-blue)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}>
                {roles[roleIndex]}
              </span>
            </div>

            {/* Tagline */}
            <p style={{
              fontSize: '1rem', color: 'var(--color-text-secondary)',
              lineHeight: 1.75, maxWidth: '460px',
            }}>
              I build distributed systems that scale, full-stack products that ship
              and ML pipelines that learn. I write code that improves how people
              live and work.
            </p>

            {/* Location */}
            <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
              <span className="flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                San Francisco Bay Area, CA, USA
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <a
                href="#projects"
                onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '152px', height: '42px', borderRadius: '999px',
                  background: 'var(--color-accent-blue)', color: '#0A0A0F',
                  fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                View My Work
              </a>
              <a
                href="/resume.pdf" download
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  width: '168px', height: '42px', borderRadius: '999px',
                  border: '0.5px solid var(--color-accent-blue)',
                  color: 'var(--color-accent-blue)',
                  fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(55,138,221,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                Download Resume
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1v7M3 5l3 3 3-3M1 10h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              {/* Socials */}
              <div className="flex items-center gap-2">
                {[
                  { href: 'https://github.com/NishchithRao-hub', label: 'GitHub', path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z' },
                  { href: 'https://www.linkedin.com/in/nishchith-rao-p-r/', label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    style={{
                      width: '40px', height: '40px', borderRadius: '10px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'var(--color-background-elevated)',
                      border: '0.5px solid var(--color-border-medium)',
                      color: 'var(--color-text-muted)', textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--color-text-primary)'
                      e.currentTarget.style.borderColor = 'var(--color-border-strong)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--color-text-muted)'
                      e.currentTarget.style.borderColor = 'var(--color-border-medium)'
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: headshot + floating cards ── */}
          <div className="flex justify-center items-center"
            style={{ animation: 'fadeUp 0.7s ease 0.2s both', position: 'relative' }}>

            {/* Outer glow */}
            <div style={{
              position: 'absolute', inset: '-10%',
              background: 'radial-gradient(circle, rgba(55,138,221,0.1) 0%, transparent 65%)',
              pointerEvents: 'none',
            }} />

            {/* Photo */}
            <div style={{
              width: '320px', height: '320px', borderRadius: '50%',
              overflow: 'hidden', position: 'relative',
              border: '2px solid rgba(239,68,68,0.6)',
              boxShadow: '0 0 44px rgba(239,68,68,0.25)',
            }}>
              <Image src="/headshot.jpeg" alt="Nishchith Rao" fill className="object-cover" priority />
            </div>

            {/* Floating badge — top left */}
            <div className="hero-badge" style={{
              position: 'absolute', top: '8%', left: '0',
              background: 'var(--color-background-card)',
              border: '0.5px solid var(--color-border-medium)',
              borderRadius: '10px', padding: '0.6rem 0.85rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              animation: 'fadeUp 0.7s ease 0.5s both',
            }}>
              <p style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Former</p>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Capgemini Engineering</p>
              <p style={{ fontSize: '0.65rem', color: 'var(--color-accent-teal)' }}>Software Developer</p>
            </div>

            {/* Floating badge — bottom right */}
            <div className="hero-badge" style={{
              position: 'absolute', bottom: '8%', right: '0',
              background: 'var(--color-background-card)',
              border: '0.5px solid var(--color-border-medium)',
              borderRadius: '10px', padding: '0.6rem 0.85rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              animation: 'fadeUp 0.7s ease 0.7s both',
            }}>
              <p style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Education</p>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Northeastern University</p>
              <p style={{ fontSize: '0.65rem', color: 'var(--color-accent-purple)' }}>MS Computer Science</p>
            </div>
          </div>
        </div>
      </div>


      {/* Scroll indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'var(--color-text-muted)' }}>
        <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
        <div className="w-px h-8 bg-linear-to-b from-current to-transparent" />
      </div>
    </section>
  )
}