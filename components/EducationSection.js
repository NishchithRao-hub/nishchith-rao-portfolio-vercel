'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const degrees = [
  {
    side:       'left',
    degree:     'Master of Science (MS)',
    field:      'Computer Science',
    school:     'Northeastern University',
    location:   'Boston, MA, USA',
    period:     'Sep 2023 – May 2025',
    logo:       '/logos/northeastern.png',
    accent:     '#CC2233',
    gpa:        3.62 / 4.0,
    cover:    'linear-gradient(to right, #7A0012, #CC2233)',
    courses:    ['Algorithms', 'Distributed Systems', 'Design Principles', 'Database Management', 'Machine Learning', 'Cloud Computing'],
    highlight: {
      label: 'AI Club - Member',
      desc:  'Hosted hackathons, guest lectures and workshops on AI foundations, ethical AI and emerging trends in machine learning.',
    },
  },
  {
    side:       'right',
    degree:     'Bachelor of Science (BS)',
    field:      'Computer Science',
    school:     'Presidency University',
    location:   'Bangalore, India',
    period:     'Aug 2018 – Jun 2022',
    logo:       '/logos/presidency.png',
    accent:     '#1A6FCC',
    gpa:        3.6 / 4.0,
    cover:    'linear-gradient(to left, #0A3A7A, #1A6FCC)',
    courses:    ['Data Structures', 'Object Oriented Programming', 'Operating Systems', 'Computer Networks', 'Artificial Intelligence'],
    highlight: {
      label: 'Foundation',
      desc:  'Where it all started - four years of building the fundamentals that every system I\'ve built since has rested on.',
    },
  },
]

// Cream/parchment page background
const PAGE_BG     = '#F5F0E8'
const PAGE_LINE   = 'rgba(180,160,120,0.35)'
const PAGE_MARGIN = 'rgba(200,100,100,0.25)'
const TEXT_DARK   = '#1A1210'
const TEXT_MED    = '#4A3828'
const TEXT_LIGHT  = '#8A7060'

function BookPage({ deg, isOpen, side, imgLoaded, onImgLoad }) {
  const isLeft = side === 'left'
  return (
    <div style={{
      flex: 1,
      background: isLeft
        ? `linear-gradient(to right, #EDE8DC, ${PAGE_BG})`
        : `linear-gradient(to left,  #EDE8DC, ${PAGE_BG})`,
      padding: '2.4rem 2.4rem 3rem',
      position: 'relative',
      opacity:    isOpen ? 1 : 0,
      transform:  isOpen ? 'rotateY(0deg)' : isLeft ? 'rotateY(-35deg)' : 'rotateY(35deg)',
      transition: 'opacity 0.8s ease, transform 0.9s cubic-bezier(0.23,1,0.32,1)',
      transformOrigin: isLeft ? 'right center' : 'left center',
      overflow: 'hidden',
      minHeight: '580px',
      boxShadow: isLeft
        ? 'inset -6px 0 14px rgba(0,0,0,0.12)'
        : 'inset  6px 0 14px rgba(0,0,0,0.12)',
    }}>

      {/* Ruled horizontal lines */}
      {[...Array(28)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute', left: '3.4rem', right: '1.2rem',
          top: `${4.0 + i * 4.0}rem`, height: '0.5px',
          background: PAGE_LINE, pointerEvents: 'none',
        }} />
      ))}

      {/* Margin line */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        left: '3rem', width: '1px',
        background: PAGE_MARGIN,
      }} />

      {/* Page number */}
      <p style={{
        position: 'absolute', bottom: '0.9rem',
        [isLeft ? 'right' : 'left']: '1.2rem',
        fontSize: '0.68rem', color: TEXT_LIGHT,
        fontFamily: 'Georgia, serif', fontStyle: 'italic',
      }}>
        {isLeft ? '1' : '2'}
      </p>

      {/* Logo — left-aligned on both pages */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1.1rem' }}>
        <div style={{
          width: '76px', height: '76px', borderRadius: '50%',
          background: '#fff',
          border: `2.5px solid ${deg.accent}`,
          boxShadow: `0 4px 16px ${deg.accent}44, 0 2px 6px rgba(0,0,0,0.15)`,
          overflow: 'hidden', position: 'relative', flexShrink: 0,
        }}>
          <Image src={deg.logo} alt={deg.school} fill className="object-contain p-1.5"
            onLoad={onImgLoad}
            onError={e => { e.currentTarget.style.display = 'none' }} />
          {!imgLoaded && (
            <span style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '0.75rem', fontWeight: 700,
              color: deg.accent, fontFamily: 'var(--font-mono)',
            }}>
              {deg.school.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* School */}
      <p style={{
        fontSize: '0.9rem', fontWeight: 700, color: deg.accent,
        textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '3px',
      }}>
        {deg.school}
      </p>
      <p style={{ fontSize: '0.72rem', color: TEXT_DARK, marginBottom: '1.1rem', fontStyle: 'italic' }}>
        {deg.location}
      </p>

      {/* Degree card */}
      <div style={{
        background: `${deg.accent}12`,
        border: `1px solid ${deg.accent}44`,
        borderLeft: `3px solid ${deg.accent}`,
        borderRadius: '0 8px 8px 0',
        padding: '0.95rem 1.1rem',
        marginBottom: '1.2rem',
      }}>
        <p style={{
          fontSize: '0.65rem', fontWeight: 700, color: deg.accent,
          textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '5px',
        }}>
          {deg.degree}
        </p>
        <h3 style={{
          fontSize: '1.45rem', fontWeight: 800, color: TEXT_DARK,
          lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '5px',
        }}>
          {deg.field}
        </h3>
        <p style={{
          fontSize: '0.72rem', color: deg.accent,
          fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', opacity: 0.85,
        }}>
          {deg.period}
        </p>
      </div>

      {/* Coursework divider — more visible */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.8rem' }}>
        <div style={{ flex: 1, height: '1px', background: `${deg.accent}50` }} />
        <span style={{
          fontSize: '0.65rem', fontWeight: 700, color: deg.accent,
          fontFamily: 'Georgia, serif', fontStyle: 'italic',
          letterSpacing: '0.08em', opacity: 0.9,
        }}>
          Coursework
        </span>
        <div style={{ flex: 1, height: '1px', background: `${deg.accent}50` }} />
      </div>

      {/* Courses */}
      <div className="flex flex-wrap gap-2" style={{ marginBottom: '1.1rem' }}>
        {deg.courses.map((c, i) => (
          <span key={i} style={{
            fontSize: '0.72rem', fontWeight: 600, padding: '3px 11px',
            borderRadius: '999px',
            background: '#fff',
            border: `1px solid ${deg.accent}55`,
            color: deg.accent,
            boxShadow: `0 1px 3px rgba(0,0,0,0.07)`,
          }}>
            {c}
          </span>
        ))}
      </div>

      {/* Highlight note */}
      <div style={{
        background: `${deg.accent}0D`,
        border: `0.5px solid ${deg.accent}33`,
        borderLeft: `2.5px solid ${deg.accent}`,
        borderRadius: '0 6px 6px 0',
        padding: '0.75rem 1rem',
      }}>
        <p style={{
          fontSize: '0.65rem', fontWeight: 700, color: deg.accent,
          textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px',
        }}>
          {deg.highlight.label}
        </p>
        <p style={{ fontSize: '0.8rem', color: TEXT_MED, lineHeight: 1.65 }}>
          {deg.highlight.desc}
        </p>
      </div>
    </div>
  )
}

export default function EducationSection() {
  const sectionRef  = useRef(null)
  const [isOpen,    setIsOpen]    = useState(false)
  const [imgLoaded, setImgLoaded] = useState({ left: false, right: false })

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            setTimeout(() => setIsOpen(true), 250)
          }
        })
      },
      { threshold: 0.15 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="education" ref={sectionRef} className="section-padding"
      style={{ background: 'var(--color-background-secondary)' }}>
      <style>{`
        @keyframes spineGlow {
          0%,100% { opacity: 0.6; }
          50%      { opacity: 1; }
        }
      `}</style>

      <div className="container-custom">

        {/* Header */}
        <div className="reveal mb-24">
          <p className="section-label mb-2" style={{ fontSize: '1.05rem', letterSpacing: '0.13em' }}>Education</p>
          <h2 
            className="font-bold"
            style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', letterSpacing: '-0.02em', marginBottom: '25px' }}
          >
            The chapters that shaped me
          </h2>
        </div>

        {/* ── Book ── */}
        <div className="reveal" style={{ perspective: '1400px', maxWidth: '980px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            borderRadius: '3px 8px 8px 3px',
            overflow: 'visible',
            boxShadow: `
              -10px 4px 24px rgba(0,0,0,0.55),
               10px 4px 24px rgba(0,0,0,0.35),
               0 24px 60px rgba(0,0,0,0.45),
               0 2px 0 rgba(255,255,255,0.04)
            `,
            transformStyle: 'preserve-3d',
          }}>

            {/* Left hard cover */}
            <div style={{
              width: '18px', flexShrink: 0,
              background: degrees[0].cover,
              boxShadow: 'inset -4px 0 8px rgba(0,0,0,0.35)',
              borderRadius: '3px 0 0 3px',
            }} />

            {/* Left page */}
            <BookPage
              deg={degrees[0]} isOpen={isOpen} side="left"
              imgLoaded={imgLoaded.left}
              onImgLoad={() => setImgLoaded(p => ({ ...p, left: true }))}
            />

            {/* Spine */}
            <div style={{
              width: '26px', flexShrink: 0, position: 'relative',
              background: 'linear-gradient(to right, #1A0A08, #2E1A14, #1A0A08)',
              borderLeft:  '0.5px solid #3A1A10',
              borderRight: '0.5px solid #3A1A10',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.7)',
            }}>
              <p style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%) rotate(90deg)',
                whiteSpace: 'nowrap', fontSize: '0.8rem', fontWeight: 800,
                letterSpacing: '0.28em', color: '#FFFFFF',
                textTransform: 'uppercase', fontFamily: 'Georgia, serif',
                animation: 'spineGlow 2s ease-in-out infinite',
              }}>
                Education
              </p>
            </div>

            {/* Right page */}
            <BookPage
              deg={degrees[1]} isOpen={isOpen} side="right"
              imgLoaded={imgLoaded.right}
              onImgLoad={() => setImgLoaded(p => ({ ...p, right: true }))}
            />

            {/* Right hard cover */}
            <div style={{
              width: '18px', flexShrink: 0,
              background: degrees[1].cover,
              boxShadow: 'inset 4px 0 8px rgba(0,0,0,0.35)',
              borderRadius: '0 8px 8px 0',
            }} />
          </div>

          {/* Ground shadow */}
          <div style={{
            width: '88%', height: '20px', margin: '0 auto',
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)',
          }} />
        </div>
      </div>
    </section>
  )
}