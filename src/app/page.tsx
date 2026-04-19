import Image from "next/image";
import Link from "next/link";
import { RoleSelector } from "@/components/RoleSelector";

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-1 flex-col items-center justify-center overflow-hidden px-4 pb-24 pt-12">
      <div
        className="pointer-events-none absolute inset-0 bg-[#1e1e1e]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(207, 234, 138, 0.12) 1.2px, transparent 1.2px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden
      />

      <div className="pointer-events-none absolute left-3 top-3 z-10 sm:left-5 sm:top-5">
        <Image
          src="/liberacion-linces-logo.png"
          alt=""
          width={200}
          height={112}
          priority
          className="h-auto w-[min(42vw,9.5rem)] max-w-[152px] select-none opacity-95 drop-shadow-md sm:w-40 sm:max-w-[168px]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center pt-10 sm:pt-8">
        <RoleSelector />
        <footer className="mt-14 text-center text-sm text-neutral-500">
          CECYTEBC © 2025
        </footer>
      </div>

      <Link
        href="/estudiante/status?preview=1"
        className="fixed bottom-5 right-5 z-20 flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full border border-neutral-600 bg-[#2d2d2d]/95 px-3 py-2 text-xs font-medium text-neutral-300 shadow-lg backdrop-blur-sm transition hover:border-[#5FAF2E]/50 hover:bg-[#3a3a3a] hover:text-neutral-100 sm:text-sm"
        title="Vista previa del estado de liberación (sin iniciar sesión)"
      >
        <span className="text-base" aria-hidden>
          👁
        </span>
        <span className="hidden sm:inline">Vista rápida estudiante</span>
        <span className="sm:hidden">Vista rápida</span>
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
