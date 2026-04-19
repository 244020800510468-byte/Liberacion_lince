import Link from "next/link";

export function RoleSelector() {
  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-10 px-4">
      <header className="text-center">
        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          LIBERACION LINCE
        </h1>
        <p className="mt-3 text-lg text-foreground/80">¿Qué eres?</p>
      </header>

      <div className="grid w-full gap-6 sm:grid-cols-2">
        <Link
          href="/login/admin"
          className="group flex min-h-[140px] flex-col items-center justify-center gap-3 rounded-3xl border-2 border-lince-accent bg-lince-card px-6 py-8 text-center shadow-md transition hover:scale-[1.02] hover:shadow-lg"
        >
          <span className="text-4xl" aria-hidden>
            👤
          </span>
          <span className="text-lg font-bold text-foreground">Admin - Asesor</span>
        </Link>
        <Link
          href="/login/estudiante"
          className="group flex min-h-[140px] flex-col items-center justify-center gap-3 rounded-3xl border-2 border-lince-accent bg-lince-card px-6 py-8 text-center shadow-md transition hover:scale-[1.02] hover:shadow-lg"
        >
          <span className="text-4xl" aria-hidden>
            👤
          </span>
          <span className="text-lg font-bold text-foreground">Estudiante</span>
        </Link>
      </div>
    </div>
  );
}
