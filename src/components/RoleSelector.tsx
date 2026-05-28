import Link from "next/link";

export function RoleSelector() {
  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-10 px-4">
      <header className="text-center">
        <h1 className="text-4xl font-black tracking-widest text-stone-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] sm:text-5xl">
          LIBERACION LINCE
        </h1>
        <p className="mt-3 text-sm font-medium text-stone-600">¿Qué eres?</p>
      </header>

      <div className="grid w-full gap-6 sm:grid-cols-2">
        <Link
          href="/login/admin"
          className="group flex min-h-[148px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-[#16a34a] bg-[#dfd6c8] px-6 py-8 text-center shadow-md shadow-[#22c55e]/25 transition-all duration-300 hover:scale-[1.03] hover:border-[#15803d] hover:bg-[#d4cbbf] hover:shadow-lg hover:shadow-[#22c55e]/35 active:scale-[0.98]"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#faf8f3] text-[44px] leading-none shadow-inner ring-2 ring-[#22c55e]/35">
            👤
          </span>
          <span className="text-lg font-bold text-stone-900">Admin - Asesor</span>
        </Link>
        <Link
          href="/login/estudiante"
          className="group flex min-h-[148px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-[#16a34a] bg-[#dfd6c8] px-6 py-8 text-center shadow-md shadow-[#22c55e]/25 transition-all duration-300 hover:scale-[1.03] hover:border-[#15803d] hover:bg-[#d4cbbf] hover:shadow-lg hover:shadow-[#22c55e]/35 active:scale-[0.98]"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#faf8f3] text-[44px] leading-none shadow-inner ring-1 ring-stone-400/50">
            👤
          </span>
          <span className="text-lg font-bold text-stone-900">Estudiante</span>
        </Link>
      </div>
    </div>
  );
}
