// This component renders a badge that indicates the difficulty level of a concept.
// The badge's background color, text color, and label are determined by the difficulty level (beginner, intermediate, advanced).
// The styles for each difficulty level are defined in the 'styles' object, which maps each difficulty to its corresponding colors and label.
// The component takes a 'difficulty' prop and uses it to look up the appropriate styles and render the badge accordingly.
// path : components/ui/DifficultyBadge.tsx

import { Difficulty } from '@/types/concept'

const styles: Record<Difficulty, { bg: string; text: string; label: string }> = {
  beginner: {
    bg: '#F0FDF4',
    text: '#166534',
    label: 'Beginner',
  },
  intermediate: {
    bg: '#FEFCE8',
    text: '#854D0E',
    label: 'Intermediate',
  },
  advanced: {
    bg: '#FAF5FF',
    text: '#6B21A8',
    label: 'Advanced',
  },
}

export default function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const style = styles[difficulty]
  return (
    <span
      style={{
        backgroundColor: style.bg,
        color: style.text,
        padding: '2px 10px',
        borderRadius: '999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.02em',
      }}
    >
      {style.label}
    </span>
  )
}