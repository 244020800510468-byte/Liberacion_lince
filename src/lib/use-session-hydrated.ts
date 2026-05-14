"use client";

import { useEffect, useState } from "react";
import { useSessionStore } from "@/store/session-store";

/** Evita login antes de que persist termine de hidratar (si no, la sesión puede borrarse al fusionar storage). */
export function useSessionHydrated() {
  const [hydrated, setHydrated] = useState(() =>
    useSessionStore.persist.hasHydrated()
  );

  useEffect(() => {
    if (useSessionStore.persist.hasHydrated()) {
      queueMicrotask(() => setHydrated(true));
    }
    return useSessionStore.persist.onFinishHydration(() => setHydrated(true));
  }, []);

  return hydrated;
}
