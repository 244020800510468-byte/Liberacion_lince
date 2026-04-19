"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSessionStore } from "@/store/session-store";

export function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const admin = useSessionStore((s) => s.admin);
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
    if (!admin) router.replace("/login/admin");
  }, [hydrated, admin, router]);

  if (!hydrated || !admin) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-white/90">
        Cargando…
      </div>
    );
  }

  return <>{children}</>;
}
