// components/InlineText.tsx
// Renders a string that may contain {{viz:some-id}} placeholders.
// Each placeholder is replaced with a live VisualizationBlock.
//
// Usage:
//   <InlineText text={concept.intuition} />
//   <InlineText text={concept.what_it_is} />
//
// In your concept JSON, add placeholders wherever a chart should appear:
//   "intuition": "A box plot is like a race result summary... {{viz:boxplot-with-outliers}} Notice how outliers appear as dots beyond the whiskers."

import VisualizationBlock from "./VisualizationBlock";

interface InlineTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

// Matches {{viz:some-id-here}}
const VIZ_PLACEHOLDER = /\{\{viz:([\w-]+)\}\}/g;

export default function InlineText({ text, className, style }: InlineTextProps) {
  // Split the text into an array of strings and viz IDs
  const parts: Array<{ type: "text"; value: string } | { type: "viz"; id: string }> = [];

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  // Reset regex state
  VIZ_PLACEHOLDER.lastIndex = 0;

  while ((match = VIZ_PLACEHOLDER.exec(text)) !== null) {
    // Text before this match
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    // The viz placeholder
    parts.push({ type: "viz", id: match[1] });
    lastIndex = match.index + match[0].length;
  }

  // Remaining text after the last match
  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) });
  }

  return (
    <div className={className} style={style}>
      {parts.map((part, i) =>
        part.type === "text" ? (
          <span key={i} style={{ whiteSpace: "pre-wrap" }}>
            {part.value}
          </span>
        ) : (
          <VisualizationBlock key={i} id={part.id} />
        )
      )}
    </div>
  );
}