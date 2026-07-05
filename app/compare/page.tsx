// path: app/compare/page.tsx
import CompareMode from "@/components/CompareMode";
import { getAllConcepts } from "@/lib/concepts";

export const metadata = {
  title: "Compare Concepts — Hummingraph",
  description: "Put any two data science concepts side by side.",
};

export default function ComparePage() {
  const concepts = getAllConcepts(); // sync — matches your lib/concepts.ts

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-nunito)" }}>
        Compare Concepts
      </h1>
      <p className="mt-1 text-sm" style={{ color: "#8a8a8a" }}>
        Pick two concepts and see them side by side.
      </p>
      <div className="mt-8">
        <CompareMode concepts={concepts} />
      </div>
    </main>
  );
}
