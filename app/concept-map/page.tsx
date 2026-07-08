// path: app/concept-map/page.tsx
import ConceptMap from "@/components/ConceptMap";
import { getAllConcepts, getAllSections } from "@/lib/concepts";

export const metadata = {
  title: "Concept Map — Hummingraph",
  description: "Explore how every data science concept connects.",
  icons: {
    icon: "/logo2.svg",
  },
};

export default function ConceptMapPage() {
  const concepts = getAllConcepts();
  const sections = getAllSections();

  return (
    <main className="flex h-[calc(100vh-56px)] flex-col px-4 py-4">
      <div className="mb-3">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-nunito)" }}>
          Concept Map
        </h1>
        <p className="mt-1 text-sm" style={{ color: "#8a8a8a" }}>
          Drag to reposition, scroll to zoom, click a node to jump to that concept.
        </p>
      </div>
      <div className="min-h-0 flex-1">
        <ConceptMap concepts={concepts} sections={sections} />
      </div>
    </main>
  );
}