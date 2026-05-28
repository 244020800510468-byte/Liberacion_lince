"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/store/session-store";

type HomeLoginLinkProps = {
  className?: string;
  onNavigate?: () => void;
};

/** Enlace para volver al menú de selección de rol (inicio de sesión) */
export function HomeLoginLink({ className = "", onNavigate }: HomeLoginLinkProps) {
  const router = useRouter();
  const logoutStudent = useSessionStore((s) => s.logoutStudent);
  const logoutAdmin = useSessionStore((s) => s.logoutAdmin);
  const student = useSessionStore((s) => s.student);
  const admin = useSessionStore((s) => s.admin);

  function handleClick() {
    if (student) logoutStudent();
    if (admin) logoutAdmin();
    onNavigate?.();
    router.push("/");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-stone-400 bg-[#dfd6c8] px-4 py-2.5 text-sm font-semibold text-stone-900 transition-all duration-200 hover:scale-[1.02] hover:bg-[#cfc6b8] active:scale-[0.98] ${className}`}
    >
      <span aria-hidden>🏠</span>
      Ir al menú de inicio de sesión
    </button>
  );
}

type BackToHomeLinkProps = {
  className?: string;
};

/** Enlace simple para pantallas de login / recuperación */
export function BackToHomeLink({ className = "" }: BackToHomeLinkProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center justify-center gap-2 text-sm font-medium text-[#15803d] underline-offset-2 transition hover:text-[#16a34a] hover:underline ${className}`}
    >
      <span aria-hidden>←</span>
      Volver al menú de inicio de sesión
    </Link>
  );
}
