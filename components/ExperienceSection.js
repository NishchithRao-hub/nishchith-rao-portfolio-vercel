'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const experiences = [
  {
    title:    'Full Stack Developer',
    company:  'Saayam For All',
    location: 'San Jose, CA, USA',
    period:   'Aug 2025 – Present',
    type:     'Full-time',
    accent:   '#E8844A',
    logo:     '/logos/saayam.jpeg',
    summary:  'Designing the backbone of the platform - from real-time notification systems to scalable microservices that connect people\'s requests to the resources they need.',
    highlights: [
      { label: 'Scale',       value: '10,000+ active users on the platform'              },
      { label: 'Reliability', value: '99.99% delivery reliability across all services'    },
      { label: 'Speed',       value: 'Real-time events delivered with latency under 200ms'         },
      { label: 'Impact',      value: 'Integral to the 1.0 MVP release from backend to frontend'  },
    ],
    tags: ['Python', 'Go', 'Kafka', 'AWS', 'Node.js', 'React', 'Kafka', 'PostgreSQL', 'Kubernetes', 'Django'],
  },
  {
    title:    'Associate Software Engineer',
    company:  'Capgemini Engineering',
    location: 'Bangalore, India',
    period:   'Feb 2022 – Jul 2023',
    type:     'Full-time',
    accent:   '#1D9E75',
    logo:     '/logos/capgemini.png',
    summary:  'Worked deep inside Cisco\'s core routing optical channel infrastructure - the kind of software that keeps the internet running for major global carriers. Contributed to performance-critical features used by Tier-1 operators worldwide.',
    highlights: [
      { label: 'Performance', value: '4.5% improvement in router processing speed'       },
      { label: 'Stability',   value: 'Reduced recurring production errors significantly' },
      { label: 'Scope',       value: 'Code running on infrastructure of global ISPs'     },
      { label: 'Recognition', value: '2nd place at Capgemini Hack Week 2022'             },
    ],
    tags: ['Java', 'Distributed Systems', 'Spring Boot', 'Agile', 'Git', 'Figma', 'GUI', 'XML', 'TCP/IP'],
  },
  {
    title:    'Graduate Teaching Assistant',
    company:  'Northeastern University',
    location: 'Boston, MA, USA',
    period:   'Jan 2024 – Apr 2025',
    type:     'Part-time',
    accent:   '#C084E8',
    logo:     '/logos/northeastern.png',
    summary:  'Supported 60+ graduate students through some of the most challenging coursework in the CS program. Bridged the gap between theory and real implementation, from SQL optimization to transformer architectures.',
    highlights: [
      { label: 'Audience',  value: '60+ graduate students mentored per semester'         },
      { label: 'Courses',   value: 'Natural Language Processing and Database Design at graduate level'           },
      { label: 'Topics',    value: 'Large Language Models, RAGs, Relational Databases, NoSQL'        },
      { label: 'Role',      value: 'Led lectures, reviewed and collaborated on projects, gave technical feedback'      },
    ],
    tags: ['Leadership', 'Technical Communication', 'NLP', 'PyTorch', 'Machine Learning', 'Data Modeling' , 'MongoDB'],
  },
]

function ExperienceCard({ exp, index }) {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef(null)

  return (
    <div className="reveal" style={{ marginBottom: index < experiences.length - 1 ? '1rem' : 0 }}>
        <div
            className={`card-glow-wrapper ${isOpen ? 'active' : ''}`}
            style={{ '--card-accent': exp.accent }}
        >
            <div
                onClick={() => setIsOpen(v => !v)}
                className="card-inner cursor-pointer group"
                style={{
                    background: 'var(--color-background-card)',
                    border:     isOpen
                    ? `1.5px solid ${exp.accent}99`
                    : '0.5px solid var(--color-border-medium)',
                    transition: 'border-color 0.3s ease',
                }}
            >

        {/* Animated top accent bar */}
        <div
          style={{
            height:     '2px',
            background: exp.accent,
            transform:  isOpen ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.4s ease',
          }}
        />

        {/* ── Card Header ── */}
        <div
          className="flex items-center gap-5"
          style={{ padding: '1.5rem 1.75rem' }}
        >
          {/* Logo placeholder */}
          <div
            className="shrink-0 flex items-center justify-center"
            style={{
              width:        '52px',
              height:       '52px',
              borderRadius: '10px',
              background:   `${exp.accent}18`,
              border:       `0.5px solid ${exp.accent}44`,
              overflow:     'hidden',
              position:     'relative',
            }}
          >
            <Image
              src={exp.logo}
              alt={exp.company}
              fill
              className="object-contain p-2"
              onError={e => { e.target.style.display = 'none' }}
            />
            {/* Fallback initials */}
            <span
              style={{
                fontFamily:  'var(--font-mono)',
                fontSize:    '0.75rem',
                fontWeight:  600,
                color:       exp.accent,
                letterSpacing: '0.05em',
              }}
            >
              {exp.company.split(' ').map(w => w[0]).join('').slice(0, 2)}
            </span>
          </div>

          {/* Title block */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h3 style={{
                fontSize:   '1.05rem',
                fontWeight: 600,
                color:      'var(--color-text-primary)',
                lineHeight: 1.3,
              }}>
                {exp.title}
              </h3>
              <span style={{
                fontSize:    '0.65rem',
                fontWeight:  500,
                padding:     '2px 9px',
                borderRadius:'999px',
                background:  `${exp.accent}18`,
                color:       exp.accent,
                border:      `0.5px solid ${exp.accent}44`,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>
                {exp.type}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span style={{ fontSize: '0.9rem', fontWeight: 500, color: exp.accent }}>
                {exp.company}
              </span>
              <span style={{ color: 'var(--color-border-strong)', fontSize: '0.8rem' }}>·</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                {exp.location}
              </span>
              <span style={{ color: 'var(--color-border-strong)', fontSize: '0.8rem' }}>·</span>
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.75rem',
                color:         'var(--color-text-muted)',
                letterSpacing: '0.03em',
              }}>
                {exp.period}
              </span>
            </div>
          </div>

          {/* Chevron */}
          <div style={{
            flexShrink: 0,
            width:      '28px',
            height:     '28px',
            borderRadius: '50%',
            display:    'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: isOpen ? `${exp.accent}22` : 'var(--color-background-elevated)',
            border:     `0.5px solid ${isOpen ? exp.accent + '55' : 'var(--color-border-medium)'}`,
            color:      isOpen ? exp.accent : 'var(--color-text-muted)',
            transform:  isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'all 0.3s ease',
          }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* ── Expandable body ── */}
        <div
          ref={contentRef}
          style={{
            maxHeight:  isOpen ? '600px' : '0px',
            overflow:   'hidden',
            transition: 'max-height 0.4s ease',
          }}
        >
          <div style={{
            padding:    '0 1.75rem 1.75rem',
            borderTop:  `0.5px solid ${exp.accent}22`,
          }}>

            {/* Summary paragraph */}
            <p style={{
              fontSize:   '0.93rem',
              lineHeight: 1.8,
              color:      'var(--color-text-secondary)',
              marginTop:  '1.25rem',
              marginBottom: '1.5rem',
            }}>
              {exp.summary}
            </p>

            {/* Highlights grid */}
            <div
              className="grid grid-cols-2 gap-3"
              style={{ marginBottom: '1.5rem' }}
            >
              {exp.highlights.map((h, i) => (
                <div
                  key={i}
                  style={{
                    background:   `${exp.accent}0D`,
                    border:       `0.5px solid ${exp.accent}2A`,
                    borderRadius: '8px',
                    padding:      '0.75rem 1rem',
                  }}
                >
                  <p style={{
                    fontSize:      '0.65rem',
                    fontWeight:    500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color:         exp.accent,
                    marginBottom:  '4px',
                    opacity:       0.85,
                  }}>
                    {h.label}
                  </p>
                  <p style={{
                    fontSize:   '0.85rem',
                    fontWeight: 500,
                    color:      'var(--color-text-primary)',
                    lineHeight: 1.4,
                  }}>
                    {h.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
              {exp.tags.map((tag, i) => (
                <span key={i} style={{
                  fontSize:    '0.72rem',
                  fontWeight:  500,
                  padding:     '3px 10px',
                  borderRadius:'999px',
                  background:  'var(--color-background-elevated)',
                  border:      `0.5px solid var(--color-border-medium)`,
                  color:       'var(--color-text-secondary)',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
    </div>
  )
}

export default function ExperienceSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    const els = sectionRef.current?.querySelectorAll('.reveal')
    els?.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
    <style>{`
        @keyframes borderTravel {
            0%   { background-position: 0% 0%; }
            100% { background-position: 300% 0%; }
        }
        .card-glow-wrapper {
            position: relative;
            border-radius: 13px; /* 1px larger than card's 12px radius */
            padding: 1.5px;      /* thickness of the LED strip */
        }
        .card-glow-wrapper::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: inherit;
            background: conic-gradient(
            from var(--angle, 0deg),
            transparent 20%,
            var(--card-accent) 40%,
            #ffffff88 50%,
            var(--card-accent) 60%,
            transparent 80%
            );
            animation: rotateBorder 2.2s linear infinite;
            opacity: 0;
            transition: opacity 0.4s ease;
        }
        .card-glow-wrapper.active::before {
            opacity: 1;
        }
        @property --angle {
            syntax: '<angle>';
            initial-value: 0deg;
            inherits: false;
        }
        @keyframes rotateBorder {
            to { --angle: 360deg; }
        }
        .card-inner {
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            width: 100%;
        }
    `}</style>

    <section
      id="experience"
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--color-background-secondary)' }}
    >
      <div className="container-custom">

        <div className="reveal mb-12">
          <p className="section-label mb-2" style={{ fontSize: '1.05rem', letterSpacing: '0.13em' }}>Experience</p>
          <h2
            className="font-bold"
            style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.4rem)', letterSpacing: '-0.02em' }}
          >
            Where I&apos;ve built things
          </h2>
          <p style={{
            fontSize:   '0.95rem',
            color:      'var(--color-text-muted)',
            marginTop:  '0.5rem',
          }}>
            Click any role to explore the details
          </p>
        </div>

        <div className="flex flex-col">
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>

      </div>
    </section>
    </>
  )
}