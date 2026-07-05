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
const LEFT_FLOCK = [
  { top: 8, left: 60, size: 80, rotate: -12, opacity: 0.55, flip: false },
  { top: 20, left: 20, size: 72, rotate: 8, opacity: 0.4, flip: true },
  { top: 33, left: 70, size: 86, rotate: -6, opacity: 0.6, flip: false },
  { top: 46, left: 15, size: 70, rotate: 15, opacity: 0.35, flip: true },
  { top: 58, left: 55, size: 78, rotate: -18, opacity: 0.5, flip: false },
  { top: 70, left: 25, size: 74, rotate: 10, opacity: 0.4, flip: true },
  { top: 82, left: 65, size: 92, rotate: -8, opacity: 0.55, flip: false },
  { top: 93, left: 30, size: 70, rotate: 5, opacity: 0.35, flip: true },
]

const RIGHT_FLOCK = [
  { top: 5, left: 30, size: 77, rotate: 10, opacity: 0.4, flip: true },
  { top: 17, left: 65, size: 84, rotate: -10, opacity: 0.58, flip: false },
  { top: 30, left: 20, size: 70, rotate: 14, opacity: 0.35, flip: true },
  { top: 43, left: 60, size: 80, rotate: -14, opacity: 0.55, flip: false },
  { top: 55, left: 25, size: 74, rotate: 8, opacity: 0.42, flip: true },
  { top: 67, left: 70, size: 86, rotate: -6, opacity: 0.6, flip: false },
  { top: 79, left: 18, size: 71, rotate: 12, opacity: 0.38, flip: true },
  { top: 90, left: 58, size: 88, rotate: -16, opacity: 0.5, flip: false },
]

function Flock({ birds, side }: { birds: typeof LEFT_FLOCK; side: 'left' | 'right' }) {
  return (
    <div className={`home-decor home-decor-${side}`} aria-hidden="true">
      {birds.map((b, i) => (
        <img
          key={i}
          src="/logo2.svg"
          alt=""
          style={{
            position: 'absolute',
            top: `${b.top}%`,
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            opacity: b.opacity,
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
    <>
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
           gutters beside the 1000px content column. Only appears where
           there's actually room for it without ever touching the cards. */
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
      `}</style>

      <Flock birds={LEFT_FLOCK} side="left" />
      <Flock birds={RIGHT_FLOCK} side="right" />

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 24px', position: 'relative', zIndex: 1 }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ marginBottom: '24px', height: '96px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src="/logo2.svg" alt="Hummingraph logo" width={96} height={96} />
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
    </>
  )
}