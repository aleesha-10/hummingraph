// This component renders a badge that indicates the difficulty level of a concept.
// The badge's background color, text color, and label are determined by the difficulty level (beginner, intermediate, advanced).
// The styles for each difficulty level are defined in the 'styles' object, which maps each difficulty to its corresponding colors and label.
// The component takes a 'difficulty' prop and uses it to look up the appropriate styles and render the badge accordingly.
// path : components/ui/DifficultyBadge.tsx

// path: components/ui/DifficultyBadge.tsx

interface DifficultyBadgeProps {
  difficulty: string
}

// Pastel difficulty colors
const difficultyColors: { [key: string]: { bg: string; text: string } } = {
  beginner: {
    bg: '#E9F7EF',
    text: '#1E8449',
  },
  intermediate: {
    bg: '#FEF9E7',
    text: '#B7950B',
  },
  advanced: {
    bg: '#FADBD8',
    text: '#922B21',
  },
  default: {
    bg: '#F4F6F7',
    text: '#566573',
  }
}

export default function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const level = difficulty.toLowerCase()
  const theme = difficultyColors[level] || difficultyColors.default

  return (
    <span
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
        fontSize: '0.75rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        padding: '4px 12px',
        borderRadius: '50px', // Pill shape
        border: '1px solid rgba(0,0,0,0.05)',
        fontFamily: 'var(--font-nunito), sans-serif',
      }}
    >
      {difficulty}
    </span>
  )
}