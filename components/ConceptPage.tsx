// Path : components/ConceptPage.tsx
// This component renders the page for a specific concept, displaying detailed information about the concept such as its key points, what it is, why it exists, intuition, examples, formulas, when to use it, common mistakes, and related concepts.
// The page is styled using inline styles, with colors determined by the concept's assigned color from the colorMap.
// The component also includes helper components for rendering sections and section titles to maintain consistent styling across different sections of the concept page.

// Path : components/ConceptPage.tsx
// path: components/ConceptPage.tsx

"use client" // 1. Keep this

import { Concept } from '@/types/concept'
import { colorMap } from '@/lib/colors'
import DifficultyBadge from '@/components/ui/DifficultyBadge'

// 2. Use a standard import (Remove the 'dynamic' code entirely)
import Formula from '@/components/ui/Formula'


export default function ConceptPage({ concept }: { concept: Concept }) {
  const color = colorMap[concept.color]

  // Shared text styles
  const textStyle = { color: '#4A4A4A', fontSize: '1rem', lineHeight: '1.75' }
  const headingStyle = { color: '#5D5C61', fontWeight: 700, fontSize: '0.95rem' }

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: '48px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
          <DifficultyBadge difficulty={concept.difficulty} />
          <span style={{ color: '#9CA3AF', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{concept.section}</span>
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

      {/* Key Points */}
      <Section bg={color.bg} border={color.border}>
        <SectionTitle color={color.text}>Key Points</SectionTitle>
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          {concept.key_points.map((point, i) => (
            <li key={i} style={{ ...textStyle, marginBottom: '8px' }}>
              {point}
            </li>
          ))}
        </ul>
      </Section>

      {/* What it is */}
      <Section bg={color.bg} border={color.border}>
        <SectionTitle color={color.text}>What it is</SectionTitle>
        <p style={textStyle}>{concept.what_it_is}</p>
      </Section>

      {/* Why it exists */}
      {concept.why_it_exists && (
        <Section bg={color.bg} border={color.border}>
          <SectionTitle color={color.text}>Why it exists</SectionTitle>
          <p style={textStyle}>{concept.why_it_exists}</p>
        </Section>
      )}

      {/* What it measures */}
      {concept.what_it_measures && (
        <Section bg={color.bg} border={color.border}>
          <SectionTitle color={color.text}>What it measures</SectionTitle>
          <p style={textStyle}>{concept.what_it_measures}</p>
        </Section>
      )}

      {/* Intuition */}
      {concept.intuition && (
        <Section bg={color.bg} border={color.border}>
          <SectionTitle color={color.text}>Intuition</SectionTitle>
          <p style={textStyle}>{concept.intuition}</p>
        </Section>
      )}

      {/* Example */}
      {concept.example && (
        <Section bg={color.bg} border={color.border}>
          <SectionTitle color={color.text}>Example</SectionTitle>
          <p style={{ ...textStyle, marginBottom: '12px', fontWeight: 500 }}>
            {concept.example.text}
          </p>
          {concept.example.interpretation && (
            <p style={{ color: '#7A7A7A', fontSize: '0.95rem', fontStyle: 'italic', borderLeft: '3px solid #ccc', paddingLeft: '12px' }}>
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
              <li key={step.step} style={{ marginBottom: '16px' }}>
                <span style={{ ...headingStyle, fontSize: '1rem', display: 'block' }}>{step.title}</span>
                <p style={{ ...textStyle, fontSize: '0.95rem', margin: '4px 0 0 0' }}>
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* Formulas */}
{concept.formulas && concept.formulas.length > 0 && (
  <Section bg="#FFFFFF" border="#E5E7EB">
    <SectionTitle color="#374151">Formulas</SectionTitle>
    {concept.formulas.map((formula, i) => (
      <div key={i} style={{ marginBottom: i < concept.formulas!.length - 1 ? '32px' : 0 }}>
        <p style={{ ...headingStyle, marginBottom: '12px' }}>
          {formula.label}
        </p>
        
        {/* REPLACE THE OLD <code> TAG WITH THIS NEW STYLED DIV CONTAINING FORMULA */}
        <div style={{
            backgroundColor: '#F3F4F6',
            padding: '24px 20px',
            borderRadius: '12px',
            marginBottom: '16px',
            fontSize: '1.1rem',
            color: '#111827',
            overflowX: 'auto',
            display: 'flex',
            justifyContent: 'center', // Center the math for a nicer look
        }}>
            <Formula expression={formula.expression} />
        </div>
        
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          {formula.breakdown.map((item, j) => (
            <li key={j} style={{ fontSize: '0.95rem', color: '#555', lineHeight: '1.6', marginBottom: '4px' }}>
              <code style={{ fontWeight: 700, color: color.text, background: 'none', padding: 0 }}>{item.symbol}</code> — {item.means}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </Section>
)}
      {/* When to use - Hardcoded Green Logic from original code updated for style */}
      {concept.when_to_use && concept.when_to_use.length > 0 && (
        <Section bg='#F0FDF4' border='#BBF7D0'>
          <SectionTitle color='#166534'>When to use</SectionTitle>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {concept.when_to_use.map((item, i) => (
              <li key={i} style={textStyle}>{item}</li>
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
              <li key={i} style={textStyle}>{item}</li>
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
              <li key={i} style={textStyle}>{item}</li>
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
              <li key={i} style={textStyle}>{note}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* DS Usage */}
      {concept.ds_usage && (
        <Section bg={color.bg} border={color.border}>
          <SectionTitle color={color.text}>In practice</SectionTitle>
          <p style={textStyle}>{concept.ds_usage}</p>
        </Section>
      )}

      {/* Related concepts */}
      {concept.related_concepts && concept.related_concepts.length > 0 && (
        <div style={{ marginTop: '48px' }}>
          <p style={{ fontFamily: 'var(--font-nunito)', fontSize: '1.25rem', color: '#5D5C61', marginBottom: '16px' }}>Related concepts</p>
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

// helpers
function Section({ bg, border, children }: { bg: string; border: string; children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: bg,
      border: `1px solid ${border}`,
      borderRadius: '20px', // Softer corners
      padding: '32px',      // More breathing room
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
