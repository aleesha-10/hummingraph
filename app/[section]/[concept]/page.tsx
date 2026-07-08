// path : app/[section]/[concept]/page.tsx
// This file defines the page component for a specific concept within a section.
// It uses Next.js's dynamic routing to generate pages for each concept based on the section and concept IDs.
// The page displays detailed information about the concept, including its title, difficulty level, key points, and other relevant details.
// The concept data is retrieved using the getConcept function from the concepts library, which reads the concept data from the filesystem based on the provided section and concept IDs.
// If the concept is not found, the page will return a 404 not found response using Next.js's notFound function.

import { getConcept, getAllSections, getConceptsBySection } from '@/lib/concepts'
import ConceptPage from '@/components/ConceptPage'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const sections = getAllSections()
  const params = []
  for (const section of sections) {
    const concepts = getConceptsBySection(section.id)
    for (const concept of concepts) {
      params.push({ section: section.id, concept: concept.id })
    }
  }
  return params
}

// Dynamic per-concept metadata — gives each concept page its own browser tab
// title (was previously just the generic "Hummingraph" on every page) and
// explicitly sets the icon, since nested metadata doesn't reliably inherit
// the root layout's icon in practice.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; concept: string }>
}): Promise<Metadata> {
  const { section, concept } = await params
  const conceptData = getConcept(section, concept)

  if (!conceptData) {
    return { title: 'Concept not found — Hummingraph' }
  }

  return {
    title: `${conceptData.title} — Hummingraph`,
    description: conceptData.tagline,
    icons: {
      icon: '/logo2.svg',
    },
  }
}

export default async function ConceptRoute({ params }: { params: Promise<{ section: string; concept: string }> }) {
  const { section, concept } = await params
  const conceptData = getConcept(section, concept)

  if (!conceptData) return notFound()

  return <ConceptPage concept={conceptData} />
}