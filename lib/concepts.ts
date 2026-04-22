// path : lib/concepts.ts
// This file contains helper functions for working with concepts and sections in the application. 
// It provides functions to retrieve all sections, visible sections, concepts by section, and a specific concept by its ID. 
// These functions read data from the filesystem, from JSON files that store the concepts and sections data.

import fs from 'fs'
import path from 'path'
import { Concept, Section } from '@/types/concept'
import sectionsData from '@/data/sections.json'

export function getAllSections(): Section[] {
  return sectionsData.sections as Section[]
}

export function getVisibleSections(): Section[] {
  return sectionsData.sections.filter(s => !s.hidden) as Section[]
}

export function getConceptsBySection(sectionId: string): Concept[] {
  const dir = path.join(process.cwd(), 'data', 'concepts', sectionId)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(
      fs.readFileSync(path.join(dir, f), 'utf-8')
    ) as Concept)
}

export function getConcept(sectionId: string, conceptId: string): Concept | null {
  const file = path.join(process.cwd(), 'data', 'concepts', sectionId, `${conceptId}.json`)
  if (!fs.existsSync(file)) return null
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as Concept
}