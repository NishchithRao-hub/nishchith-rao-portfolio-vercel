'use client'

import { useEffect, useRef, useState } from 'react'

const socials = [
  {
    label: 'LinkedIn',
    handle: 'nishchith-rao-p-r',
    url: 'https://www.linkedin.com/in/nishchith-rao-p-r/',
    color: '#0A66C2',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    handle: 'NishchithRao-hub',
    url: 'https://github.com/NishchithRao-hub',
    color: '#F0EEE8',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    handle: 'nishchithraopr@gmail.com',
    url: 'mailto:nishchithraopr@gmail.com',
    color: '#EA4335',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
]

const inputStyle = {
  width: '100%',
  background: 'var(--color-background-elevated)',
  borderWidth: '0.5px',
  borderStyle: 'solid',
  borderColor: 'var(--color-border-medium)',
  borderRadius: '8px',
  padding: '0.75rem 1rem',
  fontSize: '0.88rem',
  color: 'var(--color-text-primary)',
  fontFamily: 'var(--font-sans)',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
}

export default function ContactSection() {
  const sectionRef = useRef(null)
  const [form,   setForm]   = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [focused, setFocused] = useState(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    // Replace with your actual form endpoint (Formspree, Resend, etc.)
    // For now simulates a successful send after 1.5s
    const res = await fetch('https://formspree.io/f/meoknppz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
    })
    if (!res.ok) setStatus('error')
    else setStatus('success')

    await new Promise(r => setTimeout(r, 1500))
    setStatus('success')
    setForm({ name: '', email: '', message: '' })
  }

  const focusStyle = name => focused === name ? {
    borderColor: '#378ADD',
    boxShadow: '0 0 0 3px rgba(55,138,221,0.12)',
  } : {}

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding"
      style={{
        backgroundColor: '#070D09',
        backgroundImage: `
          linear-gradient(rgba(74, 222, 128, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(74, 222, 128, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: '44px 44px',
        paddingBottom: 0,
      }}
    >
      <style>{`
        @keyframes checkPop {
          0%   { transform: scale(0); opacity: 0; }
          60%  { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes sendPulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.5; }
        }
      `}</style>

      <div className="container-custom">

        {/* Header */}
        <div className="reveal mb-12">
          <p className="section-label mb-2" style={{ fontSize: '1.05rem', letterSpacing: '0.13em' }}>Contact</p>
          <h2 style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', letterSpacing: '-0.02em' }}>
            Let&apos;s get in touch!
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem', marginBottom: '1.5rem', maxWidth: '480px', lineHeight: 1.7 }}>
            I&apos;m actively looking for software engineering roles. Whether you have an opportunity, a question or just want to say hello - my inbox is open.
          </p>
        </div>

        <div className="reveal contact-grid grid md:grid-cols-2 gap-12 items-start" style={{ gridTemplateColumns: '1fr 1.1fr' }}>

          {/* ── Left: info + socials ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Availability card */}
            <div style={{
              background: 'var(--color-background-card)',
              border: '0.5px solid var(--color-border-medium)',
              borderLeft: '2px solid #1D9E75',
              borderRadius: '0 12px 12px 0',
              padding: '1.25rem 1.5rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                <span style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: '#1D9E75',
                  boxShadow: '0 0 8px #1D9E7588',
                  animation: 'sendPulse 2.5s ease-in-out infinite',
                  display: 'inline-block',
                }} />
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1D9E75',
                  textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Ready for new opportunities
                </p>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                Open to Software Engineer roles - backend, full-stack, ML/AI adjacent or data related. Based in the Bay Area, but open to relocation.
              </p>
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'white',
                textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                Find me here
              </p>
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '0.85rem 1.1rem',
                    background: 'var(--color-background-card)',
                    borderWidth: '0.5px',
                    borderStyle: 'solid',
                    borderColor: 'var(--color-border-medium)',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    color: 'var(--color-text-primary)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.border = `0.5px solid ${s.color}88`
                    e.currentTarget.style.background = 'var(--color-background-card)'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.border = '0.5px solid var(--color-border-medium)'
                    e.currentTarget.style.background = 'var(--color-background-card)'
                    e.currentTarget.style.transform = ''
                  }}
                >
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '8px', flexShrink: 0,
                    background: s.color + '18',
                    border: `0.5px solid ${s.color}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: s.color,
                  }}>
                    {s.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '1px' }}>
                      {s.label}
                    </p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {s.handle}
                    </p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ marginLeft: 'auto', color: 'var(--color-text-muted)', opacity: 0.5 }}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              ))}
            </div>

            {/* Resume download */}
            <a
              href="/resume.pdf"
              download
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '0.85rem',
                background: 'var(--color-background-card)',
                borderWidth: '0.5px',
                borderStyle: 'solid',
                borderColor: 'var(--color-border-medium)',
                borderRadius: '10px',
                color: 'var(--color-text-secondary)',
                fontSize: '0.82rem', fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.border = '0.5px solid #378ADD88'
                e.currentTarget.style.color = '#378ADD'
                e.currentTarget.style.background = 'var(--color-background-card)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.border = '0.5px solid var(--color-border-medium)'
                e.currentTarget.style.color = ''
                e.currentTarget.style.background = 'var(--color-background-card)'
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Resume
            </a>
          </div>

          {/* ── Right: Contact form ── */}
          <div style={{
            background: 'var(--color-background-card)',
            border: '0.5px solid var(--color-border-medium)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
          }}>

            {status === 'success' ? (
              <div style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '1rem', minHeight: '320px', textAlign: 'center',
              }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: '#1D9E7518',
                  border: '2px solid #1D9E75',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: 'checkPop 0.5s cubic-bezier(0.23,1,0.32,1) forwards',
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1D9E75"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                    Message sent!
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                    Thanks for reaching out. I&apos;ll get back to you as soon as I can.
                  </p>
                </div>
                <button
                  onClick={() => setStatus('idle')}
                  style={{
                    marginTop: '0.5rem', padding: '0.6rem 1.5rem',
                    borderRadius: '999px', border: '0.5px solid var(--color-border-medium)',
                    background: 'transparent', color: 'var(--color-text-muted)',
                    fontSize: '0.8rem', cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-muted)',
                    textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
                    Name
                  </label>
                  <input
                    type="text" name="name" placeholder="Your name"
                    value={form.name} onChange={handleChange}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                    required
                    style={{ ...inputStyle, ...focusStyle('name') }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-muted)',
                    textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
                    Email
                  </label>
                  <input
                    type="email" name="email" placeholder="your@email.com"
                    value={form.email} onChange={handleChange}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                    required
                    style={{ ...inputStyle, ...focusStyle('email') }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-muted)',
                    textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
                    Message
                  </label>
                  <textarea
                    name="message" placeholder="What's on your mind?"
                    value={form.message} onChange={handleChange}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                    required rows={5}
                    style={{ ...inputStyle, ...focusStyle('message'), resize: 'vertical', minHeight: '120px', lineHeight: 1.6 }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    padding: '0.85rem',
                    background: status === 'sending' ? 'rgba(55,138,221,0.6)' : '#378ADD',
                    color: '#0A0A0F',
                    border: 'none', borderRadius: '10px',
                    fontSize: '0.88rem', fontWeight: 700,
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'all 0.2s ease',
                    animation: status === 'sending' ? 'sendPulse 1s ease-in-out infinite' : 'none',
                  }}
                  onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.opacity = '0.88' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                >
                  {status === 'sending' ? (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ animation: 'spin 1s linear infinite' }}>
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </>
                  )}
                </button>

                <p style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
                  I typically respond within 10–15 hours.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="reveal" style={{ marginTop: '5rem' }}>
          <div style={{ height: '0.5px', background: 'var(--color-border-subtle)' }} />

          <div style={{
            background: 'var(--color-background-primary)',
            marginLeft: 'calc(50% - 50vw)',
            marginRight: 'calc(50% - 50vw)',
            padding: '1.5rem 0',
          }}>
            <div className="container-custom" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
            }}>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                Designed & built by <span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>Nishchith Rao</span> · {new Date().getFullYear()}
              </p>
              <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                Next.js · Tailwind · Vercel
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}