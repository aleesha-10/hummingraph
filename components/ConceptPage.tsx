// Path : components/ConceptPage.tsx
// This component renders the page for a specific concept, displaying detailed information about the concept such as its key points, what it is, why it exists, intuition, examples, formulas, when to use it, common mistakes, and related concepts.
// The page is styled using inline styles, with colors determined by the concept's assigned color from the colorMap.
// The component also includes helper components for rendering sections and section titles to maintain consistent styling across different sections of the concept page.

import { Concept } from '@/types/concept'
import { colorMap } from '@/lib/colors'
import DifficultyBadge from '@/components/ui/DifficultyBadge'

export default function ConceptPage({ concept }: { concept: Concept }) {
  const color = colorMap[concept.color]

  return (
    <main style={{ maxWidth: '780px', margin: '0 auto', padding: '60px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <DifficultyBadge difficulty={concept.difficulty} />
          <span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>{concept.section}</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', marginBottom: '10px' }}>
          {concept.title}
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#6B7280' }}>{concept.tagline}</p>
      </div>

      {/* Key Points */}
      <Section bg={color.bg} border={color.border}>
        <SectionTitle color={color.text}>Key Points</SectionTitle>
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          {concept.key_points.map((point, i) => (
            <li key={i} style={{ color: '#374151', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '4px' }}>
              {point}
            </li>
          ))}
        </ul>
      </Section>

      {/* What it is */}
      <Section bg={color.bg} border={color.border}>
        <SectionTitle color={color.text}>What it is</SectionTitle>
        <p style={{ color: '#374151', fontSize: '0.95rem', lineHeight: '1.7' }}>{concept.what_it_is}</p>
      </Section>

      {/* Why it exists */}
      {concept.why_it_exists && (
        <Section bg={color.bg} border={color.border}>
          <SectionTitle color={color.text}>Why it exists</SectionTitle>
          <p style={{ color: '#374151', fontSize: '0.95rem', lineHeight: '1.7' }}>{concept.why_it_exists}</p>
        </Section>
      )}

      {/* What it measures */}
      {concept.what_it_measures && (
        <Section bg={color.bg} border={color.border}>
          <SectionTitle color={color.text}>What it measures</SectionTitle>
          <p style={{ color: '#374151', fontSize: '0.95rem', lineHeight: '1.7' }}>{concept.what_it_measures}</p>
        </Section>
      )}

      {/* Intuition */}
      {concept.intuition && (
        <Section bg={color.bg} border={color.border}>
          <SectionTitle color={color.text}>Intuition</SectionTitle>
          <p style={{ color: '#374151', fontSize: '0.95rem', lineHeight: '1.7' }}>{concept.intuition}</p>
        </Section>
      )}

      {/* Example */}
      {concept.example && (
        <Section bg={color.bg} border={color.border}>
          <SectionTitle color={color.text}>Example</SectionTitle>
          <p style={{ color: '#374151', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '8px' }}>
            {concept.example.text}
          </p>
          {concept.example.interpretation && (
            <p style={{ color: '#6B7280', fontSize: '0.875rem', fontStyle: 'italic' }}>
              {concept.example.interpretation}
            </p>
          )}
        </Section>
      )}

      {/* Steps */}
      {concept.steps && concept.steps.length > 0 && (
        <Section bg={color.bg} border={color.border}>
          <SectionTitle color={color.text}>How it works</SectionTitle>
          <ol style={{ paddingLeft: '20px', margin: 0 }}>
            {concept.steps.map(step => (
              <li key={step.step} style={{ marginBottom: '12px' }}>
                <span style={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem' }}>{step.title}</span>
                <p style={{ color: '#374151', fontSize: '0.9rem', lineHeight: '1.6', margin: '2px 0 0 0' }}>
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* Formulas */}
      {concept.formulas && concept.formulas.length > 0 && (
        <Section bg={color.bg} border={color.border}>
          <SectionTitle color={color.text}>Formulas</SectionTitle>
          {concept.formulas.map((formula, i) => (
            <div key={i} style={{ marginBottom: i < concept.formulas!.length - 1 ? '24px' : 0 }}>
              <p style={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem', marginBottom: '8px' }}>
                {formula.label}
              </p>
              <code style={{
                display: 'block',
                backgroundColor: '#F3F4F6',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                marginBottom: '12px',
                color: '#111827',
              }}>
                {formula.expression}
              </code>
              <ul style={{ paddingLeft: '20px', margin: 0 }}>
                {formula.breakdown.map((item, j) => (
                  <li key={j} style={{ fontSize: '0.875rem', color: '#374151', lineHeight: '1.6' }}>
                    <code style={{ fontWeight: 600, color: color.text }}>{item.symbol}</code> — {item.means}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {/* When to use */}
      {concept.when_to_use && concept.when_to_use.length > 0 && (
        <Section bg='#F0FDF4' border='#BBF7D0'>
          <SectionTitle color='#166534'>When to use</SectionTitle>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {concept.when_to_use.map((item, i) => (
              <li key={i} style={{ color: '#374151', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '4px' }}>
                {item}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* When not to use */}
      {concept.when_not_to_use && concept.when_not_to_use.length > 0 && (
        <Section bg='#FEFCE8' border='#FDE68A'>
          <SectionTitle color='#854D0E'>When not to use</SectionTitle>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {concept.when_not_to_use.map((item, i) => (
              <li key={i} style={{ color: '#374151', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '4px' }}>
                {item}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Common mistakes */}
      {concept.common_mistakes && concept.common_mistakes.length > 0 && (
        <Section bg='#FEFCE8' border='#FDE68A'>
          <SectionTitle color='#854D0E'>Common mistakes</SectionTitle>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {concept.common_mistakes.map((item, i) => (
              <li key={i} style={{ color: '#374151', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '4px' }}>
                {item}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Notes */}
      {concept.notes && concept.notes.length > 0 && (
        <Section bg={color.bg} border={color.border}>
          <SectionTitle color={color.text}>Notes</SectionTitle>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {concept.notes.map((note, i) => (
              <li key={i} style={{ color: '#374151', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '4px' }}>
                {note}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* DS Usage */}
      {concept.ds_usage && (
        <Section bg={color.bg} border={color.border}>
          <SectionTitle color={color.text}>In practice</SectionTitle>
          <p style={{ color: '#374151', fontSize: '0.95rem', lineHeight: '1.7' }}>{concept.ds_usage}</p>
        </Section>
      )}

      {/* Related concepts */}
      {concept.related_concepts && concept.related_concepts.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <p style={{ fontWeight: 700, color: '#111827', marginBottom: '12px' }}>Related concepts</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {concept.related_concepts.map(id => (
              <span
                key={id}
                style={{
                  backgroundColor: color.bg,
                  border: `1px solid ${color.border}`,
                  color: color.text,
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                  fontWeight: 500,
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

// helpers
function Section({ bg, border, children }: { bg: string; border: string; children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: bg,
      border: `1px solid ${border}`,
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '20px',
    }}>
      {children}
    </div>
  )
}

function SectionTitle({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <p style={{ fontWeight: 700, color, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
      {children}
    </p>
  )
}