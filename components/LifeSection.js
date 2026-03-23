'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const zones = [
  { id: 'football', label: 'The Pitch',     emoji: '⚽', color: '#16A34A' },
  { id: 'gaming',   label: 'The Controller',emoji: '🎮', color: '#7C3AED' },
  { id: 'travel',   label: 'The Trail',     emoji: '🏔',  color: '#D97706' },
  { id: 'community',label: 'The Community', emoji: '🤝', color: '#0EA5E9' },
]

const photos = [
  { src: '/life/travel1.jpg', caption: 'Somewhere worth the climb' },
  { src: '/life/travel2.jpg', caption: 'Chasing the horizon'       },
  { src: '/life/travel3.jpg', caption: 'Every trail tells a story' },
  { src: '/life/travel5.jpg', caption: 'Golden hour on the summit' },
  { src: '/life/travel6.jpg', caption: 'Far from the terminal'     },
  { src: '/life/travel4.jpg', caption: 'Above the noise'           },
]

const games = [
  {
    title:    'EA FC 26',
    site:     'https://www.ea.com/games/ea-sports-fc/fc-26',
    genre:    'Football Sim',
    studio:   'EA Sports',
    status:   'playing',
    color:    '#10B981',
    bg:       'linear-gradient(135deg, #064E3B 0%, #065F46 50%, #047857 100%)',
    desc:     'Weekend league warrior. La Liga season never ends.',
    img:      '/life/eafc.jpg',
    stats:    [
      { label: 'Mode', value: 'FUT + Seasons' },
      { label: 'Club', value: 'Real Madrid' },
      { label: 'Playtime', value: '200+ hrs' },
    ],
  },
  {
    title:    'Valorant',
    site:     'https://playvalorant.com/',
    genre:    'Tactical FPS',
    studio:   'Riot Games',
    status:   'playing',
    color:    '#FF4655',
    bg:       'linear-gradient(135deg, #1a0000 0%, #2D0A0A 50%, #3D0505 100%)',
    desc:     'Clutch or fail. Usually clutch.',
    img:      '/life/valorant.jpg',
    stats:    [
      { label: 'Role', value: 'Controller / Initiator' },
      { label: 'Peak Rank', value: 'Diamond' },
      { label: 'Main Agent', value: 'Sova' },
    ],
  },
  {
    title:    "Ghost of Tsushima",
    site:     'https://www.playstation.com/games/ghost-of-tsushima/',
    genre:    'Action RPG',
    studio:   'Sucker Punch',
    status:   'completed',
    color:    '#C9A84C',
    bg:       'linear-gradient(135deg, #0D0A04 0%, #1A1408 50%, #241C0C 100%)',
    desc:     'The most beautiful game ever made.',
    img:      '/life/tsushima.jpg',
    stats:    [
      { label: 'Progress', value: '100% Complete' },
      { label: 'Difficulty', value: 'Lethal' },
      { label: 'Favorite', value: 'Iki Island Arc' },
    ],
  },
]

function IndiaFlag() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" style={{ borderRadius: '50%', flexShrink: 0 }}>
      <clipPath id="circle-clip"><circle cx="14" cy="14" r="14"/></clipPath>
      <g clipPath="url(#circle-clip)">
        <rect x="0" y="0"    width="28" height="9.33"  fill="#FF9933"/>
        <rect x="0" y="9.33" width="28" height="9.33"  fill="#FFFFFF"/>
        <rect x="0" y="18.67" width="28" height="9.33" fill="#138808"/>
        {/* Ashoka Chakra */}
        <circle cx="14" cy="14" r="3.5" fill="none" stroke="#000080" strokeWidth="0.8"/>
        {[...Array(24)].map((_, i) => {
          const angle = (i * 15 * Math.PI) / 180
          return <line key={i}
            x1={14 + 1.2 * Math.cos(angle)} y1={14 + 1.2 * Math.sin(angle)}
            x2={14 + 3.5 * Math.cos(angle)} y2={14 + 3.5 * Math.sin(angle)}
            stroke="#000080" strokeWidth="0.5"/>
        })}
        <circle cx="14" cy="14" r="1" fill="#000080"/>
      </g>
    </svg>
  )
}

// ── Zone: Football ─────────────────────────────────────────────────────────
function FootballZone() {
  const stats = [
    { label: 'PAC', value: 84 },
    { label: 'SHO', value: 87 },
    { label: 'PAS', value: 89 },
    { label: 'DRI', value: 81 },
    { label: 'DEF', value: 72 },
    { label: 'PHY', value: 87 },
  ]

  return (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>

      {/* FIFA Player Card */}
      <div style={{ width: '215px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
        <div style={{
          width: '100%',
          background: 'linear-gradient(145deg, #C9A84C, #F0D080, #B8922A)',
          borderRadius: '16px',
          padding: '1.2rem 1.1rem 1.1rem',
          boxShadow: '0 20px 60px rgba(201,168,76,0.35), 0 4px 12px rgba(0,0,0,0.5)',
          position: 'relative', overflow: 'hidden',
          border: '1px solid #E8C84A',
        }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
          borderRadius: '16px', pointerEvents: 'none',
        }} />

        {/* Rating + Position + flags */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <div>
            <p style={{ fontSize: '2rem', fontWeight: 900, color: '#1A1000', lineHeight: 1 }}>84</p>
            <p style={{ fontSize: '0.6rem', fontWeight: 800, color: '#1A1000', letterSpacing: '0.08em' }}>MID</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <IndiaFlag />
            {/* UFA badge — highlighted */}
            <div style={{
              width: '28px', height: '28px',
              background: 'linear-gradient(135deg, #16A34A, #15803D)',
              borderRadius: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.48rem', fontWeight: 900, color: '#fff',
              letterSpacing: '0.04em',
              boxShadow: '0 2px 8px rgba(22,163,74,0.5)',
              border: '1px solid rgba(255,255,255,0.3)',
            }}>UFA</div>
          </div>
        </div>

        {/* Player photo */}
        <div style={{
          width: '100%', height: '108px', borderRadius: '8px',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(0,0,0,0.18))',
          marginBottom: '0.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.15)',
        }}>
          <Image src="/life/player.png" alt="Player" fill className="object-contain"
            onError={e => { e.currentTarget.style.display = 'none' }} />
        </div>

        {/* Name */}
        <p style={{
          fontSize: '0.72rem', fontWeight: 900, color: '#1A1000',
          textAlign: 'center', letterSpacing: '0.1em',
          textTransform: 'uppercase', marginBottom: '0.65rem',
          borderTop: '1px solid rgba(0,0,0,0.15)',
          borderBottom: '1px solid rgba(0,0,0,0.15)',
          padding: '0.28rem 0',
        }}>
          Nishchith Rao
        </p>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#1A1000', minWidth: '20px' }}>{s.value}</span>
                <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#3D2A00', letterSpacing: '0.05em' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{
          fontSize: '0.72rem',
          color: 'white',
          lineHeight: 1.5,
          textAlign: 'center',
          fontStyle: 'italic',
        }}>
          How I rate myself as a player!
        </p>
      </div>

      {/* Right column */}
      <div style={{
        flex: 1,
        minWidth: '260px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignSelf: 'stretch',
      }}>

        <p style={{
          fontSize: '0.85rem',
          color: 'white',
          lineHeight: 1.6,
          fontStyle: 'bold',
          fontWeight: 400,
          marginBottom: '0.1rem',
        }}>
          Football as a sport has taught me many important skills - discipline, team spirit 
          and the never-give-up attitude that shapes not just how I play, but also how I work.
        </p>

        {/* UFA Club card — TOP, highlighted */}
        <div style={{
          background: 'linear-gradient(135deg, #052E16 0%, #14532D 100%)',
          borderRadius: '12px', padding: '1.1rem 1.25rem',
          border: '1px solid #16A34A55',
          boxShadow: '0 4px 20px rgba(22,163,74,0.2)',
          marginBottom: '2rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
            <p style={{ fontSize: '0.6rem', fontWeight: 700, color: '#4ADE80',
              textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              ⚽ My Club Career
            </p>
            <span style={{
              fontSize: '0.62rem', fontWeight: 700, padding: '2px 10px',
              borderRadius: '999px', background: '#16A34A33',
              border: '1px solid #16A34A66', color: '#4ADE80',
            }}>Player</span>
          </div>
          <p style={{ fontSize: '1rem', fontWeight: 800, color: '#F0FFF4', marginBottom: '2px' }}>
            Club - United Football Association
          </p>
          <p style={{ fontSize: '0.72rem', color: '#86EFAC', marginBottom: '0.6rem' }}>
            B Division · Bangalore, India · 2021 – 2023
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['Role: Midfielder', 'AIFF Affiliated', '~35 appearences'].map((t, i) => (
              <span key={i} style={{
                fontSize: '0.65rem', padding: '2px 9px', borderRadius: '999px',
                background: 'rgba(74,222,128,0.1)',
                border: '0.5px solid rgba(74,222,128,0.3)',
                color: '#86EFAC',
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Real Madrid card — BELOW, with logo + 3 photos */}
        <div style={{
          background: 'linear-gradient(135deg, #00205B 0%, #002776 60%, #001F5B 100%)',
          borderRadius: '12px', padding: '1.1rem 1.25rem',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          flex: 1,
          minHeight: '300px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.85rem' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.18)',
              overflow: 'hidden', position: 'relative', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Image src="/logos/realmadrid.png" alt="Real Madrid" fill className="object-contain p-1"
                onError={e => { e.currentTarget.style.display = 'none' }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#F0EEE8' }}>Real Madrid C.F.</p>
              <p style={{ fontSize: '0.62rem', fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}>Supporter since forever</p>
            </div>
            <span style={{
              fontSize: '0.58rem', fontWeight: 700, padding: '3px 8px',
              borderRadius: '999px', background: 'rgba(255,215,0,0.15)',
              border: '1px solid rgba(255,215,0,0.35)', color: '#FFD700',
              letterSpacing: '0.06em',
            }}>HALA MADRID</span>
          </div>

          {/* 3 club moment photos — bigger, no placeholder emoji */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '8px',
            marginTop: '0.25rem',
            flex: 1,
          }}>
            {['/life/rm1.png', '/life/rm2.jpg', '/life/rm3.jpg'].map((src, i) => (
              <div key={i} style={{
                minHeight: '170px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.06)',
                border: '0.5px solid rgba(255,255,255,0.1)',
                overflow: 'hidden', position: 'relative',
              }}>
                <Image src={src} alt={`RM moment ${i+1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Zone: Gaming ───────────────────────────────────────────────────────────
function GamingZone() {
  const [hovered, setHovered] = useState(null)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.25rem',
        
      }}>
        {games.map((g, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              width: '100%', borderRadius: '12px', height: '110%',
              background: g.bg,
              border: `2px solid ${g.color}44`,
              overflow: 'hidden',
              boxShadow: hovered === i
                ? `0 16px 48px ${g.color}44, 0 0 0 1px ${g.color}66`
                : '0 4px 16px rgba(0,0,0,0.4)',
              transition: 'all 0.3s ease',
              transform: hovered === i ? 'translateY(-6px) scale(1.02)' : 'none',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Game cover image area */}
            <div style={{
              height: '300px', position: 'relative',
              background: `${g.color}22`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Image src={g.img} alt={g.title} fill className="object-cover"
                onError={e => { e.currentTarget.style.display = 'none' }} />
              {/* Status badge */}
              <div style={{
                position: 'absolute', top: '8px', right: '8px',
                display: 'flex', alignItems: 'center', gap: '4px',
                background: 'rgba(0,0,0,0.7)', borderRadius: '999px',
                padding: '2px 8px', backdropFilter: 'blur(4px)',
              }}>
                <span style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: g.status === 'playing' ? '#22C55E' : '#6B7280',
                  animation: g.status === 'playing' ? 'pulse 2s infinite' : 'none',
                }} />
                <span style={{ fontSize: '0.55rem', color: '#fff', fontWeight: 600 }}>
                  {g.status === 'playing' ? 'Playing' : 'Completed'}
                </span>
              </div>
            </div>
            {/* Info */}
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <a
                href={g.site}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#F0EEE8',
                  marginBottom: '0.5rem',
                  textDecoration: 'none',
                }}
              >
                {g.title}
              </a>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.6rem' }}>
                {g.stats.map((s, si) => (
                  <span key={si} style={{
                    fontSize: '0.58rem',
                    padding: '2px 7px',
                    borderRadius: '999px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '0.5px solid rgba(255,255,255,0.2)',
                    color: 'rgba(255,255,255,0.9)',
                    letterSpacing: '0.02em',
                  }}>
                    {s.label}: {s.value}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '0.6rem', padding: '1px 7px', borderRadius: '999px',
                  background: `${g.color}22`, border: `0.5px solid ${g.color}55`,
                  color: g.color, fontWeight: 600,
                }}>{g.genre}</span>
                <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)' }}>{g.studio}</span>
              </div>
              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, fontStyle: 'italic' }}>
                {g.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Zone: Travel ──────────────────────────────────────────────────────────
function TravelZone() {
  const rotations = [-2, 1.5, -1, 2.5, -1.8, 1]
  const [failedImages, setFailedImages] = useState({})

  const handleImageError = (src) => {
    setFailedImages(prev => ({ ...prev, [src]: true }))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: '1rem',
        alignItems: 'flex-start',
      }}>
        {photos.map((p, i) => (
          <div
            key={i}
            style={{
              background: '#F5F0E8',
              padding: '0.6rem 0.6rem 2rem',
              borderRadius: '2px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.3)',
              transform: `rotate(${rotations[i % rotations.length]}deg)`,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              width: '100%',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'rotate(0deg) scale(1.06)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5)'
              e.currentTarget.style.zIndex = '10'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = `rotate(${rotations[i % rotations.length]}deg)`
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.4)'
              e.currentTarget.style.zIndex = '1'
            }}
          >
            <div style={{
              width: '100%', height: '220px', position: 'relative',
              background: '#D0C8B8', overflow: 'hidden', borderRadius: '1px',
            }}>
              <Image src={p.src} alt={p.caption} fill className="object-cover"
                onError={e => {
                  e.currentTarget.style.display = 'none'
                  handleImageError(p.src)
                }} />
              {failedImages[p.src] ? (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, #A09080, #C0B090)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem',
                }}>🏔</div>
              ) : null}
            </div>
            <p style={{
              marginTop: '0.5rem',
              fontSize: '0.6rem', color: '#4A3828',
              fontFamily: 'Georgia, serif', fontStyle: 'italic',
              textAlign: 'center', lineHeight: 1.4,
            }}>
              {p.caption}
            </p>
          </div>
        ))}
      </div>
      <p style={{
        fontSize: '0.88rem', color: 'white', fontWeight: 300,
        fontStyle: 'italic', marginTop: '0.25rem',
      }}>
        Hiking, exploring and finding signal-free zones since 2018.
      </p>
    </div>
  )
}

// ── Zone: Community ────────────────────────────────────────────────────────
function CommunityZone() {
  const activities = [
    {
      type: 'Community',
      title: 'Open Discussions + Guest Speakers',
      desc: 'AI NU hosts open conversations, speaker sessions, and cross-discipline exchanges to keep learning accessible and practical.',
      color: '#E5E7EB',
    },
    {
      type: 'Build',
      title: 'Hackathons + Projects',
      desc: 'Members collaborate on hands-on AI projects and hackathons that build technical depth, portfolio-ready outcomes, and teamwork.',
      color: '#E5E7EB',
    },
    {
      type: 'Growth',
      title: 'Skills + Career Foundation',
      desc: 'Students develop AI framework fluency, responsible AI thinking, communication skills, and industry-facing confidence.',
      color: '#E5E7EB',
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{
        background: 'linear-gradient(135deg, #0A0A0A 0%, #18181B 55%, #3F1010 100%)',
        borderRadius: '12px',
        padding: '1.25rem',
        border: '1px solid rgba(239,68,68,0.34)',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 2.2fr) minmax(260px, 1fr)',
        gap: '1rem',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem', marginBottom: '0.75rem' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '12px',
              background: '#FFFFFF',
              border: '1px solid rgba(239,68,68,0.38)',
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
            }}>
              <Image src="/logos/ai_club.png" alt="AI NU logo" fill className="object-contain p-1"
                onError={e => { e.currentTarget.style.display = 'none' }} />
            </div>
            <div>
              <p style={{ fontSize: '1rem', fontWeight: 800, color: '#F0EEE8', marginBottom: '4px' }}>
                Artificial Intelligence Club (AI NU) - Member
              </p>
              <p style={{ fontSize: '0.74rem', color: '#FECACA', lineHeight: 1.45 }}>
                Fostering understanding and knowledge of AI in an inclusive, laid-back community.
              </p>
            </div>
          </div>

          <p style={{ fontSize: '0.73rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.65, marginBottom: '1.75rem' }}>
            AI NU welcomes students from all backgrounds, including those with no prior AI experience.
            The club emphasizes intellectual curiosity, responsible AI, and diverse perspectives through projects,
            workshops, discussions, and collaborative events.
          </p>

          <div style={{
            position: 'relative',
            height: '180px',
            borderRadius: '10px',
            overflow: 'hidden',
            border: '2px solid rgba(255,255,255,0.18)',
            marginBottom: '1.0rem',
            width: '950px',
          }}>
            <Image src="/life/ai_northeastern.png" alt="AI NU event experience" fill className='object-cover'
              onError={e => { e.currentTarget.style.display = 'none' }} />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {['Open to all backgrounds', 'No application required', 'Undergrad + Graduate', 'Inclusive culture'].map((tag, i) => (
              <span key={i} style={{
                fontSize: '0.62rem',
                padding: '3px 10px',
                borderRadius: '999px',
                background: 'rgba(239,68,68,0.12)',
                border: '1px solid rgba(252,165,165,0.4)',
                color: '#FECACA',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div style={{
          background: 'rgba(10,10,10,0.55)',
          borderRadius: '10px',
          border: '2px solid rgba(239,68,68,0.3)',
          padding: '0.9rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.55rem',
          height: '155px',
        }}>
          <p style={{ fontSize: '0.67rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#FCA5A5', fontWeight: 700 }}>
            Club Details
          </p>
          <p style={{ fontSize: '0.72rem', color: '#E5E7EB' }}><strong style={{ color: '#FECACA' }}>President:</strong> Alexzander Sansiveri</p>
          <p style={{ fontSize: '0.72rem', color: '#E5E7EB' }}><strong style={{ color: '#FECACA' }}>Advisor:</strong> Derek Curry</p>
          <p style={{ fontSize: '0.72rem', color: '#E5E7EB' }}><strong style={{ color: '#FECACA' }}>Location:</strong> Boston</p>
          <a
            href="https://ainu-website.web.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              color: '#FCA5A5',
              textDecoration: 'none',
              wordBreak: 'break-all',
            }}
          >
            ainu-website.web.app
          </a>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.85rem' }}>
        {activities.map((ev, i) => (
          <div key={i} style={{
            background: 'rgba(10,18,46,0.55)',
            borderRadius: '10px',
            padding: '1rem',
            border: `1px solid ${ev.color}44`,
            borderLeft: `3px solid ${ev.color}`,
          }}>
            <span style={{
              fontSize: '0.58rem', fontWeight: 700, padding: '2px 8px',
              borderRadius: '999px',
              background: `${ev.color}1A`,
              border: `0.5px solid ${ev.color}55`,
              color: ev.color,
              letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              {ev.type}
            </span>
            <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#E2E8F0', margin: '0.5rem 0 0.35rem' }}>
              {ev.title}
            </p>
            <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.68)', lineHeight: 1.6 }}>
              {ev.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main section ────────────────────────────────────────────────────────────
export default function LifeSection() {
  const sectionRef   = useRef(null)
  const scrollRef    = useRef(null)
  const [active, setActive]   = useState(0)
  const [canLeft,  setCanLeft]  = useState(false)
  const [canRight, setCanRight] = useState(true)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const scrollTo = (i) => {
    const el = scrollRef.current
    if (!el) return
    const zoneWidth = el.clientWidth
    el.scrollTo({ left: i * zoneWidth, behavior: 'smooth' })
    setActive(i)
  }

  const scrollByStep = (dir) => {
    const next = Math.max(0, Math.min(zones.length - 1, active + dir))
    if (next !== active) scrollTo(next)
  }

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / el.clientWidth)
    setActive(idx)
    setCanLeft(el.scrollLeft > 10)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  useEffect(() => {
    handleScroll()
    const onResize = () => handleScroll()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const zoneComponents = [FootballZone, GamingZone, TravelZone, CommunityZone]

  return (
    <section id="life" ref={sectionRef} className="section-padding"
      style={{ background: 'var(--color-background-secondary)', overflow: 'hidden' }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.85)} }
        .zone-scroll::-webkit-scrollbar { display: none; }
        .zone-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="container-custom">
        {/* Header */}
        <div className="reveal mb-12" style={{ marginBottom: '20px' }}>
          <p className="section-label mb-2" style={{ fontSize: '1.05rem', letterSpacing: '0.13em' }}>Life</p>
          <h2
            className='font-bold' 
            style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', letterSpacing: '-0.02em' }}>
            Life outside the terminal
          </h2>
        </div>

        {/* Zone tabs */}
        <div className="reveal zone-tabs" style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {zones.map((z, i) => (
            <button
              key={z.id}
              onClick={() => scrollTo(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '0.5rem 1rem', borderRadius: '999px',
                background: active === i ? `${z.color}22` : 'var(--color-background-card)',
                border: `1px solid ${active === i ? z.color : 'var(--color-border-medium)'}`,
                color: active === i ? z.color : 'var(--color-text-muted)',
                cursor: 'pointer', fontSize: '0.78rem', fontWeight: active === i ? 600 : 400,
                transition: 'all 0.25s ease',
              }}
            >
              <span>{z.emoji}</span>
              <span>{z.label}</span>
            </button>
          ))}
        </div>

        {/* Horizontal scroll container */}
        <div className="reveal" style={{ position: 'relative' }}>
          <button
            onClick={() => scrollByStep(-1)}
            disabled={!canLeft}
            aria-label="Go to previous section"
            style={{
              position: 'absolute',
              left: '-80px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '52px',
              height: '52px',
              borderRadius: '999px',
              border: '2px solid var(--color-border-medium)',
              background: 'rgba(0,0,0,0.72)',
              color: 'var(--color-text-primary)',
              cursor: canLeft ? 'pointer' : 'not-allowed',
              opacity: canLeft ? 1 : 0.45,
              zIndex: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.45rem',
              fontWeight: 700,
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(3px)',
            }}
          >
            ←
          </button>

          <button
            onClick={() => scrollByStep(1)}
            disabled={!canRight}
            aria-label="Go to next section"
            style={{
              position: 'absolute',
              right: '-80px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '52px',
              height: '52px',
              borderRadius: '999px',
              border: '2px solid var(--color-border-medium)',
              background: 'rgba(0,0,0,0.72)',
              color: 'var(--color-text-primary)',
              cursor: canRight ? 'pointer' : 'not-allowed',
              opacity: canRight ? 1 : 0.45,
              zIndex: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.45rem',
              fontWeight: 700,
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(3px)',
            }}
          >
            →
          </button>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="zone-scroll"
            style={{
              display: 'flex',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              gap: 0,
              borderRadius: '16px',
            }}
          >
            {zoneComponents.map((ZoneComp, i) => (
              <div
                key={i}
                style={{
                  minWidth: '100%',
                  scrollSnapAlign: 'start',
                  background: 'var(--color-background-card)',
                  border: `1px solid ${zones[i].color}33`,
                  borderRadius: '16px',
                  padding: '2rem',
                  boxShadow: `0 0 0 1px ${zones[i].color}15`,
                  transition: 'border-color 0.3s ease',
                }}
              >
                {/* Zone header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.75rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>{zones[i].emoji}</span>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {zones[i].label}
                    </h3>
                    {zones[i].id === 'gaming' ? (
                      <p style={{
                        fontSize: '0.75rem',
                        fontWeight: 400,
                        color: 'white',
                        marginTop: '3px',
                        fontStyle: 'bold',
                      }}>
                        Games I love to play
                      </p>
                    ) : null}
                    {zones[i].id === 'travel' ? (
                      <p style={{
                        fontSize: '0.75rem',
                        fontWeight: 400,
                        color: 'white',
                        marginTop: '3px',
                        fontStyle: 'bold',
                      }}>
                        My best hiking moments
                      </p>
                    ) : null}
                  </div>
                  {/* Zone indicator dots */}
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {zones.map((_, di) => (
                      <button
                        key={di}
                        onClick={() => scrollTo(di)}
                        style={{
                          width: di === i ? '20px' : '6px',
                          height: '6px',
                          borderRadius: '999px',
                          background: di === i ? zones[i].color : 'var(--color-border-medium)',
                          border: 'none', cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          padding: 0,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <ZoneComp />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}