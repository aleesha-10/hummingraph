// path: lib/colors.ts
// colorMap is used by SectionCard and ConceptCard for their accent colors.
// conceptPageBlocks defines the fixed per-block colors used inside ConceptPage —
// each section type always gets the same color regardless of which concept it is.

export const colorMap = {
  blue: {
    bg: '#EBF5FB',
    border: '#D6EAF8',
    text: '#2874A6',
  },
  green: {
    bg: '#E9F7EF',
    border: '#D4EFDF',
    text: '#1E8449',
  },
  purple: {
    bg: '#F4ECF7',
    border: '#E8DAEF',
    text: '#7D3C98',
  },
  yellow: {
    bg: '#FEF9E7',
    border: '#FCF3CF',
    text: '#B7950B',
  },
  gray: {
    bg: '#F8F9F9',
    border: '#EAEDED',
    text: '#566573',
  },
  teal: {
    bg: '#E8F8F5',
    border: '#A3E4D7',
    text: '#0E6655',
  },
  rose: {
    bg: '#FDF2F8',
    border: '#F5B7D1',
    text: '#922B5E',
  },
  orange: {
    bg: '#FEF5EC',
    border: '#FAD7A0',
    text: '#A04000',
  },
  slate: {
    bg: '#F0F3F4',
    border: '#D5D8DC',
    text: '#2C3E50',
  },
}

export type ColorKey = keyof typeof colorMap

// Fixed colors per block type on the concept page.
// Every concept page uses this same rhythm — the reader starts
// associating colors with meaning rather than with a section.
export const conceptPageBlocks = {
  keyPoints:      { bg: '#EBF5FB', border: '#D6EAF8', text: '#2874A6' },  // blue     — sets the tone
  whatItIs:       { bg: '#F4ECF7', border: '#E8DAEF', text: '#7D3C98' },  // purple   — definition
  whyItExists:    { bg: '#FEF9E7', border: '#FCF3CF', text: '#B7950B' },  // yellow   — motivation
  whatItMeasures: { bg: '#E8F8F5', border: '#226558', text: '#0E6655' },  // teal     — output meaning
  intuition:      { bg: '#FEF5EC', border: '#FAD7A0', text: '#A04000' },  // orange   — lightbulb
  example:        { bg: '#FDF2F8', border: '#F5B7D1', text: '#922B5E' },  // rose     — concrete numbers
  steps:          { bg: '#EBF5FB', border: '#D6EAF8', text: '#2874A6' },  // blue     — process
  formulas:       { bg: '#FFFFFF', border: '#E5E7EB', text: '#374151' },  // white    — clean math
  whenToUse:      { bg: '#E9F7EF', border: '#D4EFDF', text: '#1E8449' },  // green    — go ahead
  whenNotToUse:   { bg: '#FEF9E7', border: '#FDEBD0', text: '#784212' },  // amber    — caution
  commonMistakes: { bg: '#FDEDEC', border: '#F5B7B1', text: '#922B21' },  // red      — warning
  notes:          { bg: '#F0F3F4', border: '#D5D8DC', text: '#2C3E50' },  // slate    — neutral caveat
  dsUsage:        { bg: '#E8F8F5', border: '#A3E4D7', text: '#0E6655' },  // turquoise — real world
}