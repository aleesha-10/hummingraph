"use client"

import Link from 'next/link'
import { Concept } from '@/types/concept'
import DifficultyBadge from '@/components/ui/DifficultyBadge'

const difficultyStyle = {
  beginner: {
    border: '#ffccaa',      // peach/orange
    text: '#C2581A',        // deep orange title
    accentBg: '#FFF7F3',    // very faint warm white
  },
  intermediate: {
    border: '#e8b642',      // mustard/amber
    text: '#A67C00',        // deep mustard title
    accentBg: '#FFFDF3',    // very faint warm white
  },
  advanced: {
    border: '#D4756B',      // terracotta/rose
    text: '#A63C2E',        // deep terracotta title
    accentBg: '#FFF5F4',    // very faint warm white
  },
}

export default function ConceptCard({ concept }: { concept: Concept }) {
  const style = difficultyStyle[concept.difficulty] ?? difficultyStyle.beginner

  return (
    <Link href={`/${concept.section}/${concept.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        style={{
          backgroundColor: style.accentBg,
          border: '1px solid #EEEEEE',
          borderLeft: `4px solid ${style.border}`,
          borderRadius: '16px',
          padding: '24px',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.07)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <h3 style={{
            fontFamily: 'var(--font-nunito), sans-serif',
            color: style.text,
            fontSize: '1.25rem',
            fontWeight: 700,
          }}>
            {concept.title}
          </h3>
          <DifficultyBadge difficulty={concept.difficulty} />
        </div>
        <p style={{ color: '#666666', fontSize: '0.95rem', lineHeight: '1.6' }}>
          {concept.tagline}
        </p>
      </div>
    </Link>
  )
}