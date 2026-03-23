'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const quickFacts = [
  { icon: '📍', label: 'Location',   value: 'San Francisco, CA'                        },
  { icon: '🎓', label: 'Education',  value: 'MS in CS, Northeastern University'   },
  { icon: '💼', label: 'Experience', value: '2+ years as a Software Engineer'     },
  { icon: '🌐', label: 'Open to',    value: 'Full-time / Internship roles'        },
]

export default function AboutSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.15 }
    )
    const els = sectionRef.current?.querySelectorAll('.reveal')
    els?.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding"
      style={{
        backgroundColor: '#070D09',
        backgroundImage: `
          linear-gradient(rgba(74, 222, 128, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(74, 222, 128, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: '44px 44px',
      }}
    >
      <div className="container-custom">

        {/* Section label */}
        <div className="reveal mb-12">
          <p className="section-label mb-2" style={{ fontSize: '1.05rem', letterSpacing: '0.13em' }}>About</p>
          <h2
            className="font-bold"
            style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', letterSpacing: '-0.02em' }}
          >
            The person behind the code
          </h2>
        </div>

        {/* 5-col grid: left takes 2 cols, right takes 3 cols */}
        <div
          className="reveal grid gap-12 items-start"
          style={{ gridTemplateColumns: '1fr 1fr' }}
        >

          {/* ── Left: Bio + quick facts ── */}
          <div className="flex flex-col gap-8">
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
              As a software engineer with a background in backend systems,
              I&apos;ve built production systems serving 10,000+ users, contributed to
              Cisco&apos;s core telecom infrastructure and shipped ML pipelines that
              cut costs and improved precision.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {quickFacts.map((f, i) => (
                <div
                  key={i}
                  className="card flex flex-col items-center justify-center gap-2 p-4 text-center"
                  style={{ borderRadius: 'var(--radius-card)', minHeight: '88px' }}
                >
                  <span style={{ fontSize: '1rem', lineHeight: 1 }}>{f.icon}</span>
                  <div>
                    <p style={{
                      fontSize: '0.65rem',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--color-text-muted)',
                      marginBottom: '2px',
                    }}>
                      {f.label}
                    </p>
                    <p style={{
                      fontSize: '0.82rem',
                      fontWeight: 500,
                      color: 'var(--color-text-primary)',
                    }}>
                      {f.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Why SWE card ── */}
          <div
            className="flex flex-col"
            style={{
              background:   'var(--color-background-card)',
              border:       '1px solid var(--color-accent-amber)',
              borderRadius: 'var(--radius-card)',
              width:         'relative',
            }}
          >
            {/* All content in a single padded container */}
            <div className="flex flex-col gap-1 p-8" style={{ padding: '1rem' }}>

              <p style={{
                fontSize:      '1.0rem',
                fontWeight:    600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color:         'var(--color-accent-amber)',
              }}>
                Why software engineering
              </p>

              {/* Decorative quote mark */}
              <span
                aria-hidden="true"
                style={{
                  fontFamily:  'Georgia, serif',
                  fontSize:    '5rem',
                  lineHeight:  1,
                  color:       'var(--color-accent-amber)',
                  opacity:     0.35,
                  userSelect:  'none',
                  display:     'block',
                  marginBottom: '-2rem',
                }}
              >
                &quot;
              </span>

              <div className="flex flex-col gap-3" style={{
                fontSize:   '0.93rem',
                lineHeight: 1.85,
                color:      'var(--color-text-secondary)',
              }}>
                <p>
                  Choosing software engineering was never a single day decision. I slowly 
                  gravitated towards it, the way you gravitate towards anything that makes 
                  the world feel a little more understandable.
                </p>
                <p>
                  What keeps me here is two things pulling in the same direction. The
                  first is{' '}<span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>curiosity</span>, the restless kind that makes you stay up
                  learning a new framework or using a new tool not because the world uses it,
                  but because you just want to learn how it works. I love when I&apos;m
                  adapting, owning a problem end to end and building something that
                  didn&apos;t exist before or improving an existing one.
                </p>
                <p>
                  The second is{' '}<span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>impact</span>. Being a developer, I believe that code
                  when written thoughtfully and built to scale, is one of the most direct
                  ways a person like me can improve how people live, whether that&apos;s in
                  healthcare, how someone manages their finances, better infrastructure,
                  or simply making a daily experience a little less frustrating. I also
                  believe the best engineering any company has produced has always been a
                  team effort, and there&apos;s a particular kind of satisfaction in shipping
                  something together that none of us could have built alone.
                </p>
                <p>
                  Software engineering also makes me a better person. It connects me to
                  a global community of builders and it reminds me that learning never
                  stops here, and honestly, that&apos;s the best part of it.
                </p>
                <p></p>
              </div>

              {/* Signature */}
              <div
                className="flex items-center gap-3 pt-4"
                style={{ borderTop: '0.5px solid var(--color-border-subtle)' }}
              >
                <div
                  className="relative shrink-0"
                  style={{
                    width: '30px', height: '30px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '1px solid rgba(245,158,11,0.4)',
                  }}
                >
                  <Image src="/headshot.jpeg" alt="Nishchith Rao" fill className="object-cover" />
                </div>
                <div>
                  <p style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                    Nishchith Rao
                  </p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                    Software Engineer
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}