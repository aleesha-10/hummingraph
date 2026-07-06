// path: components/CompareMode.tsx
"use client";

import { useMemo, useState } from "react";
import type { Concept } from "@/types/concept";

const INK = "#4A4A4A";
const MUTED = "#8a8a8a";
const BORDER = "rgba(74,74,74,0.12)";

function ConceptColumn({ concept }: { concept: Concept | null }) {
  if (!concept) {
    return (
      <div
        className="flex h-full min-h-[16rem] items-center justify-center rounded-xl border border-dashed p-8 text-center text-sm"
        style={{ borderColor: BORDER, color: MUTED }}
      >
        Pick a concept to compare
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-5" style={{ borderColor: BORDER }}>
      <h3 className="text-lg font-semibold" style={{ color: INK }}>
        {concept.title}
      </h3>
      <p className="mt-1 text-sm" style={{ color: MUTED }}>
        {concept.tagline}
      </p>

      <Section label="What it is" items={[concept.what_it_is]} />
      <Section label="Key points" items={concept.key_points} />
      <Section label="When to use" items={concept.when_to_use ?? []} tone="green" />
      <Section label="When NOT to use" items={concept.when_not_to_use ?? []} tone="amber" />
    </div>
  );
}

function Section({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone?: "green" | "amber";
}) {
  if (!items || items.length === 0 || !items[0]) return null;
  const dot = tone === "green" ? "#4CAF7D" : tone === "amber" ? "#E8B642" : "#B5B5B5";
  return (
    <div className="mt-4">
      <div
        className="mb-1.5 text-xs font-semibold uppercase tracking-wide"
        style={{ color: MUTED }}
      >
        {label}
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm" style={{ color: INK }}>
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: dot }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CompareMode({ concepts }: { concepts: Concept[] }) {
  const [leftId, setLeftId] = useState("");
  const [rightId, setRightId] = useState("");

  const left = useMemo(() => concepts.find((c) => c.id === leftId) ?? null, [leftId, concepts]);
  const right = useMemo(() => concepts.find((c) => c.id === rightId) ?? null, [rightId, concepts]);

  return (
    <div>
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ConceptPicker concepts={concepts} value={leftId} onChange={setLeftId} placeholder="Select first concept…" />
        <ConceptPicker concepts={concepts} value={rightId} onChange={setRightId} placeholder="Select second concept…" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ConceptColumn concept={left} />
        <ConceptColumn concept={right} />
      </div>
    </div>
  );
}

function ConceptPicker({
  concepts,
  value,
  onChange,
  placeholder,
}: {
  concepts: Concept[];
  value: string;
  onChange: (id: string) => void;
  placeholder: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border bg-white px-3 py-2 text-sm"
      style={{ borderColor: BORDER, color: INK }}
    >
      <option value="">{placeholder}</option>
      {concepts.map((c) => (
        <option key={c.id} value={c.id}>
          {c.title}
        </option>
      ))}
    </select>
  );
}
