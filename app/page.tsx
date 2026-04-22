// path: app/page.tsx
// path : app/page.tsx

import { getVisibleSections } from '@/lib/concepts'
import SectionCard from '@/components/SectionCard'
import { SectionId } from '@/types/concept'

export default function HomePage() {
  const sections = getVisibleSections()

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-nunito), sans-serif',
            fontSize: '3.5rem',
            fontWeight: 800,
            color: '#5D5C61', // Soft charcoal
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}
        >
          Hummingraph
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#7A7A7A', 
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          A Hummingbird's map for Data Science 
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '32px',
        }}
      >
        {sections.map(section => (
          <SectionCard key={section.id} section={{ ...section, id: section.id as SectionId }} />
        ))}
      </div>
    </main>
  )
}