// path: components/FeedbackWidget.tsx
//
// Drop this at the bottom of ConceptPage.tsx, passing the current concept.
// No database, no API route — "helpful?" fires a free analytics event, and
// "suggest an edit" opens a pre-filled GitHub issue on your repo.
//
// Install (if not already): npm install @vercel/analytics
// Then wrap your root layout with <Analytics /> from '@vercel/analytics/react'
// per Vercel's docs — that's what makes the thumbs click actually visible to you.

"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import type { Concept } from "@/types/concept";

const REPO = "aleesha-10/hummingraph"; // update if the repo path ever changes
const INK = "#4A4A4A";
const MUTED = "#8a8a8a";
const BORDER = "rgba(74,74,74,0.15)";

export default function FeedbackWidget({ concept }: { concept: Concept }) {
  const [voted, setVoted] = useState<"up" | "down" | null>(null);

  function vote(choice: "up" | "down") {
    if (voted) return; // one vote per page view, keeps it simple and honest
    setVoted(choice);
    track("concept_feedback", {
      concept: concept.id,
      section: concept.section,
      helpful: choice === "up",
    });
  }

  const issueTitle = encodeURIComponent(`Feedback: ${concept.title}`);
  const issueBody = encodeURIComponent(
    `Concept: ${concept.title} (${concept.section}/${concept.id})\n\nWhat's wrong or missing?\n\n\n---\nWhat would make this clearer?\n`
  );
  const issueUrl = `https://github.com/${REPO}/issues/new?title=${issueTitle}&body=${issueBody}&labels=content-feedback`;

  return (
    <div
      className="mt-10 flex flex-col items-center gap-3 rounded-xl border py-6 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left"
      style={{ borderColor: BORDER, backgroundColor: "#ffffff" }}
    >
      <div>
        <p className="text-sm font-medium" style={{ color: INK }}>
          Was this concept helpful?
        </p>
        <div className="mt-2 flex justify-center gap-2 sm:justify-start">
          <button
            onClick={() => vote("up")}
            disabled={!!voted}
            aria-label="Helpful"
            className="rounded-full border px-3 py-1.5 text-lg disabled:opacity-40"
            style={{
              borderColor: BORDER,
              backgroundColor: voted === "up" ? "#EAF4EC" : "transparent",
            }}
          >
            👍
          </button>
          <button
            onClick={() => vote("down")}
            disabled={!!voted}
            aria-label="Not helpful"
            className="rounded-full border px-3 py-1.5 text-lg disabled:opacity-40"
            style={{
              borderColor: BORDER,
              backgroundColor: voted === "down" ? "#FBEAEA" : "transparent",
            }}
          >
            👎
          </button>
        </div>
        {voted && (
          <p className="mt-1.5 text-xs" style={{ color: MUTED }}>
            Thanks — that helps prioritize what to improve.
          </p>
        )}
      </div>

      <a
        href={issueUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium underline underline-offset-2"
        style={{ color: INK }}
      >
        Spot an error or gap? Suggest an edit →
      </a>
    </div>
  );
}
