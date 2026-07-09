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
    <>
      {/* Sizing lives in a real CSS class (not inline styles) specifically
          so the mobile media query below can actually override it — inline
          styles always beat stylesheet rules regardless of media query. */}
      <style>{`
        .section-card {
          padding: 20px 24px;
          gap: 20px;
        }
        .section-card-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
        }
        .section-card-badge {
          width: 56px;
          height: 56px;
        }
        .section-card-title {
          font-size: 1.1rem;
        }
        .section-card-desc {
          font-size: 0.875rem;
        }
        .section-card-count {
          font-size: 1.25rem;
        }

        @media (max-width: 768px) {
          .section-card {
            padding: 12px 14px;
            gap: 12px;
            border-radius: 12px !important;
          }
          .section-card-icon {
            width: 36px;
            height: 36px;
            border-radius: 9px;
          }
          .section-card-icon svg {
            width: 18px;
            height: 18px;
          }
          .section-card-badge {
            width: 42px;
            height: 42px;
            border-radius: 9px;
          }
          .section-card-title {
            font-size: 0.92rem;
          }
          .section-card-desc {
            font-size: 0.75rem;
          }
          .section-card-count {
            font-size: 1rem;
          }
        }
      `}</style>

      <Link href={`/${section.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div
          className="section-card"
          style={{
            backgroundColor: '#FFFFFF',
            border: `1.5px solid ${color.border}`,
            borderRadius: '16px',
            cursor: isEmpty ? 'default' : 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
            display: 'flex',
            alignItems: 'center',
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
          <div
            className="section-card-icon"
            style={{
              backgroundColor: color.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: color.text,
              flexShrink: 0,
            }}
          >
            {icon}
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3
              className="section-card-title"
              style={{
                fontFamily: 'var(--font-nunito), sans-serif',
                color: '#3A3A3A',
                fontWeight: 700,
                marginBottom: '4px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {section.title}
            </h3>
            <p
              className="section-card-desc"
              style={{
                color: '#888888',
                lineHeight: '1.4',
                margin: 0,
              }}
            >
              {section.description}
            </p>
          </div>

          {/* Concept count badge */}
          <div
            className="section-card-badge"
            style={{
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: color.bg,
              border: `1px solid ${color.border}`,
            }}
          >
            <span
              className="section-card-count"
              style={{
                fontFamily: 'var(--font-nunito), sans-serif',
                fontWeight: 800,
                color: color.text,
                lineHeight: 1,
              }}
            >
              {section.conceptCount}
            </span>
          </div>
        </div>
      </Link>
    </>
  )
}