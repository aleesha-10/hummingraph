// src/lib/concepts.ts
import fs from 'fs'
import path from 'path'
import { Concept, Section } from '@/types/concept'

const DATA_DIR = path.join(process.cwd(), 'data/concepts')
const SECTIONS_FILE = path.join(process.cwd(), 'data/sections.json')

// ─── Sections ─────────────────────────────────────────────────────────────────

function readSections(): Section[] {
  if (!fs.existsSync(SECTIONS_FILE)) return []
  const raw = JSON.parse(fs.readFileSync(SECTIONS_FILE, 'utf-8'))
  // sections.json wraps the array under a "sections" key
  return (raw.sections ?? raw) as Section[]
}

export function getAllSections(): Section[] {
  return readSections().sort((a, b) => a.order - b.order)
}

export function getVisibleSections(): Section[] {
  return getAllSections().filter(s => !s.hidden)
}

// ─── Concepts ─────────────────────────────────────────────────────────────────

export function getAllConcepts(): Concept[] {
  const concepts: Concept[] = []
  if (!fs.existsSync(DATA_DIR)) return concepts

  const sections = fs.readdirSync(DATA_DIR)
  for (const section of sections) {
    const sectionPath = path.join(DATA_DIR, section)
    if (!fs.statSync(sectionPath).isDirectory()) continue
    const files = fs.readdirSync(sectionPath).filter(f => f.endsWith('.json'))
    for (const file of files) {
      const raw = fs.readFileSync(path.join(sectionPath, file), 'utf-8')
      concepts.push(JSON.parse(raw) as Concept)
    }
  }
  return concepts
}

export function getConcept(section: string, id: string): Concept | null {
  const filePath = path.join(DATA_DIR, section, `${id}.json`)
  if (!fs.existsSync(filePath)) return null
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Concept
}

export function getConceptsBySection(section: string): Concept[] {
  const sectionPath = path.join(DATA_DIR, section)
  if (!fs.existsSync(sectionPath)) return []
  return fs.readdirSync(sectionPath)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(sectionPath, f), 'utf-8')) as Concept)
}