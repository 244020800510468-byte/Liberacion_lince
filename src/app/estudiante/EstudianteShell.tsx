"use client";

import { useSearchParams } from "next/navigation";
import { StudentRouteGuard } from "@/components/StudentRouteGuard";

export function EstudianteShell({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") === "1";

  if (isPreview) {
    return <>{children}</>;
  }

  return <StudentRouteGuard>{children}</StudentRouteGuard>;
}
