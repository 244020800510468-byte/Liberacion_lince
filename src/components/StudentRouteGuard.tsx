"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSessionStore } from "@/store/session-store";

export function StudentRouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const student = useSessionStore((s) => s.student);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (useSessionStore.persist.hasHydrated()) setHydrated(true);
    const unsub = useSessionStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );
    return unsub;
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!student) router.replace("/login/estudiante");
  }, [hydrated, student, router]);

  if (!hydrated || !student) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-foreground/70">
        Cargando…
      </div>
    );
  }

  return <>{children}</>;
}
