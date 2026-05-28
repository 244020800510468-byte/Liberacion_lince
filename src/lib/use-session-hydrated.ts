"use client";

import { useEffect, useState } from "react";
import { useSessionStore } from "@/store/session-store";

/** Evita login antes de que persist termine de hidratar (si no, la sesión puede borrarse al fusionar storage). */
export function useSessionHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const persist = useSessionStore.persist;
    if (!persist) {
      setHydrated(true);
      return;
    }
    if (persist.hasHydrated()) {
      setHydrated(true);
    }
    return persist.onFinishHydration(() => setHydrated(true));
  }, []);

  return hydrated;
}
