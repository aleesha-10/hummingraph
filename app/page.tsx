// path: app/page.tsx

// this file defines the homepage of the Hummingraph application. 
// It displays a hero section with the app's logo and tagline, followed by a grid of SectionCard components for each visible section of concepts.
// The sections are retrieved using the getVisibleSections function from the concepts library, which filters the sections based on their visibility status.
// The page is styled to be responsive, with a 2-column grid on desktop and a single column on mobile devices.

import Image from 'next/image'

import { getVisibleSections } from '@/lib/concepts'
import SectionCard from '@/components/SectionCard'
import { SectionId } from '@/types/concept'

// A scattered "flock" of small hummingbirds down each gutter, instead of one
// big photo. top/left are % within a 220px-wide, full-height strip. flip
// mirrors the bird so they don't all face the same direction.
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

// top: 0 = right at the navbar edge, 100 = bottom of the page.
// left: 0 = outer screen edge, 100 = inner edge of the gutter (closest to
// the content column) — pushed high on the left flock and low on the right
// flock so both flocks lean in toward the concept cards.
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

// Mobile flock — scrolls WITH the page (position: absolute inside the same
// relatively-positioned wrapper as everything else) instead of being pinned
// to fixed screen coordinates, so birds are spread across the entire page
// length, not just whatever's in view at scroll position 0. Anchored to the
// left/right screen edges with a small negative offset so roughly half of
// each bird bleeds off-screen — that's what lets them sit this close to the
// edge without ever overlapping the card column, no matter how many there are.
const MOBILE_FLOCK = [
  { top: 1, side: 'left' as const, size: 44, rotate: -10, opacity: 0.38, flip: false, logo: '/logo_blush.svg' },
  { top: 9, side: 'right' as const, size: 38, rotate: 12, opacity: 0.34, flip: true, logo: '/logo_mint.svg' },
  { top: 19, side: 'left' as const, size: 40, rotate: 8, opacity: 0.36, flip: true, logo: '/logo_lavender.svg' },
  { top: 29, side: 'right' as const, size: 46, rotate: -14, opacity: 0.4, flip: false, logo: '/logo_peach.svg' },
  { top: 40, side: 'left' as const, size: 36, rotate: 15, opacity: 0.32, flip: false, logo: '/logo_sky.svg' },
  { top: 51, side: 'right' as const, size: 42, rotate: -8, opacity: 0.38, flip: true, logo: '/logo_teal.svg' },
  { top: 62, side: 'left' as const, size: 44, rotate: 10, opacity: 0.36, flip: true, logo: '/logo_coral.svg' },
  { top: 73, side: 'right' as const, size: 38, rotate: -12, opacity: 0.34, flip: false, logo: '/logo_periwinkle.svg' },
  { top: 84, side: 'left' as const, size: 40, rotate: 6, opacity: 0.38, flip: false, logo: '/logo_sand.svg' },
  { top: 95, side: 'right' as const, size: 46, rotate: -10, opacity: 0.4, flip: true, logo: '/logo_butter.svg' },
]

function MobileFlock() {
  return (
    <div className="mobile-decor" aria-hidden="true">
      {MOBILE_FLOCK.map((b, i) => (
        <img
          key={i}
          src={b.logo}
          alt=""
          style={{
            position: 'absolute',
            top: `${b.top}%`,
            left: b.side === 'left' ? '-14px' : undefined,
            right: b.side === 'right' ? '-14px' : undefined,
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
    <div style={{ position: 'relative' }}>
      <style>{`
        .sections-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (max-width: 768px) {
          .sections-grid {
            grid-template-columns: 1fr;
          }
          main {
            padding: 48px 16px;
          }
        }

        /* Scattered flock of small hummingbirds — pinned to the empty
           gutters beside the 1000px content column, starting right at the
           navbar edge (top: 64px = 0% of this strip) and leaning inward
           toward the cards. Only appears where there's actually room. */
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

        /* Mobile corner flock — absolute (scrolls with the page), spans the
           full height of this wrapper, hidden everywhere except small screens. */
        .mobile-decor {
          display: none;
        }
        @media (max-width: 768px) {
          .mobile-decor {
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
      <MobileFlock />

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 24px', position: 'relative', zIndex: 1 }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
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
            margin: '0 auto',
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