// components/ui/Formula.tsx
"use client"

import 'katex/dist/katex.min.css'   // ← THE FIX: without this, KaTeX renders broken
import { BlockMath, InlineMath } from 'react-katex'

interface FormulaProps {
  expression: string
  block?: boolean
}

export default function Formula({ expression, block = true }: FormulaProps) {
  return block
    ? <BlockMath math={expression} />
    : <InlineMath math={expression} />
}