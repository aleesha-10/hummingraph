// path: components/ConceptMap.tsx
// Install: npm install d3-force d3-selection d3-zoom d3-drag
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as d3 from "d3-force";
import { select } from "d3-selection";
import { zoom } from "d3-zoom";
import { drag } from "d3-drag";
import type { Concept, Section, SectionId } from "@/types/concept";

type NodeKind = "root" | "section" | "concept";

type GraphNode = {
  id: string;
  label: string;
  kind: NodeKind;
  section?: SectionId;
  color: string;
  radius: number;
  targetX: number;
  targetY: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
};

const SECTION_COLORS: Record<SectionId, string> = {
  intro: "#4A90D9",
  dav: "#4A90D9",
  statistics: "#4CAF7D",
  "advanced-statistics": "#4CAF7D",
  "machine-learning": "#9B7EDE",
  "advanced-ml": "#9B7EDE",
  dbms: "#9CA3AF",
  "data-warehousing": "#9CA3AF",
  "data-mining": "#E8B642",
  "big-data": "#E8B642",
};

const ROOT_ID = "__root__";

export default function ConceptMap({
  concepts,
  sections,
}: {
  concepts: Concept[];
  sections: Section[];
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const router = useRouter();
  const [size, setSize] = useState({ width: 900, height: 600 });

  useEffect(() => {
    if (!wrapperRef.current) return;
    const el = wrapperRef.current;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    const { width, height } = size;
    const cx = width / 2;
    const cy = height / 2;

    // Radii for the three rings. Scales with the smaller viewport dimension
    // so it stays proportional whether the map is wide or tall.
    const base = Math.min(width, height);
    const R_SECTION = base * 0.28;
    const R_CONCEPT_BASE = R_SECTION + base * 0.14;

    // ---- STEP 1: place sections evenly around the circle ----
    const sectionAngleStep = (2 * Math.PI) / Math.max(sections.length, 1);
    const sectionAngle = new Map<SectionId, number>();
    sections.forEach((s, i) => sectionAngle.set(s.id, i * sectionAngleStep - Math.PI / 2));

    const sectionNodes: GraphNode[] = sections.map((s) => {
      const angle = sectionAngle.get(s.id)!;
      return {
        id: `section:${s.id}`,
        label: s.title,
        kind: "section",
        section: s.id,
        color: SECTION_COLORS[s.id] ?? "#9CA3AF",
        radius: 14,
        targetX: cx + R_SECTION * Math.cos(angle),
        targetY: cy + R_SECTION * Math.sin(angle),
      };
    });

    // ---- STEP 2: fan each section's concepts into its own wedge ----
    const conceptsBySection = new Map<SectionId, Concept[]>();
    concepts.forEach((c) => {
      if (!conceptsBySection.has(c.section)) conceptsBySection.set(c.section, []);
      conceptsBySection.get(c.section)!.push(c);
    });

    const conceptNodes: GraphNode[] = [];
    conceptsBySection.forEach((list, sectionId) => {
      const centerAngle = sectionAngle.get(sectionId) ?? 0;
      const count = list.length;
      // wider wedge for sections with more concepts, capped so neighboring
      // wedges never overlap even with 10 sections around the circle
      const wedge = Math.min(sectionAngleStep * 0.85, Math.max(0.35, count * 0.16));

      list.forEach((c, i) => {
        const t = count === 1 ? 0.5 : i / (count - 1); // 0..1 across the wedge
        const angle = centerAngle - wedge / 2 + t * wedge;
        // stagger across 3 rings so a long row of concepts doesn't form one
        // solid overlapping arc — every 3rd concept sits a bit further out
        const ring = i % 3;
        const radius = R_CONCEPT_BASE + ring * (base * 0.075);

        conceptNodes.push({
          id: c.id,
          label: c.title,
          kind: "concept",
          section: c.section,
          color: SECTION_COLORS[c.section] ?? "#9CA3AF",
          radius: 6,
          targetX: cx + radius * Math.cos(angle),
          targetY: cy + radius * Math.sin(angle),
        });
      });
    });

    const rootNode: GraphNode = {
      id: ROOT_ID,
      label: "Data Science",
      kind: "root",
      color: "#4A4A4A",
      radius: 20,
      targetX: cx,
      targetY: cy,
      fx: cx,
      fy: cy,
    };

    const nodes: GraphNode[] = [rootNode, ...sectionNodes, ...conceptNodes];
    const nodeById = new Map(nodes.map((n) => [n.id, n]));

    // Seed starting positions at their computed target so the simulation
    // starts already-organized instead of from random/zero positions.
    nodes.forEach((n) => {
      n.x = n.targetX;
      n.y = n.targetY;
    });

    const hierarchyLinks = [
      ...sectionNodes.map((s) => ({ source: ROOT_ID, target: s.id })),
      ...concepts.map((c) => ({ source: `section:${c.section}`, target: c.id })),
    ];

    const crossLinks = concepts.flatMap((c) =>
      (c.related_concepts ?? [])
        .filter((rid) => nodeById.has(rid) && rid !== c.id)
        .map((rid) => ({ sourceId: c.id, targetId: rid }))
    );

    const svg = select(svgRef.current);
    svg.attr("viewBox", `0 0 ${width} ${height}`);
    svg.selectAll("*").remove();
    const container = svg.append("g");

    svg.call(
      zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.15, 4])
        .on("zoom", (event) => container.attr("transform", event.transform))
    );

    // Gentle simulation: nodes are pulled toward their pre-computed radial
    // target (forceX/forceY) and only nudged further by collision — no
    // general charge repulsion fighting the layout we already designed.
    const simulation = d3
      .forceSimulation(nodes as any)
      .force("x", d3.forceX((d: any) => d.targetX).strength(0.5))
      .force("y", d3.forceY((d: any) => d.targetY).strength(0.5))
      .force(
        "link",
        d3
          .forceLink(hierarchyLinks as any)
          .id((d: any) => d.id)
          .distance((d: any) => (d.source.kind === "root" ? R_SECTION : R_CONCEPT_BASE - R_SECTION))
          .strength(0.25)
      )
      .force(
        "collide",
        d3.forceCollide((d: any) => d.radius + (d.kind === "concept" ? 34 : 55)) // extra room for label text
      );

    // Cross-links (related_concepts) drawn manually from node positions each
    // tick — they don't need their own force, just a line between wherever
    // the two nodes end up.
    const crossLineSel = container
      .append("g")
      .selectAll("line")
      .data(crossLinks)
      .join("line")
      .attr("stroke", "#4A90D955")
      .attr("stroke-dasharray", "3,3")
      .attr("stroke-width", 1);

    const hierarchyLineSel = container
      .append("g")
      .selectAll("line")
      .data(hierarchyLinks)
      .join("line")
      .attr("stroke", "#4A4A4A33")
      .attr("stroke-width", 1.2);

    const node = container
      .append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .style("cursor", (d: any) => (d.kind === "concept" ? "pointer" : "default"))
      .call(
        drag<any, any>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            if (d.kind !== "root") {
              d.fx = null;
              d.fy = null;
            }
          })
      )
      .on("click", (_event, d: any) => {
        if (d.kind === "concept") router.push(`/${d.section}/${d.id}`);
      });

    node
      .append("circle")
      .attr("r", (d: any) => d.radius)
      .attr("fill", (d: any) => d.color)
      .attr("stroke", "#FDFBF7")
      .attr("stroke-width", (d: any) => (d.kind === "concept" ? 1.5 : 2.5));

    // Labels point outward, away from center, and flip to the opposite side
    // on the left half of the circle so text never runs back toward the hub.
    node
      .append("text")
      .text((d: any) => d.label)
      .attr("text-anchor", (d: any) =>
        d.kind === "root" ? "middle" : d.targetX >= cx ? "start" : "end"
      )
      .attr("x", (d: any) =>
        d.kind === "root" ? 0 : d.targetX >= cx ? d.radius + 5 : -(d.radius + 5)
      )
      .attr("y", (d: any) => (d.kind === "root" ? d.radius + 14 : 4))
      .attr("fill", "#4A4A4A")
      .attr("font-size", (d: any) => (d.kind === "root" ? 14 : d.kind === "section" ? 12 : 9.5))
      .attr("font-weight", (d: any) => (d.kind === "root" ? 700 : d.kind === "section" ? 600 : 400))
      .style("pointer-events", "none");

    simulation.on("tick", () => {
      hierarchyLineSel
        .attr("x1", (d: any) => (nodeById.get(d.source.id ?? d.source) as any).x)
        .attr("y1", (d: any) => (nodeById.get(d.source.id ?? d.source) as any).y)
        .attr("x2", (d: any) => (nodeById.get(d.target.id ?? d.target) as any).x)
        .attr("y2", (d: any) => (nodeById.get(d.target.id ?? d.target) as any).y);

      crossLineSel
        .attr("x1", (d: any) => nodeById.get(d.sourceId)!.x!)
        .attr("y1", (d: any) => nodeById.get(d.sourceId)!.y!)
        .attr("x2", (d: any) => nodeById.get(d.targetId)!.x!)
        .attr("y2", (d: any) => nodeById.get(d.targetId)!.y!);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [concepts, sections, router, size]);

  return (
    <div
      ref={wrapperRef}
      className="h-full w-full rounded-xl border"
      style={{ borderColor: "rgba(74,74,74,0.12)", backgroundColor: "#ffffff" }}
    >
      <svg ref={svgRef} width="100%" height="100%" />
    </div>
  );
}