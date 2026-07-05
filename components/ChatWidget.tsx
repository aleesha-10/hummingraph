// path: components/ChatWidget.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Source = { id: string; title: string; section: string; href: string };
type Message = { role: "user" | "assistant"; text: string; sources?: Source[] };

const INK = "#4A4A4A";
const MUTED = "#8a8a8a";
const BORDER = "rgba(74,74,74,0.15)";
const ACCENT = "#4A90D9";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: 'Ask me anything — try "MAE vs RMSE" or "when should I not use k-means".' },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading]);

  async function handleSend() {
    const question = input.trim();
    if (!question || loading) return;

    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", text: data.answer, sources: data.sources }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "Something went wrong reaching the assistant. Try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div
          className="mb-3 flex h-[28rem] w-80 flex-col rounded-2xl border shadow-xl"
          style={{ borderColor: BORDER, backgroundColor: "#FDFBF7" }}
        >
          <div className="flex items-center justify-between rounded-t-2xl border-b px-4 py-3" style={{ borderColor: BORDER }}>
            <span className="text-sm font-semibold" style={{ color: INK }}>
              Ask Hummingraph
            </span>
            <button onClick={() => setOpen(false)} aria-label="Close chat" style={{ color: MUTED }}>
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : ""}>
                <div
                  className="inline-block max-w-[90%] rounded-xl px-3 py-2 text-sm"
                  style={
                    m.role === "user"
                      ? { backgroundColor: ACCENT, color: "#fff" }
                      : { backgroundColor: "#F1EEE6", color: INK }
                  }
                >
                  {m.text}
                </div>
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.sources.map((s) => (
                      <Link
                        key={s.id}
                        href={s.href}
                        className="rounded-full border px-2.5 py-1 text-xs hover:opacity-70"
                        style={{ borderColor: BORDER, color: INK }}
                      >
                        {s.title} →
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="text-sm" style={{ color: MUTED }}>Thinking…</div>}
          </div>

          <div className="flex gap-2 border-t p-3" style={{ borderColor: BORDER }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a concept question…"
              className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none"
              style={{ borderColor: BORDER, color: INK, backgroundColor: "#fff" }}
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="rounded-lg px-3 py-2 text-sm text-white disabled:opacity-50"
              style={{ backgroundColor: ACCENT }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg"
        style={{ backgroundColor: ACCENT }}
        aria-label="Toggle chat"
      >
        🐦
      </button>
    </div>
  );
}
