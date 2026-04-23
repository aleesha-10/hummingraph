// path : components/SectionCard.tsx
// This component renders a card for a section, which includes the section's title, description, and the number of concepts it contains.
// The card's background color, border color, and text color are determined by the section's assigned color, which is defined in the colorMap.
// The card also has a hover effect that slightly lifts the card and adds a shadow to indicate interactivity.
// When clicked, the card navigates to the section's page using Next.js's Link component.
// e.g links to statistics section page when clicked on statistics section card.

"use client"

import Link from 'next/link'
import { Section } from '@/types/concept'
import { colorMap } from '@/lib/colors'


export default function SectionCard({ section }: { section: Section }) {
  const color = colorMap[section.color]

  return (
    <Link href={`/${section.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        style={{
          backgroundColor: color.bg,
          border: `1px solid ${color.border}`,
          borderRadius: '24px', // Increased roundness for pastel feel
          padding: '32px',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-5px)'
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 10px 30px rgba(10, 52, 79, 0.96)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: 'var(--font-nunito), sans-serif',
              color: color.text,
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            {section.title}
          </h3>
          <p
            style={{
              color: '#555555',
              fontSize: '1rem',
              lineHeight: '1.6',
              marginBottom: '24px',
            }}
          >
            {section.description}
          </p>
        </div>
        
        <span
          style={{
            color: color.text,
            fontSize: '0.875rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            opacity: 0.8
          }}
        >
          {section.conceptCount} concepts
        </span>
      </div>
    </Link>
  )
}