// This file defines the page component for a specific section of concepts.
// It uses Next.js's dynamic routing to generate pages for each section based on the section ID.
// The page displays the section's title and description, as well as a grid of ConceptCard components for each concept in the section.
// The concepts are retrieved using the getConceptsBySection function from the concepts library, which reads the concepts data from the filesystem.
// The generateStaticParams function is used to generate the static paths for each section page at build time, ensuring that all section pages are pre-rendered and available for fast loading.
// path : app/[section]/page.tsx

import { getConceptsBySection, getAllSections } from '@/lib/concepts'
import ConceptCard from '@/components/ConceptCard'

export async function generateStaticParams() {
  const sections = getAllSections()
  return sections.map(s => ({ section: s.id }))
}

export default function SectionPage({ params }: { params: { section: string } }) {
  const concepts = getConceptsBySection(params.section)
  const sections = getAllSections()
  const section = sections.find(s => s.id === params.section)

  if (!section) return <div>Section not found</div>

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ marginBottom: '48px' }}>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: '#111827',
            marginBottom: '12px',
          }}
        >
          {section.title}
        </h1>
        <p style={{ fontSize: '1rem', color: '#6B7280', maxWidth: '560px' }}>
          {section.description}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        {concepts.map(concept => (
          <ConceptCard key={concept.id} concept={concept} />
        ))}
      </div>
    </main>
  )
}