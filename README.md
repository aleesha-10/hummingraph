# Hummingraph <img src="./public/logo2.svg" alt="Hummingraph logo" width="120">

> **A Hummingbird's map for Data Science**

Hummingraph is a concept navigation platform for Data Science. Every topic is explained through meaning, purpose, and data interpretation. No coding. No assignments. No 3-hour videos where you have to skip to the one concept that you actually need.

Live site: https://hummingraph.vercel.app/

---

## The problem it solves

You're revising before an interview, an exam, or you simply encounter a relevant concept while reading something. You need to know what MSE actually *means* — not how to code it, not a 45-minute lecture. You just need:

- What is it?
- Why does it exist?
- What does it tell me about my data?
- When should I NOT use it?

Current tools fail here. Videos are too long. Notes are scattered. AI tools like ChatGPT aren't structured. Hummingraph is built to answer exactly this — one concept, one clean page, in 2 minutes.

---

## What each concept page contains

Every concept follows the same structure, with each block colour-coded by meaning so readers start associating colour with purpose rather than section:

| Block | Color | What it answers |
|-------|-------|-----------------|
| **Key Points** | 🔵 Blue | What to remember — quick revision bullets |
| **What it is** | 🟣 Purple | Plain English definition — what does this represent in data? |
| **Why it exists** | 🟡 Yellow | What problem was this created to solve? |
| **What it measures** | 🩵 Teal | What does this actually tell us about data? |
| **Intuition** | 🟠 Orange | Analogy or story that makes it click |
| **Example** | 🌸 Rose | Concrete numbers — the worked case |
| **How it works** | 🔵 Blue | Step-by-step for algorithms and processes |
| **Formulas** | ⬜ White/Gray | Light math — meaning behind the notation, not heavy proofs |
| **When to use** | 🟢 Green | Go ahead — the right situations |
| **When not to use** | 🟤 Amber | Caution — what breaks it or when something else is better |
| **Common mistakes** | 🔴 Red | Real errors that show up in notebooks and production |
| **Notes** | 🩶 Slate | Edge cases and caveats |
| **In practice** | 🩵 Turquoise | Where this shows up in real DS work |

### Concept card difficulty colors

| Difficulty | Color |
|---|---|
| Beginner | Peach / orange `#ffccaa` |
| Intermediate | Mustard / amber `#e8b642` |
| Advanced | Terracotta / rose `#D4756B` |

---

## Sections

| Section | id | What's inside |
|---|---|---|
| 🧭 Introduction to Data Science | `intro` | What DS is, the workflow, tools, roles — the front door |
| 📊 Data Analysis & Visualization | `dav` | EDA, chart types, visual encoding, pattern spotting |
| 📐 Statistics | `statistics` | Probability, distributions, hypothesis testing, measures |
| 🔬 Advanced Statistics | `advanced-statistics` | Bayesian thinking, experimental design, statistical power |
| 🧠 Machine Learning | `machine-learning` | How models learn, core algorithms, evaluation, tradeoffs |
| ⚡ Advanced ML | `advanced-ml` | Ensembles, boosting, clustering, dimensionality reduction |
| 🗄️ DBMS | `dbms` | Relational model, SQL, normalization, transactions, indexing |
| 🏭 Data Warehousing | `data-warehousing` | ETL, star/snowflake schema, OLAP, analytical systems |
| 🔍 Data Mining | `data-mining` | Association rules, anomaly detection, text mining |
| 🌊 Big Data | `big-data` | Distributed computing, Spark, streaming pipelines |

To hide an incomplete section from the homepage until it's ready, set `hidden: true` on it in `data/sections.json`. It stays reachable by direct URL, it just won't show a card.

---

## Features

Beyond the core concept pages:

- **Search (⌘K)** — instant fuzzy search across every concept from the navbar, jump straight to a result
- **Concept Map** (`/concept-map`) — radial graph of every concept, grouped by section, with cross-links from each concept's `related_concepts`
- **Compare Mode** (`/compare`) — pick any two concepts and see them side by side
- **Chatbot** — floating assistant that retrieves matching concepts from your own content and answers from them directly (no LLM cost — see `app/api/ask/route.ts`)
- **Feedback widget** — 👍/👎 per concept (via Vercel Analytics) plus a pre-filled "suggest an edit" link that opens a GitHub issue on this repo
- **Cheat sheet PDF export** — auto-generates a printable one-pager per section from each concept's `key_points` (`lib/cheatsheet.ts`)
- **Data visualizations** — select concepts (mostly in Advanced ML) embed real Plotly charts via `{{viz:id}}` placeholders, rendered from `public/visualizations/*.json`
- **PWA support** — installable to a phone's home screen (manifest + service worker, zero extra config needed)
- **Past Papers** — dropdown in the navbar linking to community-contributed past paper repositories, split by university

---

## How content works

Every concept is a single JSON file. The React component reads it and renders each field into the appropriate colour-coded block. No code changes needed to add new content — just write JSON.

### Adding a concept

1. Create a `.json` file in `data/concepts/<section>/` following `concept_schema.json`
2. Update `conceptCount` in `data/sections.json`
3. Done — the page generates automatically

### Adding a visualization

1. Create a Plotly JSON (a figure's `{data, layout}` object) in `public/visualizations/<id>.json`
2. Drop `{{viz:id}}` anywhere in your concept text
3. The chart renders inline automatically

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Content | JSON files (loaded from disk at request/build time) |
| Formulas | KaTeX |
| Visualizations | Plotly.js via react-plotly.js |
| Search | Fuse.js |
| Concept map | d3-force |
| Cheat sheet export | jsPDF |
| Analytics / feedback | Vercel Analytics |
| Deployment | Vercel |

---

## Running locally

```bash
git clone https://github.com/aleesha-10/hummingraph.git
cd hummingraph
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

No environment variables are required to run this locally or in production — the chatbot is retrieval-only (no external API calls, no API key needed).

---

## Contributing

google forms link https://forms.gle/AXXHReuKv9voDzXC9 
or upload directly to the past papers repository 

---

## Project structure

```
hummingraph/
├── app/
│   ├── page.tsx                  # Homepage — section cards
│   ├── layout.tsx                # Root layout — navbar, chat widget, PWA setup
│   ├── compare/
│   │   └── page.tsx              # Compare Mode
│   ├── concept-map/
│   │   └── page.tsx              # Concept Map
│   ├── api/
│   │   └── ask/route.ts          # Chatbot retrieval endpoint (no LLM cost)
│   ├── [section]/
│   │   ├── page.tsx              # Section page — concept list
│   │   └── [concept]/
│   │       └── page.tsx          # Individual concept page
├── components/
│   ├── Navbar.tsx
│   ├── SearchBar.tsx
│   ├── SectionCard.tsx
│   ├── ConceptCard.tsx
│   ├── ConceptPage.tsx           # Renders all concept blocks
│   ├── CompareMode.tsx
│   ├── ConceptMap.tsx
│   ├── ChatWidget.tsx
│   ├── FeedbackWidget.tsx
│   ├── ServiceWorkerRegister.tsx
│   ├── InlineText.tsx            # Parses {{viz:id}} placeholders
│   └── VisualizationBlock.tsx    # Fetches and renders Plotly charts
├── public/
│   ├── visualizations/           # Plotly chart JSON files
│   ├── manifest.json             # PWA manifest
│   ├── sw.js                     # Service worker
│   ├── icon-*.png                # PWA icons
│   └── logo2.svg
├── lib/
│   ├── concepts.ts               # Data fetching helpers
│   ├── searchIndex.ts            # Fuse.js search/retrieval (search bar + chatbot)
│   ├── cheatsheet.ts             # PDF cheat sheet generator
│   └── colors.ts                 # Color tokens for all blocks
├── types/
│   └── concept.ts
└── data/
    └── sections.json             # Master section index
```
