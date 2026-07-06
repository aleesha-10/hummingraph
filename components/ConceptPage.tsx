"use client"

import { Concept } from '@/types/concept'
import { colorMap, conceptPageBlocks } from '@/lib/colors'
import Link from 'next/link'
import DifficultyBadge from '@/components/ui/DifficultyBadge'
import Formula from '@/components/ui/Formula'
import InlineText from './InlineText'
import FeedbackWidget from './FeedbackWidget'

export default function ConceptPage({ concept }: { concept: Concept }) {
  // colorMap still used for related concept pills (matches the card color)
  const color = colorMap[concept.color]
  const b = conceptPageBlocks

  const textStyle = { color: '#4A4A4A', fontSize: '1rem', lineHeight: '1.75' }
  const headingStyle = { color: '#5D5C61', fontWeight: 700, fontSize: '0.95rem' }

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: '48px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
          <DifficultyBadge difficulty={concept.difficulty} />
          <Link
            href={`/${concept.section}`}
            style={{
              color: '#9CA3AF',
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              textDecoration: 'none',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#5D5C61')}
            onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}
          >
            {concept.section}
          </Link>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-nunito), sans-serif',
          fontSize: '2.75rem',
          fontWeight: 800,
          color: '#5D5C61',
          marginBottom: '12px',
          lineHeight: '1.1'
        }}>
          {concept.title}
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#7A7A7A', fontStyle: 'italic' }}>{concept.tagline}</p>
      </div>

      {/* Key Points — blue */}
      <Section bg={b.keyPoints.bg} border={b.keyPoints.border}>
        <SectionTitle color={b.keyPoints.text}>Key Points</SectionTitle>
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          {concept.key_points.map((point, i) => (
            <li key={i} style={{ ...textStyle, marginBottom: '8px' }}>{point}</li>
          ))}
        </ul>
      </Section>

      {/* What it is — purple */}
      <Section bg={b.whatItIs.bg} border={b.whatItIs.border}>
        <SectionTitle color={b.whatItIs.text}>What it is</SectionTitle>
        <p style={textStyle}>{concept.what_it_is}</p>
      </Section>

      {/* Why it exists — yellow */}
      {concept.why_it_exists && (
        <Section bg={b.whyItExists.bg} border={b.whyItExists.border}>
          <SectionTitle color={b.whyItExists.text}>Why it exists</SectionTitle>
          <p style={textStyle}>{concept.why_it_exists}</p>
        </Section>
      )}

      {/* What it measures — teal */}
      {concept.what_it_measures && (
        <Section bg={b.whatItMeasures.bg} border={b.whatItMeasures.border}>
          <SectionTitle color={b.whatItMeasures.text}>What it measures</SectionTitle>
          <p style={textStyle}>{concept.what_it_measures}</p>
        </Section>
      )}

      {/* Intuition — orange */}
      {concept.intuition && (
        <Section bg={b.intuition.bg} border={b.intuition.border}>
          <SectionTitle color={b.intuition.text}>Intuition</SectionTitle>
          <InlineText text={concept.intuition} style={textStyle} />

        </Section>
      )}

      {/* Example — rose */}
      {concept.example && (
        <Section bg={b.example.bg} border={b.example.border}>
          <SectionTitle color={b.example.text}>Example</SectionTitle>
          <p style={{ ...textStyle, marginBottom: '12px', fontWeight: 500 }}>
            {concept.example.text}
          </p>
          {concept.example.interpretation && (
            <p style={{ color: '#7A7A7A', fontSize: '0.95rem', fontStyle: 'italic', borderLeft: `3px solid ${b.example.border}`, paddingLeft: '12px' }}>
              {concept.example.interpretation}
            </p>
          )}
        </Section>
      )}

      {/* Steps — blue */}
      {concept.steps && concept.steps.length > 0 && (
        <Section bg={b.steps.bg} border={b.steps.border}>
          <SectionTitle color={b.steps.text}>How it works</SectionTitle>
          <ol style={{ paddingLeft: '20px', margin: 0 }}>
            {concept.steps.map(step => (
              <li key={step.step} style={{ marginBottom: '16px' }}>
                <span style={{ ...headingStyle, fontSize: '1rem', display: 'block' }}>{step.title}</span>
                <p style={{ ...textStyle, fontSize: '0.95rem', margin: '4px 0 0 0' }}>{step.description}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* Formulas — white/clean */}
      {concept.formulas && concept.formulas.length > 0 && (
        <Section bg={b.formulas.bg} border={b.formulas.border}>
          <SectionTitle color={b.formulas.text}>Formulas</SectionTitle>
          {concept.formulas.map((formula, i) => (
            <div key={i} style={{ marginBottom: i < concept.formulas!.length - 1 ? '32px' : 0 }}>
              <p style={{ ...headingStyle, marginBottom: '12px' }}>{formula.label}</p>
              <div style={{
                backgroundColor: '#F3F4F6',
                padding: '24px 20px',
                borderRadius: '12px',
                marginBottom: '16px',
                fontSize: '1.1rem',
                color: '#111827',
                overflowX: 'auto',
                display: 'flex',
                justifyContent: 'center',
              }}>
                <Formula expression={formula.expression} />
              </div>
              <ul style={{ paddingLeft: '20px', margin: 0 }}>
                {formula.breakdown.map((item, j) => (
                  <li key={j} style={{ fontSize: '0.95rem', color: '#555', lineHeight: '1.6', marginBottom: '4px' }}>
                    <code style={{ fontWeight: 700, color: b.formulas.text, background: 'none', padding: 0 }}>{item.symbol}</code> — {item.means}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {/* When to use — green */}
      {concept.when_to_use && concept.when_to_use.length > 0 && (
        <Section bg={b.whenToUse.bg} border={b.whenToUse.border}>
          <SectionTitle color={b.whenToUse.text}>When to use</SectionTitle>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {concept.when_to_use.map((item, i) => (
              <li key={i} style={textStyle}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* When not to use — amber */}
      {concept.when_not_to_use && concept.when_not_to_use.length > 0 && (
        <Section bg={b.whenNotToUse.bg} border={b.whenNotToUse.border}>
          <SectionTitle color={b.whenNotToUse.text}>When not to use</SectionTitle>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {concept.when_not_to_use.map((item, i) => (
              <li key={i} style={textStyle}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Common mistakes — red */}
      {concept.common_mistakes && concept.common_mistakes.length > 0 && (
        <Section bg={b.commonMistakes.bg} border={b.commonMistakes.border}>
          <SectionTitle color={b.commonMistakes.text}>Common mistakes</SectionTitle>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {concept.common_mistakes.map((item, i) => (
              <li key={i} style={textStyle}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Notes — slate */}
      {concept.notes && concept.notes.length > 0 && (
        <Section bg={b.notes.bg} border={b.notes.border}>
          <SectionTitle color={b.notes.text}>Notes</SectionTitle>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {concept.notes.map((note, i) => (
              <li key={i} style={textStyle}>{note}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* In practice — teal */}
      {concept.ds_usage && (
        <Section bg={b.dsUsage.bg} border={b.dsUsage.border}>
          <SectionTitle color={b.dsUsage.text}>In practice</SectionTitle>
          <p style={textStyle}>{concept.ds_usage}</p>
        </Section>
      )}

      <FeedbackWidget concept={concept} />

      {/* Related concepts */}
      {concept.related_concepts && concept.related_concepts.length > 0 && (
        <div style={{ marginTop: '48px' }}>
          <p style={{ fontFamily: 'var(--font-nunito)', fontSize: '1.25rem', color: '#5D5C61', marginBottom: '16px' }}>
            Related concepts
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {concept.related_concepts.map(id => (
              <span
                key={id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: `1px solid ${color.border}`,
                  color: color.text,
                  padding: '8px 20px',
                  borderRadius: '50px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  boxShadow: '0 2px 5px rgba(0,0,0,0.03)',
                  fontFamily: 'var(--font-nunito)'
                }}
              >
                {id}
              </span>
            ))}
          </div>
        </div>
      )}

    </main>
  )
}

function Section({ bg, border, children }: { bg: string; border: string; children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: bg,
      border: `1px solid ${border}`,
      borderRadius: '20px',
      padding: '32px',
      marginBottom: '24px',
    }}>
      {children}
    </div>
  )
}

function SectionTitle({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: 'var(--font-nunito), sans-serif',
      fontWeight: 800,
      color,
      fontSize: '1rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '16px'
    }}>
      {children}
    </p>
  )
}