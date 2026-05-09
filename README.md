# 🐦 Hummingraph

> **A Hummingbird's map for Data Science**

Hummingraph is a concept navigation platform for Data Science. Every topic is explained through meaning, purpose, and data interpretation. No coding. No assignments. No 3-hour videos where you have to skip to the one concept that you actually need.

Live site: not yet deployed

---

## The problem it solves

You're revising before an interview, an exam or simply encounter a crelevant concept while reading something. You need to know what MSE actually *means* — not how to code it, not a 45-minute lecture. You just need:

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

Concept cards on section pages are coloured by difficulty level:

| Difficulty | Color |
|---|---|
| Beginner | Peach / orange `#ffccaa` |
| Intermediate | Mustard / amber `#e8b642` |
| Advanced | Terracotta / rose `#D4756B` |

---

## Sections

| Section | What's inside (subject to change )|
|---|---|
| 🧭 Introduction to Data Science | What DS is, the workflow, tools, roles — the front door |
| 📊 Data Analysis & Visualization | EDA, chart types, visual encoding, pattern spotting |
| 📐 Statistics | Probability, distributions, hypothesis testing, measures |
| 🔬 Advanced Statistics | Bayesian thinking, experimental design, statistical power |
| 🧠 Machine Learning | How models learn, core algorithms, evaluation, tradeoffs |
| ⚡ Advanced ML | Ensembles, boosting, clustering, dimensionality reduction |
| 🗄️ DBMS | Relational model, SQL, normalization, transactions, indexing |
| 🏭 Data Warehousing | ETL, star/snowflake schema, OLAP, analytical systems |
| 🔍 Data Mining | Association rules, anomaly detection, text mining |
| 🌊 Big Data | Distributed computing, Spark, streaming pipelines |

---

## How content works

Every concept is a single JSON file. The React component reads it and renders each field into the appropriate colour-coded block. No code changes needed to add new content — just write JSON.

### Adding a concept

1. Create a `.json` file in `data/concepts/<section>/` following `concept_schema.json`
2. Update `conceptCount` in `sections.json`
3. Done — the page generates automatically

### Adding a visualization

1. Create a Plotly JSON in `public/visualizations/<id>.json`
2. Drop `{{viz:id}}` anywhere in your concept text
3. The chart renders inline automatically

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Content | JSON files (loaded at build time) |
| Formulas | KaTeX |
| Visualizations | Plotly.js via react-plotly.js |
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

---

## Project structure

```
hummingraph/
├── app/
│   ├── page.tsx                  # Homepage — section cards
│   ├── [section]/
│   │   ├── page.tsx              # Section page — concept list
│   │   └── [concept]/
│   │       └── page.tsx          # Individual concept page
├── components/
│   ├── Navbar.tsx
│   ├── SectionCard.tsx
│   ├── ConceptCard.tsx
│   ├── ConceptPage.tsx           # Renders all concept blocks
│   ├── InlineText.tsx            # Parses {{viz:id}} placeholders
│   └── VisualizationBlock.tsx    # Fetches and renders Plotly charts
├── public/
│   ├── visualizations/           # Plotly chart JSON files
│   └── logo2.svg
├── lib/
│   ├── concepts.ts               # Data fetching helpers
│   └── colors.ts                 # Color tokens for all blocks
├── types/
│   └── concept.ts
└── sections.json                 # Master section index
```
<img width="1784" height="890" alt="image" src="https://github.com/user-attachments/assets/d904e65a-38fb-4310-8edc-17ac4e9b7274" />


_Built by [@aleesha-10](https://github.com/aleesha-10)  because no one should have to watch a 45-minute video to remember what MAE means.
