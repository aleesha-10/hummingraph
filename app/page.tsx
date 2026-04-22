// path: app/page.tsx
// This is the main page of the application, which serves as the entry point for users. 
// It displays a list of sections, each represented by a SectionCard component. 
// The sections are retrieved using the getVisibleSections function from the concepts library, which filters out any sections that are not meant to be displayed on the homepage. 
// The page also includes a header with the application's name and a brief description.

import { getVisibleSections } from '@/lib/concepts'
import SectionCard from '@/components/SectionCard'

export default function HomePage() {
  const sections = getVisibleSections()

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ marginBottom: '48px' }}>
        <h1
          style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            color: '#111827',
            marginBottom: '12px',
          }}
        >
          Hummingraph
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#6B7280', maxWidth: '560px' }}>
          A structured reference for data science concepts — from statistics to machine learning.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        {sections.map(section => (
          <SectionCard key={section.id} section={section} />
        ))}
      </div>
    </main>
  )
}