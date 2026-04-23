// components/VisualizationBlock.tsx
// Fetches a Plotly JSON from /public/visualizations/<id>.json and renders it.
// Used by InlineText to swap {{viz:id}} placeholders with live charts.

import { useEffect, useState } from "react";
import Plot from "react-plotly.js";

interface PlotlyJson {
  data: Plotly.Data[];
  layout?: Partial<Plotly.Layout>;
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

  return (
    <div className="viz-block">
      <Plot
        data={plotJson.data}
        layout={{
          autosize: true,
          margin: { t: 40, r: 20, b: 40, l: 50 },
          font: { family: "inherit" },
          ...plotJson.layout,
        }}
        config={{
          responsive: true,
          displayModeBar: false, // hide the Plotly toolbar for cleaner look
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
