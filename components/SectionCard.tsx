// path : components/SectionCard.tsx
// This component renders a card for a section, which includes the section's title, description, and the number of concepts it contains.
// The card's background color, border color, and text color are determined by the section's assigned color, which is defined in the colorMap.
// The card also has a hover effect that slightly lifts the card and adds a shadow to indicate interactivity.
// When clicked, the card navigates to the section's page using Next.js's Link component.

import Link from 'next/link'
import { Section } from '@/types/concept'
import { colorMap } from '@/lib/colors'

export default function SectionCard({ section }: { section: Section }) {
  const color = colorMap[section.color]

  return (
    <Link href={`/${section.id}`}>
      <div
        style={{
          backgroundColor: color.bg,
          border: `1.5px solid ${color.border}`,
          borderRadius: '12px',
          padding: '24px',
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
        <h3
          style={{
            color: color.text,
            fontSize: '1.1rem',
            fontWeight: 700,
            marginBottom: '8px',
          }}
        >
          {section.title}
        </h3>
        <p
          style={{
            color: '#6B7280',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            marginBottom: '16px',
          }}
        >
          {section.description}
        </p>
        <span
          style={{
            color: color.text,
            fontSize: '0.8rem',
            fontWeight: 600,
          }}
        >
          {section.conceptCount} concepts
        </span>
      </div>
    </Link>
  )
}