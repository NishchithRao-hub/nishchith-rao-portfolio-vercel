'use client'

import { useEffect, useRef, useState } from 'react'

const domains = [
  {
    id:      'languages',
    label:   'Languages',
    icon:    '{ }',
    accent:  '#58A6FF',   // soft GitHub blue
    file:    'languages.config.ts',
    comment: '// Core programming languages',
    varColor: '#79C0FF',
    skills: [
      { name: 'Python',     stars: 5, tag: 'expert'     },
      { name: 'Java',       stars: 5, tag: 'expert'     },
      { name: 'JavaScript', stars: 4, tag: 'proficient' },
      { name: 'SQL',        stars: 5, tag: 'expert'     },
      { name: 'TypeScript', stars: 4, tag: 'proficient' },
      { name: 'Golang',     stars: 3, tag: 'familiar'   },
      { name: 'C++',        stars: 3, tag: 'familiar'   },
      { name: 'C#',         stars: 4, tag: 'proficient' },
    ],
  },
  {
    id:      'frameworks',
    label:   'Frameworks & APIs',
    icon:    '</>',
    accent:  '#3DDC84',   // Android green
    file:    'frameworks.config.java',
    comment: '// Frameworks & APIs',
    varColor: '#56E89E',
    skills: [
      { name: 'Spring Boot',   stars: 5, tag: 'expert'     },
      { name: 'REST APIs',     stars: 5, tag: 'expert'     },
      { name: 'Node.js',       stars: 4, tag: 'proficient' },
      { name: 'React',         stars: 4, tag: 'proficient' },
      { name: 'FastAPI',       stars: 5, tag: 'expert'     },
      { name: 'Django',        stars: 4, tag: 'proficient' },
      { name: 'Microservices', stars: 4, tag: 'proficient' },
      { name: 'WebSockets',    stars: 3, tag: 'familiar'   },
    ],
  },
  {
    id:      'cloud',
    label:   'Cloud & DevOps',
    icon:    '☁',
    accent:  '#FF9500',   // AWS orange
    file:    'cloud.devops.js',
    comment: '// Cloud platforms & DevOps tools',
    varColor: '#FFB340',
    skills: [
      { name: 'Amazon Web Services (S3, Lambda, EKS, RDS)', stars: 5, tag: 'expert' },
      { name: 'Docker',      stars: 4, tag: 'proficient' },
      { name: 'Kubernetes',  stars: 4, tag: 'proficient' },
      { name: 'Git',         stars: 5, tag: 'expert'     },
      { name: 'Jenkins',     stars: 4, tag: 'proficient' },
      { name: 'GCP',         stars: 4, tag: 'proficient' },
      { name: 'CI/CD',       stars: 4, tag: 'proficient' },
      { name: 'Terraform',   stars: 3, tag: 'familiar'   },
    ],
  },
  {
    id:      'ml',
    label:   'ML & Data',
    icon:    '⬡',
    accent:  '#DA70D6',   // orchid purple
    file:    'ml.data.py',
    comment: '# Machine learning & data engineering',
    varColor: '#E89EE4',
    skills: [
      { name: 'PyTorch',               stars: 4, tag: 'proficient' },
      { name: 'Scikit-learn',          stars: 4, tag: 'proficient' },
      { name: 'Large Language Models', stars: 4, tag: 'proficient' },
      { name: 'RAGs',                  stars: 4, tag: 'proficient' },
      { name: 'Data Visualization',    stars: 4, tag: 'proficient' },
      { name: 'Apache Airflow',        stars: 4, tag: 'proficient' },
      { name: 'Pandas',                stars: 5, tag: 'expert'     },
      { name: 'Apache Spark',          stars: 3, tag: 'familiar'   },
      { name: 'TensorFlow',            stars: 3, tag: 'familiar'   },
      { name: 'MLflow',                stars: 3, tag: 'familiar'   },
      { name: 'NumPy',                 stars: 4, tag: 'proficient' },
    ],
  },
  {
    id:      'databases',
    label:   'Databases & Messaging',
    icon:    '▤',
    accent:  '#F6C90E',   // warm yellow
    file:    'databases.schema.sql',
    comment: '-- Database & messaging systems',
    varColor: '#FAD84A',
    skills: [
      { name: 'PostgreSQL',   stars: 5, tag: 'expert'     },
      { name: 'MySQL',        stars: 5, tag: 'expert'     },
      { name: 'MongoDB',      stars: 4, tag: 'proficient' },
      { name: 'Redis',        stars: 4, tag: 'proficient' },
      { name: 'Apache Kafka', stars: 4, tag: 'proficient' },
      { name: 'DynamoDB',     stars: 4, tag: 'proficient' },
      { name: 'Cassandra',    stars: 3, tag: 'familiar'   },
      { name: 'PL/SQL',       stars: 3, tag: 'familiar'   },
    ],
  },
]

function tagStyle(tag) {
  if (tag === 'expert')     return { bg: '#238636', border: '#2EA043', color: '#56D364' }
  if (tag === 'proficient') return { bg: '#1F3A5C', border: '#388BCD', color: '#58A6FF' }
  return                           { bg: '#2D2208', border: '#7A5F1A', color: '#C9A227' }
}

function Stars({ count, accent }) {
  return (
    <span style={{ letterSpacing: '2px', fontSize: '0.72rem' }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= count ? accent : '#30363D' }}>★</span>
      ))}
    </span>
  )
}

export default function SkillsSection() {
  const sectionRef = useRef(null)
  const [active,       setActive]  = useState(0)
  const [visibleLines, setVisible] = useState(0)
  const [cursor,       setCursor]  = useState(true)
  const timerRef  = useRef(null)
  const cursorRef = useRef(null)

  const domain = domains[active]

  const startTypewriter = (idx) => {
    clearTimeout(timerRef.current)
    setVisible(0)
    const total = domains[idx].skills.length + 3
    let line = 0
    const reveal = () => {
      line++
      setVisible(line)
      if (line < total) timerRef.current = setTimeout(reveal, 95)
    }
    timerRef.current = setTimeout(reveal, 140)
  }

  useEffect(() => {
    startTypewriter(0)
    cursorRef.current = setInterval(() => setCursor(c => !c), 530)
    return () => { clearTimeout(timerRef.current); clearInterval(cursorRef.current) }
  }, [])

  const handleTab = (i) => { if (i === active) return; setActive(i); startTypewriter(i) }

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const lines = [
    { type: 'comment', text: domain.comment },
    { type: 'keyword', text: '' },
    ...domain.skills.map(s => ({ type: 'skill', skill: s })),
    { type: 'close' },
  ]

  return (
    <section id="skills" ref={sectionRef} className="section-padding"
      style={{
        backgroundColor: '#070D09',
        backgroundImage: `
          linear-gradient(rgba(74, 222, 128, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(74, 222, 128, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: '44px 44px',
      }}>
      <div className="container-custom">

        <div className="reveal mb-12">
          <p className="section-label mb-2" style={{ fontSize: '1.05rem', letterSpacing: '0.13em' }}>Skills</p>
          <h2 
            className="font-bold"
            style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', letterSpacing: '-0.02em', marginBottom: '25px' }}         
          >
            The tools I reach for
          </h2>
        </div>

        <div className="reveal" style={{ maxWidth: '1060px', margin: '0 auto' }}>
          <div style={{
            background: '#0D1117',
            borderRadius: '12px',
            border: '1px solid #30363D',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.04)',
          }}>

            {/* Title bar */}
            <div style={{
              background: '#161B22',
              padding: '0.75rem 1.25rem',
              display: 'flex', alignItems: 'center', gap: '10px',
              borderBottom: '1px solid #30363D',
            }}>
              <div style={{ display: 'flex', gap: '7px' }}>
                {['#FF5F57','#FEBC2E','#28C840'].map((c, i) => (
                  <div key={i} style={{ width: '13px', height: '13px', borderRadius: '50%', background: c }} />
                ))}
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <span style={{
                  fontSize: '0.76rem', color: '#8B949E',
                  fontFamily: 'var(--font-mono)', letterSpacing: '0.04em',
                  background: '#0D1117', padding: '3px 18px', borderRadius: '6px',
                  border: '1px solid #30363D',
                }}>
                  {domain.file}
                </span>
              </div>
              <div style={{ width: '46px' }} />
            </div>

            {/* Body */}
            <div className="terminal-body" style={{ display: 'flex', minHeight: '460px' }}>

              {/* Sidebar */}
              <div className="terminal-sidebar" style={{
                width: '210px', flexShrink: 0,
                background: '#0D1117',
                borderRight: '1px solid #21262D',
                padding: '0.75rem 0',
                display: 'flex', flexDirection: 'column',
              }}>
                <p style={{
                  fontSize: '0.6rem', fontWeight: 700, color: '#484F58',
                  textTransform: 'uppercase', letterSpacing: '0.14em',
                  padding: '0.5rem 1.25rem 0.85rem',
                  fontFamily: 'var(--font-mono)',
                }}>
                  Explorer
                </p>
                {domains.map((d, i) => (
                  <button key={d.id} onClick={() => handleTab(i)} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '0.65rem 1.25rem',
                    background: active === i ? `${d.accent}18` : 'transparent',
                    borderLeft: `2.5px solid ${active === i ? d.accent : 'transparent'}`,
                    borderTop: 'none', borderRight: 'none', borderBottom: 'none',
                    cursor: 'pointer', width: '100%', textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}>
                    <span style={{
                      fontSize: '0.8rem', fontWeight: 700,
                      color: active === i ? d.accent : '#484F58',
                      fontFamily: 'var(--font-mono)',
                      minWidth: '24px', textAlign: 'center',
                    }}>
                      {d.icon}
                    </span>
                    <span style={{
                      fontSize: '0.8rem',
                      color: active === i ? d.accent : '#8B949E',
                      fontWeight: active === i ? 600 : 400,
                      fontFamily: 'var(--font-mono)',
                      transition: 'color 0.2s ease',
                    }}>
                      {d.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Editor */}
              <div style={{ flex: 1, padding: '1.4rem 0', overflowY: 'auto' }}>
                {lines.map((line, i) => {
                  const show = i < visibleLines
                  return (
                    <div key={`${active}-${i}`} style={{
                      display: 'flex', alignItems: 'center',
                      paddingLeft: '1rem', minHeight: '30px',
                      opacity: show ? 1 : 0,
                      transform: show ? 'translateX(0)' : 'translateX(-6px)',
                      transition: 'opacity 0.18s ease, transform 0.18s ease',
                      background: line.type === 'skill' && show ? 'rgba(255,255,255,0.012)' : 'transparent',
                    }}>
                      {/* Line number */}
                      <span style={{
                        width: '38px', flexShrink: 0, textAlign: 'right',
                        paddingRight: '1.4rem', fontSize: '0.7rem',
                        color: '#3D444D', fontFamily: 'var(--font-mono)', userSelect: 'none',
                      }}>
                        {i + 1}
                      </span>

                      {line.type === 'comment' && (
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#6E7681', fontStyle: 'italic' }}>
                          {line.text}
                        </span>
                      )}

                      {line.type === 'keyword' && (
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                          <span style={{ color: '#FF7B72' }}>const </span>
                          <span style={{ color: domain.varColor }}>{domain.id}</span>
                          <span style={{ color: '#E6EDF3' }}> = {'{'}</span>
                        </span>
                      )}

                      {line.type === 'skill' && (
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: '14px',
                          fontFamily: 'var(--font-mono)', fontSize: '0.82rem',
                          paddingLeft: '1.75rem', flexWrap: 'wrap',
                        }}>
                          {/* Key in accent color */}
                          <span style={{ color: domain.varColor, fontWeight: 500 }}>
                            {line.skill.name}
                          </span>
                          <span style={{ color: '#6E7681' }}>:</span>
                          <Stars count={line.skill.stars} accent={domain.accent} />
                          {/* Tag badge */}
                          <span style={{
                            fontSize: '0.65rem', padding: '1px 8px', borderRadius: '999px',
                            background: tagStyle(line.skill.tag).bg,
                            border: `1px solid ${tagStyle(line.skill.tag).border}`,
                            color: tagStyle(line.skill.tag).color,
                            fontWeight: 600,
                          }}>
                            {line.skill.tag}
                          </span>
                        </div>
                      )}

                      {line.type === 'close' && (
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#E6EDF3' }}>
                          {'}'}
                          <span style={{
                            display: 'inline-block', width: '2px', height: '15px',
                            background: domain.accent, marginLeft: '4px',
                            verticalAlign: 'middle',
                            opacity: cursor ? 1 : 0,
                            transition: 'opacity 0.1s',
                          }} />
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Status bar */}
            <div style={{
              background: domain.accent,
              padding: '0.28rem 1.25rem',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: '0.65rem', color: '#0D1117', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                ⬤ {domain.label}
              </span>
              <div style={{ display: 'flex', gap: '20px' }}>
                {[`${domain.skills.length} skills`, 'UTF-8', 'TypeScript'].map((t, i) => (
                  <span key={i} style={{ fontSize: '0.65rem', color: '#0D1117', fontFamily: 'var(--font-mono)', opacity: 0.7 }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}