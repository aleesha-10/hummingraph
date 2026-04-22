// path: components/ConceptCard.tsx
// This component renders a card for a concept, which includes the concept's title, tagline, and difficulty level.
// The card's background color, border color, and text color are determined by the concept's assigned color, which is defined in the colorMap.
// The card also has a hover effect that slightly lifts the card and adds a shadow to indicate interactivity.
// When clicked, the card navigates to the concept's page using Next.js's Link component.
// e.g links to mean section page when clicked on mean concept card


import Link from 'next/link'
import { Concept } from '@/types/concept'
import { colorMap } from '@/lib/colors'
import DifficultyBadge from '@/components/ui/DifficultyBadge'

export default function ConceptCard({ concept }: { concept: Concept }) {
  const color = colorMap[concept.color]

  return (
    <Link href={`/${concept.section}/${concept.id}`}>
      <div
        style={{
          backgroundColor: color.bg,
          border: `1.5px solid ${color.border}`,
          borderRadius: '12px',
          padding: '20px 24px',
          cursor: 'pointer',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '8px',
          }}
        >
          <h3
            style={{
              color: color.text,
              fontSize: '1rem',
              fontWeight: 700,
            }}
          >
            {concept.title}
          </h3>
          <DifficultyBadge difficulty={concept.difficulty} />
        </div>
        <p
          style={{
            color: '#6B7280',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
        >
          {concept.tagline}
        </p>
      </div>
    </Link>
  )
}