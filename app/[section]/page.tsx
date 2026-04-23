// path: app/page.tsx

import { getVisibleSections } from '@/lib/concepts'
import SectionCard from '@/components/SectionCard'
import { SectionId } from '@/types/concept'

export default function HomePage() {
  const sections = getVisibleSections()

  return (
    <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 24px' }}>

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        {/* Logo placeholder — swap this div with your <img> when ready */}
        <div style={{ marginBottom: '24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #6EE7B7 0%, #3B82F6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
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

      {/* Section grid — 2 columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
      }}>
        {sections.map(section => (
          <SectionCard key={section.id} section={{ ...section, id: section.id as SectionId }} />
        ))}
      </div>

    </main>
  )
}