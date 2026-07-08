// lib/searchIndex.ts
//
// Single source of truth for "find the right concept(s) given free text."
// Used by: the site search bar, and the chatbot's retrieval step (Tier 1 + Tier 2).
//
// Install: npm install fuse.js

import Fuse, { type IFuseOptions } from "fuse.js";
import type { Concept } from "@/types/concept";

// Flatten the fields worth searching into one weighted document per concept.
// Weight titles/taglines highest, body content lower, so "MSE" matches the
// title before it matches a passing mention inside another concept's notes.
function toSearchDoc(concept: Concept) {
  return {
    id: concept.id,
    title: concept.title,
    tagline: concept.tagline,
    section: concept.section,
    what_it_is: concept.what_it_is,
    key_points: concept.key_points?.join(" ") ?? "",
    when_to_use: concept.when_to_use?.join(" ") ?? "",
    when_not_to_use: concept.when_not_to_use?.join(" ") ?? "",
    common_mistakes: concept.common_mistakes?.join(" ") ?? "",
    raw: concept,
  };
}

export type SearchDoc = ReturnType<typeof toSearchDoc>;

const FUSE_OPTIONS: IFuseOptions<SearchDoc> = {
  includeScore: true,
  threshold: 0.3, // lower = stricter matching
  ignoreLocation: true,
  minMatchCharLength: 3, // stops very short strings ("hi", "ok") from fuzzy-matching unrelated concepts
  keys: [
    { name: "title", weight: 0.4 },
    { name: "tagline", weight: 0.25 },
    { name: "what_it_is", weight: 0.15 },
    { name: "key_points", weight: 0.1 },
    { name: "when_to_use", weight: 0.05 },
    { name: "when_not_to_use", weight: 0.05 },
  ],
};

let fuseInstance: Fuse<SearchDoc> | null = null;

/** Call once at build/startup with every concept loaded from your data/concepts tree. */
export function buildSearchIndex(allConcepts: Concept[]) {
  const docs = allConcepts.map(toSearchDoc);
  fuseInstance = new Fuse(docs, FUSE_OPTIONS);
  return fuseInstance;
}

/**
 * Search for concepts matching free text. Handles "X vs Y" queries specially —
 * splits on vs/versus/or and searches each side separately so both concepts
 * surface even if their titles don't literally contain the word "vs".
 */
export function searchConcepts(query: string, limit = 5): Concept[] {
  if (!fuseInstance) {
    throw new Error("Call buildSearchIndex() once before searchConcepts()");
  }

  const vsMatch = query.match(/(.+?)\s+(?:vs\.?|versus|or)\s+(.+)/i);

  if (vsMatch) {
    const [, left, right] = vsMatch;
    const leftResults = fuseInstance.search(left.trim(), { limit: 2 });
    const rightResults = fuseInstance.search(right.trim(), { limit: 2 });
    const seen = new Set<string>();
    const combined: Concept[] = [];
    for (const r of [...leftResults, ...rightResults]) {
      if (!seen.has(r.item.id)) {
        seen.add(r.item.id);
        combined.push(r.item.raw);
      }
    }
    return combined;
  }

  return fuseInstance.search(query, { limit }).map((r) => r.item.raw);
}