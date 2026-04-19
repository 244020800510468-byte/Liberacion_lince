import { Suspense } from "react";
import { EstudianteShell } from "./EstudianteShell";

export default function EstudianteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center bg-[#1e1e1e] text-neutral-400">
          Cargando…
        </div>
      }
    >
      <EstudianteShell>{children}</EstudianteShell>
    </Suspense>
  );
}
