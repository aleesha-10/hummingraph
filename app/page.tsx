// path: app/page.tsx

// this file defines the homepage of the Hummingraph application. 
// It displays a hero section with the app's logo and tagline, followed by a grid of SectionCard components for each visible section of concepts.
// The sections are retrieved using the getVisibleSections function from the concepts library, which filters the sections based on their visibility status.
// The page is styled to be responsive, with a 2-column grid on desktop and a single column on mobile devices.

import Image from 'next/image'

import { getVisibleSections } from '@/lib/concepts'
import SectionCard from '@/components/SectionCard'
import { SectionId } from '@/types/concept'

export default function HomePage() {
  const sections = getVisibleSections()

  return (
    <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 24px' }}>

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
      `}</style>

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
  )
}