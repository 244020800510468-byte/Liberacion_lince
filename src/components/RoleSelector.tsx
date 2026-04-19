import Link from "next/link";

export function RoleSelector() {
  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-10 px-4">
      <header className="text-center">
        <h1 className="text-4xl font-black tracking-widest text-neutral-100 drop-shadow-[0_2px_12px_rgba(166,226,46,0.15)] sm:text-5xl">
          LIBERACION LINCE
        </h1>
        <p className="mt-3 text-sm font-medium text-neutral-400">¿Qué eres?</p>
      </header>

      <div className="grid w-full gap-6 sm:grid-cols-2">
        <Link
          href="/login/admin"
          className="group flex min-h-[148px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-[#5FAF2E] bg-gradient-to-br from-[#A6E22E] to-[#CFEA8A] px-6 py-8 text-center shadow-lg shadow-[#5FAF2E]/30 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-[#5FAF2E]/40"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/55 text-[44px] leading-none shadow-inner">
            👤
          </span>
          <span className="text-lg font-bold text-[#1a1a1a]">Admin - Asesor</span>
        </Link>
        <Link
          href="/login/estudiante"
          className="group flex min-h-[148px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-[#5FAF2E] bg-gradient-to-br from-[#A6E22E] to-[#CFEA8A] px-6 py-8 text-center shadow-lg shadow-[#5FAF2E]/30 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-[#5FAF2E]/40"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/55 text-[44px] leading-none shadow-inner">
            👤
          </span>
          <span className="text-lg font-bold text-[#1a1a1a]">Estudiante</span>
        </Link>
      </div>
    </div>
  );
}
