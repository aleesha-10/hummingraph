// This file defines the types for the concepts and sections used in the application.
// The Concept type represents a data science concept, while the Section type represents a section that groups related concepts together.
// The types defined here are used throughout the application to ensure type safety and consistency when working with concepts and sections.
// path: types/concept.ts

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type SectionId =
  | 'intro'
  | 'dav'
  | 'statistics'
  | 'advanced-statistics'
  | 'machine-learning'
  | 'advanced-ml'
  | 'dbms'
  | 'data-warehousing'
  | 'data-mining'
  | 'big-data'

export type ConceptColor = 'blue' | 'green' | 'purple' | 'yellow' | 'gray'

export interface Formula {
  label: string
  expression: string
  breakdown: {
    symbol: string
    means: string
  }[]
}

export interface Example {
  text: string
  interpretation?: string
}

export interface Step {
  step: number
  title: string
  description: string
}

export interface Visual {
  type: string
  description: string
}

export interface Concept {
  // required
  id: string
  title: string
  section: SectionId
  difficulty: Difficulty
  color: ConceptColor
  tagline: string
  what_it_is: string
  key_points: string[]

  // optional
  why_it_exists?: string
  what_it_measures?: string
  intuition?: string
  example?: Example
  steps?: Step[]
  formulas?: Formula[]
  when_to_use?: string[]
  when_not_to_use?: string[]
  common_mistakes?: string[]
  notes?: string[]
  ds_usage?: string
  visual?: Visual
  related_concepts?: string[]
}

export interface Section {
  id: SectionId
  title: string
  summary?: string 
  description: string
  color: ConceptColor
  conceptCount: number
  order: number
  hidden?: boolean
}