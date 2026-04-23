"use client"

// path: components/SectionCard.tsx

import Link from 'next/link'
import { Section } from '@/types/concept'
import { colorMap } from '@/lib/colors'
import {
  BookOpen,
  BarChart2,
  TrendingUp,
  FlaskConical,
  Brain,
  Zap,
  Database,
  Warehouse,
  SearchCode,
  CloudLightning,
} from 'lucide-react'

const sectionIcons: Record<string, React.ReactNode> = {
  intro:                <BookOpen size={24} strokeWidth={1.8} />,
  dav:                  <BarChart2 size={24} strokeWidth={1.8} />,
  statistics:           <TrendingUp size={24} strokeWidth={1.8} />,
  'advanced-statistics':<FlaskConical size={24} strokeWidth={1.8} />,
  'machine-learning':   <Brain size={24} strokeWidth={1.8} />,
  'advanced-ml':        <Zap size={24} strokeWidth={1.8} />,
  dbms:                 <Database size={24} strokeWidth={1.8} />,
  'data-warehousing':   <Warehouse size={24} strokeWidth={1.8} />,
  'data-mining':        <SearchCode size={24} strokeWidth={1.8} />,
  'big-data':           <CloudLightning size={24} strokeWidth={1.8} />,
}

export default function SectionCard({ section }: { section: Section }) {
  const color = colorMap[section.color]
  const icon = sectionIcons[section.id]
  const isEmpty = section.conceptCount === 0

  return (
    <Link href={`/${section.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        className="section-card"
        style={{
          backgroundColor: '#FFFFFF',
          border: `1.5px solid ${color.border}`,
          borderRadius: '16px',
          padding: '20px 24px',
          cursor: isEmpty ? 'default' : 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          opacity: isEmpty ? 0.5 : 1,
          pointerEvents: isEmpty ? 'none' : 'auto',
        }}
        onMouseEnter={e => {
          if (isEmpty) return
          const el = e.currentTarget as HTMLDivElement
          el.style.transform = 'translateY(-3px)'
          el.style.boxShadow = `0 8px 24px ${color.border}66`
          el.style.borderColor = color.text
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.transform = 'translateY(0)'
          el.style.boxShadow = 'none'
          el.style.borderColor = color.border
        }}
      >
        {/* Icon */}
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          backgroundColor: color.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color.text,
          flexShrink: 0,
        }}>
          {icon}
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontFamily: 'var(--font-nunito), sans-serif',
            color: '#3A3A3A',
            fontSize: '1.1rem',
            fontWeight: 700,
            marginBottom: '4px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {section.title}
          </h3>
          <p style={{
            color: '#888888',
            fontSize: '0.875rem',
            lineHeight: '1.4',
            margin: 0,
          }}>
            {section.description}
          </p>
        </div>

        {/* Concept count badge */}
        <div style={{
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '56px',
          height: '56px',
          borderRadius: '12px',
          backgroundColor: color.bg,
          border: `1px solid ${color.border}`,
        }}>
          <span style={{
            fontFamily: 'var(--font-nunito), sans-serif',
            fontSize: '1.25rem',
            fontWeight: 800,
            color: color.text,
            lineHeight: 1,
          }}>
            {section.conceptCount}
          </span>
          <span style={{
            fontSize: '0.6rem',
            fontWeight: 700,
            color: color.text,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            opacity: 0.7,
            marginTop: '2px',
          }}>
            {/* {section.conceptCount === 1 ? 'concept' : 'concepts'} */}
          </span>
        </div>
      </div>
    </Link>
  )
}