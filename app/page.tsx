// path: app/page.tsx

import Image from 'next/image'

import { getVisibleSections } from '@/lib/concepts'
import SectionCard from '@/components/SectionCard'
import { SectionId } from '@/types/concept'

const BACKGROUND_LOGOS = [
  '/logo_blush.svg',
  '/logo_butter.svg',
  '/logo_lavender.svg',
  '/logo_mint.svg',
  '/logo_peach.svg',
  '/logo_sky.svg',
  '/logo_teal.svg',
  '/logo_periwinkle.svg',
  '/logo_sand.svg',
  '/logo_coral.svg',
]

const LEFT_FLOCK = [
  { top: 0, left: 80, size: 126, rotate: -12, opacity: 0.72, flip: false },
  { top: 14, left: 40, size: 118, rotate: 8, opacity: 0.66, flip: true },
  { top: 28, left: 90, size: 134, rotate: -6, opacity: 0.76, flip: false },
  { top: 42, left: 35, size: 122, rotate: 15, opacity: 0.64, flip: true },
  { top: 56, left: 75, size: 128, rotate: -18, opacity: 0.7, flip: false },
  { top: 70, left: 45, size: 120, rotate: 10, opacity: 0.66, flip: true },
  { top: 84, left: 85, size: 138, rotate: -8, opacity: 0.74, flip: false },
  { top: 97, left: 50, size: 124, rotate: 5, opacity: 0.64, flip: true },
]

const RIGHT_FLOCK = [
  { top: 0, left: 10, size: 124, rotate: 10, opacity: 0.66, flip: true },
  { top: 14, left: 45, size: 132, rotate: -10, opacity: 0.74, flip: false },
  { top: 28, left: 5, size: 120, rotate: 14, opacity: 0.64, flip: true },
  { top: 42, left: 40, size: 130, rotate: -14, opacity: 0.72, flip: false },
  { top: 56, left: 5, size: 126, rotate: 8, opacity: 0.68, flip: true },
  { top: 70, left: 50, size: 136, rotate: -6, opacity: 0.76, flip: false },
  { top: 84, left: 5, size: 122, rotate: 12, opacity: 0.66, flip: true },
  { top: 97, left: 38, size: 138, rotate: -16, opacity: 0.72, flip: false },
]

function Flock({ birds, side }: { birds: typeof LEFT_FLOCK; side: 'left' | 'right' }) {
  return (
    <div className={`home-decor home-decor-${side}`} aria-hidden="true">
      {birds.map((b, i) => {
        const logo = BACKGROUND_LOGOS[i % BACKGROUND_LOGOS.length]

        return (
          <img
            key={`${side}-${i}`}
            src={logo}
            alt=""
            style={{
              position: 'absolute',
              top: `${b.top}%`,
              left: `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              opacity: b.opacity,
              filter: 'brightness(0.7) contrast(1.1)',
              transform: `rotate(${b.rotate}deg) ${b.flip ? 'scaleX(-1)' : ''}`,
            }}
          />
        )
      })}
    </div>
  )
}

// Mobile/scrolling flock — restricted to only verified-safe logo files.
// blush is the original, hand-checked file; coral/seafoam/periwinkle/sand/
// plum/teal are exact copies of its path data with only the fill color
// swapped, so they're guaranteed structurally identical. The self-made
// butter/lavender/mint/peach/sky variants are excluded here until each is
// individually checked — one of them is rendering as a broken solid shape
// instead of a bird, and it's faster to just avoid the whole unverified set
// than hunt for which one it is.
const FLOCK_LOGOS = [
  '/logo_blush.svg',
  '/logo_coral.svg',
  '/logo_periwinkle.svg',
  '/logo_sand.svg',
  '/logo_teal.svg',
]

// Smaller, fewer, and further off-screen than before — mobile has very
// little margin to work with (unlike desktop's generous gutters), so birds
// need to mostly bleed off the edge rather than sit fully on-screen.
const SCROLLING_FLOCK_COUNT = 14
const SCROLLING_FLOCK = Array.from({ length: SCROLLING_FLOCK_COUNT }, (_, i) => {
  const t = i / (SCROLLING_FLOCK_COUNT - 1)
  return {
    top: Math.round(t * 100),
    side: (i % 2 === 0 ? 'left' : 'right') as 'left' | 'right',
    size: 18 + Math.round(8 * Math.abs(Math.sin(i * 1.7))), // 18–26px, was 48–70px
    rotate: Math.round(Math.sin(i * 2.3) * 14),
    opacity: 0.22 + 0.1 * Math.abs(Math.cos(i * 1.3)), // 0.22–0.32, was 0.45–0.6
    flip: i % 3 === 0,
    logo: FLOCK_LOGOS[i % FLOCK_LOGOS.length],
  }
})

function ScrollingFlock() {
  return (
    <div className="scrolling-decor" aria-hidden="true">
      {SCROLLING_FLOCK.map((b, i) => (
        <img
          key={i}
          src={b.logo}
          alt=""
          style={{
            position: 'absolute',
            top: `${b.top}%`,
            // Negative offset so most of the bird bleeds off-screen — this
            // is what lets it sit near the edge without ever overlapping a
            // card, regardless of how narrow the phone is.
            left: b.side === 'left' ? '-10px' : undefined,
            right: b.side === 'right' ? '-10px' : undefined,
            width: `${b.size}px`,
            height: `${b.size}px`,
            opacity: b.opacity,
            filter: 'brightness(0.7) contrast(1.1)',
            transform: `rotate(${b.rotate}deg) ${b.flip ? 'scaleX(-1)' : ''}`,
          }}
        />
      ))}
    </div>
  )
}

export default function HomePage() {
  const sections = getVisibleSections()

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      <style>{`
        .sections-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        /* Padding lives here (a real CSS class) instead of as an inline
           style on <main>, specifically so this media query can actually
           override it — inline styles always beat stylesheet rules
           regardless of specificity, so the old approach silently never
           reduced padding on mobile at all. */
        .home-main {
          max-width: 1000px;
          margin: 0 auto;
          padding: 80px 24px;
          position: relative;
          z-index: 1;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .sections-grid {
            grid-template-columns: 1fr;
          }
          .home-main {
            padding: 48px 16px;
          }
        }

        .home-decor {
          position: fixed;
          top: 64px;
          bottom: 0;
          width: 220px;
          pointer-events: none;
          z-index: 0;
        }
        .home-decor-left { left: 0; }
        .home-decor-right { right: 0; }

        @media (max-width: 1500px) {
          .home-decor { display: none; }
        }

        .scrolling-decor {
          display: none;
        }
        @media (max-width: 1500px) {
          .scrolling-decor {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
          }
        }
      `}</style>

      <Flock birds={LEFT_FLOCK} side="left" />
      <Flock birds={RIGHT_FLOCK} side="right" />
      <ScrollingFlock />

      <main className="home-main">

        {/* Hero — flex column keeps logo, title, tagline locked to center,
            width:100% + explicit textAlign guarantees it regardless of
            what's happening around it */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
          marginBottom: '56px',
        }}>
          <div style={{ marginBottom: '24px', height: '96px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src="/logo2.svg" alt="Hummingraph logo" width={150} height={150} />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-nunito), sans-serif',
            fontSize: '2.75rem',
            fontWeight: 800,
            color: '#3A3A3A',
            marginBottom: '12px',
            letterSpacing: '-0.02em',
          }}>
            Hummingraph
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#888888',
            maxWidth: '440px',
            lineHeight: '1.6',
          }}>
            A Hummingbird's map for Data Science
          </p>
        </div>

        {/* Section grid — 2 col on desktop, 1 col on mobile */}
        <div className="sections-grid">
          {sections.map(section => (
            <SectionCard key={section.id} section={{ ...section, id: section.id as SectionId }} />
          ))}
        </div>

      </main>
    </div>
  )
}