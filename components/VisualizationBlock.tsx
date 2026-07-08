// components/VisualizationBlock.tsx
// Fetches a Plotly JSON from /public/visualizations/<id>.json and renders it.
// Used by InlineText to swap {{viz:id}} placeholders with live charts.

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface PlotlyJson {
  data: Plotly.Data[];
  layout?: Partial<Plotly.Layout>;
  frames?: Plotly.Frame[];
}

interface VisualizationBlockProps {
  id: string; // e.g. "boxplot-with-outliers"
}

export default function VisualizationBlock({ id }: VisualizationBlockProps) {
  const [plotJson, setPlotJson] = useState<PlotlyJson | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/visualizations/${id}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((json) => setPlotJson(json))
      .catch(() => setError(true));
  }, [id]);

  if (error) {
    return (
      <div className="viz-error">
        <span>⚠ Visualization not found: <code>{id}</code></span>
      </div>
    );
  }

  if (!plotJson) {
    return (
      <div className="viz-skeleton" aria-label="Loading visualization">
        <div className="viz-skeleton-bar" style={{ width: "100%", height: "300px" }} />
      </div>
    );
  }

  // Dual-subplot figures (like the 2D+3D kernel trick chart) need more
  // vertical room than a single panel. Without an explicit height here, the
  // plot has nothing real to size itself against, so it renders taller than
  // its container and visually spills into whatever content comes next on
  // the page instead of reserving its own space in the normal document flow.
  const hasScene = Object.keys(plotJson.layout ?? {}).some((k) => k.startsWith("scene"));

  return (
    <div
      className="viz-block"
      style={{
        position: "relative",
        width: "100%",
        height: hasScene ? "520px" : "420px",
        overflow: "hidden", // safety net: nothing can visually spill past this box
      }}
    >
      <Plot
        data={plotJson.data}
        layout={{
          autosize: true,
          margin: { t: 40, r: 20, b: 40, l: 50 },
          font: { family: "inherit" },
          ...plotJson.layout,
        }}
        frames={plotJson.frames ?? []}
        config={{
          responsive: true,
          displayModeBar: false,
        }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}