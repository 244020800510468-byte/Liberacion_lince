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
        <div className="flex min-h-[50vh] items-center justify-center bg-[#ebe4d8] text-stone-600">
          Cargando…
        </div>
      }
    >
      <EstudianteShell>{children}</EstudianteShell>
    </Suspense>
  );
}
