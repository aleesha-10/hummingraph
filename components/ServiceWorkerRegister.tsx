// path: components/ServiceWorkerRegister.tsx
"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Fails silently — the site works completely fine without it,
        // this only affects the "Add to Home Screen" install prompt.
      });
    }
  }, []);

  return null;
}
