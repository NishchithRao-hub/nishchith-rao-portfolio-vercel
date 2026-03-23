'use client'

import { useEffect, useRef, useState } from 'react'

const metrics = [
  { from: 9990,  to: 10000, suffix: '+',  label: 'Active users served',                prefix: '',  decimals: 0 },
  { from: 400,   to: 200,   suffix: 'ms', label: 'Event propagation latency',           prefix: '<', decimals: 0 },
  { from: 99.90, to: 99.99, suffix: '%',  label: 'Delivery reliability',                prefix: '',  decimals: 2 },
  { from: 45,    to: 45,    suffix: '%',  label: 'DB query reduction',                  prefix: '',  decimals: 0 },
  { from: 40,    to: 40,    suffix: '%',  label: 'Storage cost reduction',              prefix: '',  decimals: 0 },
  { from: 4.5,   to: 4.5,   suffix: '%',  label: 'Enterprise performance improvement', prefix: '+', decimals: 1 },
]

// ms between each discrete visible step — gives a consistent "1 step/sec" feel
const MS_PER_STEP = 1000
const PAUSE       = 3000

function useLoopingCount(from, to, decimals, active) {
  const [count,  setCount]  = useState(from)
  const rafRef   = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!active) return
    // Static metrics — display final value, no animation
    if (from === to) {
      return
    }

    const precision  = Math.pow(10, decimals)
    // Number of discrete displayed steps (e.g. 99.90→99.99 = 9 steps)
    const totalSteps = Math.round(Math.abs((to - from) * precision))
    // Total duration so each step takes exactly MS_PER_STEP ms
    const duration   = totalSteps * MS_PER_STEP

    const animate = () => {
      const start = performance.now()

      const step = now => {
        const elapsed  = now - start
        const progress = Math.min(elapsed / duration, 1)
        // Snap to discrete steps so it ticks visibly 1-by-1
        const rawValue   = from + progress * (to - from)
        const steppedVal = Math.round(rawValue * precision) / precision
        setCount(parseFloat(steppedVal.toFixed(decimals)))

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step)
        } else {
          timerRef.current = setTimeout(() => {
            setCount(from)
            timerRef.current = setTimeout(animate, 300)
          }, PAUSE)
        }
      }
      rafRef.current = requestAnimationFrame(step)
    }

    animate()

    return () => {
      if (rafRef.current)  cancelAnimationFrame(rafRef.current)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [active, from, to, decimals])

  return count
}

function MetricCard({ metric, active, index }) {
  const isStatic = metric.from === metric.to
  const count    = useLoopingCount(metric.from, metric.to, metric.decimals, active)
  const display  = metric.decimals > 0
    ? count.toFixed(metric.decimals)
    : Math.round(count).toLocaleString()

  return (
    <div
      className="flex flex-col items-center text-center"
      style={{
        padding: '2rem 1.5rem',
        opacity:   active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s`,
        borderRight: index < metrics.length - 1
          ? '0.5px solid var(--color-border-subtle)'
          : 'none',
      }}
    >
      <div
        className="font-bold leading-none mb-3"
        style={{
          fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
          color: isStatic ? 'var(--color-text-secondary)' : 'var(--color-text-primary)',
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '-0.02em',
        }}
      >
        <span style={{ color: 'var(--color-accent-blue)', fontSize: '0.65em' }}>
          {metric.prefix}
        </span>
        {display}
        <span style={{ color: 'var(--color-accent-blue)' }}>{metric.suffix}</span>
      </div>
      <p style={{
        fontSize: '0.68rem', fontWeight: 500,
        textTransform: 'uppercase', letterSpacing: '0.09em',
        color: 'var(--color-text-muted)', lineHeight: 1.4, maxWidth: '9rem',
      }}>
        {metric.label}
      </p>
    </div>
  )
}

export default function MetricsWall() {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative overflow-hidden"
      style={{ background: 'var(--color-background-secondary)' }}>
      <div style={{ height: '0.5px', background: 'var(--color-border-subtle)' }} />

      <div className="container-custom py-12" style={{ position: 'relative' }}>
        <p className="section-label text-center mb-12" style={{ color: 'var(--color-text-muted)', 
          fontSize: '0.85rem', fontWeight: 200, letterSpacing: '0.1em', textTransform: 'uppercase'
         }}>
          Impact by the numbers
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
          style={{ borderTop: '0.5px solid var(--color-border-subtle)' }}>
          {metrics.map((m, i) => (
            <MetricCard key={i} metric={m} active={active} index={i} />
          ))}
        </div>
      </div>

      <div style={{ height: '0.5px', background: 'var(--color-border-subtle)' }} />
    </section>
  )
}