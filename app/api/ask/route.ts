// path: app/api/ask/route.ts
//
// FREE VERSION — pure retrieval, no LLM call, no API key needed.
// Finds the matching concept(s) via Fuse.js and formats their existing
// fields into a readable answer directly. This is the entire "R" in RAG,
// with no "G" step, which is why it costs nothing to run.

import { NextRequest, NextResponse } from "next/server";
import { buildSearchIndex, searchConcepts } from "@/lib/searchIndex";
import { getAllConcepts } from "@/lib/concepts";
import type { Concept } from "@/types/concept";

function formatSingleConcept(c: Concept): string {
  const lines = [`**${c.title}** — ${c.tagline}`, "", c.what_it_is];

  if (c.when_to_use?.length) {
    lines.push("", "**When to use:**", ...c.when_to_use.map((s) => `• ${s}`));
  }
  if (c.when_not_to_use?.length) {
    lines.push("", "**When not to use:**", ...c.when_not_to_use.map((s) => `• ${s}`));
  }
  return lines.join("\n");
}

function formatComparison(a: Concept, b: Concept): string {
  return [
    `**${a.title}** — ${a.tagline}`,
    `**${b.title}** — ${b.tagline}`,
    "",
    `${a.title} when to use: ${(a.when_to_use ?? []).join("; ") || "—"}`,
    `${b.title} when to use: ${(b.when_to_use ?? []).join("; ") || "—"}`,
    "",
    `${a.title} when NOT to use: ${(a.when_not_to_use ?? []).join("; ") || "—"}`,
    `${b.title} when NOT to use: ${(b.when_not_to_use ?? []).join("; ") || "—"}`,
  ].join("\n");
}

const GREETING_PATTERN = /^(hi|hey|hello|yo|sup|hola|good\s?morning|good\s?evening|good\s?afternoon)[\s!.,]*$/i;
const THANKS_PATTERN = /^(thanks|thank\s?you|thx|ty|cool|nice|great|ok|okay)[\s!.,]*$/i;

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  if (!question || typeof question !== "string") {
    return NextResponse.json({ error: "Missing question" }, { status: 400 });
  }

  const trimmed = question.trim();

  if (GREETING_PATTERN.test(trimmed)) {
    return NextResponse.json({
      answer:
        "Hey! Ask me about any Data Science concept — e.g. \"MAE vs RMSE\", \"when to use k-means\", or just a topic name like \"gradient boosting\".",
      sources: [],
    });
  }

  if (THANKS_PATTERN.test(trimmed)) {
    return NextResponse.json({
      answer: "Anytime — ask away whenever you're stuck on a concept.",
      sources: [],
    });
  }

  if (trimmed.length < 3) {
    return NextResponse.json({
      answer: "Could you say a bit more? Try naming a concept, like \"decision trees\" or \"PCA\".",
      sources: [],
    });
  }

  const allConcepts = getAllConcepts(); // sync, matches your lib/concepts.ts
  buildSearchIndex(allConcepts);
  const matches = searchConcepts(trimmed, 2);

  if (matches.length === 0) {
    return NextResponse.json({
      answer:
        "I couldn't find a concept on Hummingraph that matches that yet. Try browsing the section list, or rephrase your question.",
      sources: [],
    });
  }

  const answer =
    matches.length === 2
      ? formatComparison(matches[0], matches[1])
      : formatSingleConcept(matches[0]);

  return NextResponse.json({
    answer,
    sources: matches.map((c) => ({
      id: c.id,
      title: c.title,
      section: c.section,
      href: `/${c.section}/${c.id}`,
    })),
  });
}

// ---- Optional upgrade path (costs money, off by default) ----
//
// If you ever want Claude to paraphrase the retrieved concepts into a more
// natural sentence instead of showing the raw fields above, that's a separate,
// optional step: pass `matches` as context to the Anthropic API and ask it
// to synthesize an answer using ONLY that context. Needs ANTHROPIC_API_KEY
// and costs per token. Not needed for this to work — the retrieval-only
// version above is a complete, free, standalone chatbot.
