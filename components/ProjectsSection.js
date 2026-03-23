'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const projects = [
  {
    id:      'resumatrix',
    title:   'ResuMatrix',
    tagline: 'AI-powered resume analyzer and ranker for recruiters',
    accent:  '#378ADD',
    github:  'https://github.com/ResuMatrix/ResuMatrix',
    image:   '/projects/resumatrix.png',
    domain:  'Software/ MLOps / NLP',
    summary: 'An end-to-end MLOps system that thinks like a recruiter. It reads resumes semantically, not just keyword matching and ranks candidates by how well they actually fit a role.',
    what: [
      'Semantic resume-to-JD matching using SBERT embeddings',
      'XGBoost + cosine similarity initial filtering',
      'LLM-based ranking with Gemini and Borda ranker',
      'Scheduled retraining via Jenkins to fight model drift',
    ],
    stats: [
      { label: 'Match precision', value: '~93%' },
      { label: 'Resumes per minute', value: '400+' },
      { label: 'Storage Cost reduction',  value: '40%'  },
    ],
    tags: ['Python', 'LLMs', 'Postgres', 'Jenkins', 'MLflow', 'GCP', 'Docker', 'Apache Airflow'],
  },
  {
    id:      'fitness',
    title:   'Fitness Tracker',
    tagline: 'A Full-stack fitness companion',
    accent:  '#1D9E75',
    github:  'https://github.com/NishchithRao-hub/Fitness-Tracker-',
    image:   '/projects/fitness.jpg',
    domain:  'Full Stack/Software',
    summary: 'A production-grade fitness app built for performance. Redis-cached APIs, Firebase auth, and 14 REST endpoints, all under 140ms response time. Won 2nd place at Capgemini Hack Week 2022.',
    what: [
      'Calorie tracking, goal management and diet analytics',
      'Redis caching improving response rate for repeated DB queries',
      'Firebase Auth with secure session management',
      '90%+ test coverage with JUnit and Mockito',
    ],
    stats: [
      { label: 'API latency',     value: '<140ms' },
      { label: 'Query reduction', value: '45%'    },
      { label: 'Test coverage',   value: '90%+'   },
    ],
    tags: ['Java', 'Spring Boot', 'Node.js', 'FastAPI', 'React', 'Redis', 'Firebase'],
  },
  {
    id:      'energy',
    title:   'SmartHome Energy',
    tagline: 'Weather-driven energy optimizer',
    accent:  '#E8844A',
    github:  'https://github.com/NishchithRao-hub/Weather-Driven-Smart-Home-Energy-Consumption-And-Its-Optimization',
    image:   '/projects/energy.png',
    domain:  'Machine Learning / Time Series Analysis',
    summary: 'A time-series forecasting pipeline that learns when your home uses the most energy and then tells it to stop. Models appliance-level consumption using weather patterns and optimizes scheduling around peak hours.',
    what: [
      'VAR, Prophet, and LightGBM for appliance-level forecasting',
      'Weather feature pipelines with temporal decomposition',
      'Peak-load demand minimization strategy',
      '12% lower MAE vs baseline regression models',
    ],
    stats: [
      { label: 'Cost reduction',   value: '15%' },
      { label: 'MAE improvement',  value: '12%' },
      { label: 'RMSE improvement', value: '9%'  },
    ],
    tags: ['Python', 'Classical ML', 'Optimization', 'Metrics', 'Pandas', 'Scikit-learn', 'Regression'],
  },
  {
    id:      'mars',
    title:   'Mars Rover Nav',
    tagline: 'Autonomous terrain exploration',
    accent:  '#C084E8',
    github:  'https://github.com/NishchithRao-hub/Autonomous-Mars-Terrain-Exploration-and-Navigation-Framework',
    image:   '/projects/mars.jpeg',
    domain:  'Reinforcement Learning / Computer Vision',
    summary: 'A deep RL framework that trains a rover to navigate Martian terrain autonomously - maximizing coverage, avoiding obstacles and conserving energy.',
    what: [
      'PPO and TD3 algorithms trained in OpenAI Gym environments with GPU acceleration',
      'Custom reward shaping for terrain coverage + energy efficiency',
      'LIDAR-based perception via OpenCV for obstacle detection',
      'Real-time learning visualization with Unity ML-Agents',
    ],
    stats: [
      { label: 'Traversal efficiency', value: '74%'  },
      { label: 'Simulations run',      value: '150,000' },
      { label: 'Algorithms tested',    value: '2'    },
    ],
    tags: ['Python', 'PyTorch', 'OpenAI', 'Reinforcement Learning', 'OpenCV', 'Unity ML', 'GPU Computing'],
  },
]

// Fixed pixel canvas — all coordinates in this space
const W = 740, H = 580
const CX = W / 2, CY = H / 2
const RH = 290  // horizontal radius (left/right nodes)
const RV = 245  // vertical radius (top/bottom nodes)

// Equidistant: top, right, bottom, left
const nodeCoords = [
  { x: CX,        y: CY - RV }, // top
  { x: CX + RH,   y: CY      }, // right
  { x: CX,        y: CY + RV }, // bottom
  { x: CX - RH,   y: CY      }, // left
]

function ProjectModal({ project, onClose }) {
  if (!project) return null
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 50,
      background: 'rgba(0,0,0,0.78)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem', animation: 'fadeIn 0.2s ease forwards',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: '740px',
        background: 'var(--color-background-card)',
        border: `2px solid ${project.accent}88`,
        borderRadius: '16px', padding: '2rem',
        position: 'relative', animation: 'fadeUp 0.3s ease forwards',
        maxHeight: '92vh', overflowY: 'auto',
        boxShadow: `0 0 60px ${project.accent}28, 0 24px 48px rgba(0,0,0,0.6)`,
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          borderRadius: '16px 16px 0 0', animation: 'shimmer 2.5s ease-in-out infinite',
        }} />
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-3 mb-1.5 flex-wrap">
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {project.title}
              </h3>
              <span style={{
                fontSize: '0.65rem', fontWeight: 600, padding: '3px 10px',
                borderRadius: '999px', background: `${project.accent}22`,
                color: project.accent, border: `1px solid ${project.accent}55`,
                textTransform: 'uppercase', letterSpacing: '0.07em',
              }}>{project.domain}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
              {project.tagline}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '0.78rem', fontWeight: 600, padding: '6px 14px',
              borderRadius: '999px', border: `1px solid ${project.accent}66`,
              color: project.accent, background: `${project.accent}14`,
              textDecoration: 'none',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              View Code
            </a>
            <button onClick={onClose} style={{
              width: '30px', height: '30px', borderRadius: '50%',
              background: 'var(--color-background-elevated)',
              border: '0.5px solid var(--color-border-medium)',
              color: 'var(--color-text-muted)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
          {project.summary}
        </p>
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <div>
            <p style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase',
              letterSpacing: '0.1em', color: project.accent, marginBottom: '0.85rem' }}>
              How it works
            </p>
            <ul className="flex flex-col gap-2.5">
              {project.what.map((w, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%',
                    background: project.accent, flexShrink: 0, marginTop: '7px' }} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>{w}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <div style={{
              width: '70%', height: '130px', borderRadius: '10px',
              background: `${project.accent}11`, border: `1px solid ${project.accent}33`,
              position: 'relative', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Image src={project.image} alt={project.title} fill className="object-contain p-2"
                onError={e => { e.currentTarget.style.display = 'none' }} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {project.stats.map((s, i) => (
                <div key={i} style={{
                  background: `${project.accent}0D`, border: `1px solid ${project.accent}2A`,
                  borderRadius: '8px', padding: '0.7rem 0.5rem', textAlign: 'center',
                }}>
                  <p style={{ fontSize: '1.05rem', fontWeight: 700, color: project.accent, lineHeight: 1 }}>{s.value}</p>
                  <p style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', marginTop: '4px',
                    textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1.3 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span key={i} style={{
              fontSize: '0.74rem', fontWeight: 500, padding: '4px 11px',
              borderRadius: '999px', background: 'var(--color-background-elevated)',
              border: '0.5px solid var(--color-border-medium)', color: 'var(--color-text-secondary)',
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const sectionRef  = useRef(null)
  const canvasRef   = useRef(null)
  const [active, setActive]       = useState(null)
  const [imgLoaded, setImgLoaded] = useState({})
  const [ticks,  setTicks]        = useState([0.1, 0.35, 0.6, 0.85])
  const [spin,   setSpin]       = useState(0)
  const [floats, setFloats]     = useState([0, 0, 0, 0, 0]) // 4 nodes + hub
  const tickRef  = useRef([0.1, 0.35, 0.6, 0.85])
  const spinRef  = useRef(0)
  const timeRef  = useRef(0)
  const rafRef   = useRef(null)

  useEffect(() => {
    const speeds = [0.00022, 0.00018, 0.00025, 0.00020]
    let last = performance.now()
    const loop = now => {
      const dt = now - last; last = now
      timeRef.current += dt
      tickRef.current = tickRef.current.map((t, i) => (t + speeds[i] * dt) % 1)
      spinRef.current = (spinRef.current + 0.012 * dt / 16) % 360
      const t = timeRef.current / 1000
      setTicks([...tickRef.current])
      setSpin(spinRef.current)
      setFloats([
        Math.sin(t * 0.9)   * 7,
        Math.sin(t * 0.75)  * 6,
        Math.sin(t * 1.0)   * 8,
        Math.sin(t * 0.85)  * 7,
        Math.sin(t * 0.65)  * 6, // hub
      ])
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const activeProject = projects.find(p => p.id === active) ?? null
  const NODE_R = 46 // node circle radius in SVG units

  return (
    <section id="projects" ref={sectionRef} className="section-padding"
      style={{
        backgroundColor: '#070D09',
        backgroundImage: `
          linear-gradient(rgba(74, 222, 128, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(74, 222, 128, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: '44px 44px',
      }}>
      <style>{`
        @keyframes shimmer { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes pulseRingAnim { 0%,100%{r:52;opacity:0.55} 50%{r:68;opacity:0.08} }
        @keyframes thrustFlicker { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>

      <div className="container-custom">
        <div className="reveal mb-12" style={{ marginTop: '-50px' }}>
          <p className="section-label mb-2" style={{ fontSize: '1.05rem', letterSpacing: '0.13em' }}>Projects</p>
          <h2
            className="font-bold" 
            style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', letterSpacing: '-0.02em' }}
          >
            Things I&apos;ve built and shipped
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginTop: '0.4rem', marginBottom: '1.5rem' }}>
            Click any node to explore the project
          </p>
        </div>

        {/* SVG canvas — fixed viewBox so all coords are precise */}
        <div className="reveal" style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}>
          <svg
            ref={canvasRef}
            viewBox={`0 0 ${W} ${H}`}
            style={{ width: '100%', height: 'auto', overflow: 'visible' }}
          >
            <defs>
              {projects.map(p => (
                <radialGradient key={`grad-${p.id}`} id={`grad-${p.id}`} cx="35%" cy="35%" r="65%">
                  <stop offset="0%"   stopColor={p.accent} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={p.accent} stopOpacity="0.08" />
                </radialGradient>
              ))}
              <radialGradient id="hubGrad" cx="40%" cy="35%" r="65%">
                <stop offset="0%"   stopColor="#2A2A3C" stopOpacity="1" />
                <stop offset="100%" stopColor="#0A0A0F" stopOpacity="1" />
              </radialGradient>
              {projects.map(p => (
                <clipPath key={`clip-${p.id}`} id={`clip-${p.id}`}>
                  <circle cx="0" cy="0" r={NODE_R - 6} />
                </clipPath>
              ))}
            </defs>

            {/* ── Connector lines ── */}
            {projects.map((p, i) => {
              const nc    = nodeCoords[i]
              const isAct = active === p.id
              return (
                <line key={`line-${p.id}`}
                  x1={CX} y1={CY} x2={nc.x} y2={nc.y}
                  stroke={p.accent}
                  strokeWidth={isAct ? 3 : 1.8}
                  strokeDasharray="8 6"
                  opacity={isAct ? 0.85 : 0.75}
                  style={{ transition: 'stroke-width 0.3s ease, opacity 0.3s ease' }}
                />
              )
            })}

            {/* ── Rockets ── */}
            {projects.map((p, i) => {
              const t    = ticks[i]
              const nc   = nodeCoords[i]
              const rx   = CX + (nc.x - CX) * t
              const ry   = CY + (nc.y - CY) * t
              const ang  = Math.atan2(nc.y - CY, nc.x - CX) * 180 / Math.PI + 90
              const isAct = active === p.id
              const bodyColor = isAct ? p.accent : '#8888A0'
              const noseColor = isAct ? '#ffffff' : '#B0B0C0'
              return (
                <g key={`rocket-${p.id}`}
                  transform={`translate(${rx},${ry}) rotate(${ang})`}>
                  {/* Thrust */}
                  <ellipse cx="0" cy="11" rx="3.5" ry="6"
                    fill={p.accent} opacity="0.75"
                    style={{ animation: 'thrustFlicker 0.2s ease-in-out infinite' }} />
                  <ellipse cx="0" cy="13" rx="1.8" ry="3.5"
                    fill="#ffffff" opacity="0.55"
                    style={{ animation: 'thrustFlicker 0.15s ease-in-out infinite' }} />
                  {/* Body */}
                  <ellipse cx="0" cy="0" rx="5" ry="9" fill={bodyColor} />
                  {/* Nose */}
                  <path d="M-5,0 Q0,-13 5,0 Z" fill={noseColor} opacity="0.9" />
                  {/* Fins */}
                  <path d="M-5,5 L-9,12 L-2,9 Z" fill={bodyColor} opacity="0.8" />
                  <path d="M5,5 L9,12 L2,9 Z"  fill={bodyColor} opacity="0.8" />
                  {/* Window */}
                  <circle cx="0" cy="-1" r="2.5" fill={p.accent} opacity="0.9" />
                  <circle cx="0" cy="-1" r="1.2" fill="#fff"    opacity="0.7" />
                </g>
              )
            })}

            {/* ── Project nodes ── */}
            {projects.map((p, i) => {
              const nc    = nodeCoords[i]
              const isAct = active === p.id
              const fy    = floats[i]
              return (
                <g key={`node-${p.id}`}
                  transform={`translate(${nc.x},${nc.y + fy})`}
                  onClick={() => setActive(active === p.id ? null : p.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Pulse ring (SVG animated) */}
                  {isAct && (
                    <circle cx="0" cy="0" r={NODE_R + 6}
                      fill="none" stroke={p.accent} strokeWidth="2" opacity="0"
                      style={{ animation: 'pulseRingAnim 1.8s ease-in-out infinite' }} />
                  )}
                  {/* Outer glow ring */}
                  <circle cx="0" cy="0" r={NODE_R + 3}
                    fill="none"
                    stroke={p.accent}
                    strokeWidth={isAct ? 3 : 2}
                    opacity={isAct ? 0.8 : 0.5}
                    style={{ transition: 'all 0.3s ease' }}
                  />
                  {/* Node body */}
                  <circle cx="0" cy="0" r={NODE_R}
                    fill={`url(#grad-${p.id})`}
                    stroke={p.accent}
                    strokeWidth={isAct ? 2.5 : 1.5}
                    style={{ transition: 'all 0.3s ease' }}
                  />
                  {/* Image via foreignObject — sits inside the SVG node */}
                  <foreignObject
                    x={-(NODE_R - 6)}
                    y={-(NODE_R - 6)}
                    width={(NODE_R - 6) * 2}
                    height={(NODE_R - 6) * 2}
                    clipPath={`url(#clip-${p.id})`}
                    style={{ borderRadius: '50%', overflow: 'hidden' }}
                  >
                    <div style={{
                      width: '100%', height: '100%',
                      borderRadius: '50%', overflow: 'hidden',
                      position: 'relative',
                    }}>
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover"
                        onLoad={() => setImgLoaded(prev => ({ ...prev, [p.id]: true }))}
                        onError={e => { e.currentTarget.style.display = 'none' }}
                      />
                      {!imgLoaded[p.id] && (
                      <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '14px', fontWeight: 700,
                        color: p.accent, fontFamily: 'monospace',
                      }}>
                        {p.title.slice(0, 2).toUpperCase()}
                      </div>
                      )}
                    </div>
                  </foreignObject>
                  {/* Project name below */}
                  <text x="0" y={NODE_R + 22}
                    textAnchor="middle"
                    fill={isAct ? p.accent : '#F0EEE8'}
                    fontSize="14"
                    fontWeight="700"
                    fontFamily="Inter, sans-serif"
                    style={{ transition: 'fill 0.3s ease' }}
                  >
                    {p.title}
                  </text>
                </g>
              )
            })}

            {/* ── Space station hub (center) ── */}
            <g transform={`translate(${CX},${CY + floats[4]})`}>
              {/* Rotating solar panels */}
              <g transform={`rotate(${spin})`}>
                {/* Horizontal arm */}
                <rect x="-75" y="-8" width="150" height="18" rx="4"
                  fill="none" stroke="#3A3A50" strokeWidth="1.5" />
                {[-68,-44,-20,20,44].map((x, i) => (
                  <rect key={i} x={x} y="-6" width="18" height="12" rx="2"
                    fill="#1C2A3A" stroke="#378ADD33" strokeWidth="1" />
                ))}
                {/* Vertical arm */}
                <rect x="-8" y="-75" width="16" height="150" rx="4"
                  fill="none" stroke="#3A3A50" strokeWidth="1.5" />
                {[-68,-44,-20,20,44].map((y, i) => (
                  <rect key={i} x="-6" y={y} width="12" height="18" rx="2"
                    fill="#1C2A3A" stroke="#378ADD33" strokeWidth="1" />
                ))}
              </g>
              {/* Station core */}
              <circle cx="0" cy="0" r="46"
                fill="url(#hubGrad)"
                stroke="#4A4A62"
                strokeWidth="2.5" />
              {/* Inner detail ring */}
              <circle cx="0" cy="0" r="38"
                fill="none"
                stroke="#378ADD"
                strokeWidth="0.8"
                opacity="0.3" />
              {/* GitHub icon — simplified */}
              <path
                d="M0,-14 C-7.7,-14 -14,-7.7 -14,0 C-14,6.2 -10,11.5 -4.3,13.4 C-3.6,13.5 -3.3,13.1 -3.3,12.8 C-3.3,12.5 -3.3,11.5 -3.3,10.2 C-7.1,11 -7.9,8.4 -7.9,8.4 C-8.5,6.8 -9.4,6.4 -9.4,6.4 C-10.6,5.6 -9.3,5.6 -9.3,5.6 C-8,5.7 -7.3,6.9 -7.3,6.9 C-6.1,9 -4.1,8.4 -3.4,8.1 C-3.3,7.2 -2.9,6.6 -2.5,6.3 C-5.6,5.9 -8.9,4.7 -8.9,-.7 C-8.9,-2.2 -8.4,-3.4 -7.3,-4.4 C-7.5,-4.8 -8,-6.2 -7.1,-8 C-7.1,-8 -6,-8.4 -3.3,-.4 C-2.2,-.7 -1.1,-.8 0,-.8 C1.1,-.8 2.2,-.7 3.3,-.4 C6,-.8 7.1,-8.4 7.1,-8.4 C8,-6.2 7.5,-4.8 7.3,-4.4 C8.4,-3.4 8.9,-2.2 8.9,-.7 C8.9,4.7 5.5,5.9 2.5,6.3 C2.9,6.7 3.3,7.5 3.3,8.7 C3.3,10.5 3.3,12 3.3,12.8 C3.3,13.1 3.6,13.5 4.3,13.4 C10,11.5 14,6.2 14,0 C14,-7.7 7.7,-14 0,-14 Z"
                fill="#F0EEE8"
                opacity="0.9"
                transform="translate(0, -10)"
              />
              <text x="0" y="20"
                textAnchor="middle"
                fill="#9B99A6"
                fontSize="9"
                fontWeight="1000"
                fontFamily="Inter, sans-serif"
                letterSpacing="2"
              >
                PROJECTS
              </text>
            </g>

          </svg>

          {/* HTML image overlays — positioned over SVG nodes using foreignObject logic */}
          {/* We use absolute positioning relative to a wrapper instead */}
        </div>


      </div>

      {activeProject && <ProjectModal project={activeProject} onClose={() => setActive(null)} />}
    </section>
  )
}