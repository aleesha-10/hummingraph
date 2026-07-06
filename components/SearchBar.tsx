// path: components/SearchBar.tsx
//
// Lightweight instant search — type a concept name, get a dropdown of
// matches, click (or arrow keys + Enter) to jump straight to it.
// Install: npm install fuse.js

"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";

type SearchableConcept = {
  id: string;
  title: string;
  section: string;
  tagline: string;
};

const INK = "#333333";
const MUTED = "#8a8a8a";
const BORDER = "rgba(74,74,74,0.15)";

export default function SearchBar({ concepts }: { concepts: SearchableConcept[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(concepts, {
        keys: [
          { name: "title", weight: 0.7 },
          { name: "tagline", weight: 0.3 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [concepts]
  );

  const results = query.trim() ? fuse.search(query, { limit: 8 }).map((r) => r.item) : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cmd+K / Ctrl+K focuses the search box from anywhere on the site
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  function goTo(concept: SearchableConcept) {
    router.push(`/${concept.section}/${concept.id}`);
    setQuery("");
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      goTo(results[activeIndex]);
    }
  }

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%" }}>
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search concepts…  ⌘K"
        style={{
          width: "100%",
          fontSize: "0.85rem",
          fontFamily: "var(--font-mulish), sans-serif",
          color: INK,
          backgroundColor: "#ffffff",
          border: `1px solid ${BORDER}`,
          borderRadius: "8px",
          padding: "7px 10px",
          outline: "none",
        }}
      />

      {open && query.trim() && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            maxHeight: "320px",
            overflowY: "auto",
            background: "#FDFBF7",
            border: `1px solid ${BORDER}`,
            borderRadius: "10px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            zIndex: 60,
          }}
        >
          {results.length === 0 ? (
            <div style={{ padding: "12px 14px", fontSize: "0.85rem", color: MUTED }}>
              No concepts found for "{query}"
            </div>
          ) : (
            results.map((c, i) => (
              <button
                key={c.id}
                onClick={() => goTo(c)}
                onMouseEnter={() => setActiveIndex(i)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "10px 14px",
                  background: i === activeIndex ? "rgba(74,144,217,0.08)" : "transparent",
                  border: "none",
                  borderBottom: i < results.length - 1 ? `1px solid ${BORDER}` : "none",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: "0.88rem", fontWeight: 600, color: INK }}>{c.title}</div>
                <div style={{ fontSize: "0.75rem", color: MUTED, marginTop: "1px" }}>
                  {c.tagline}
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
