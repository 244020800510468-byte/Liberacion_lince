import type { ReactNode } from "react";

type AuthCardProps = {
  children: ReactNode;
  className?: string;
};

/** Card unificada — mismo estilo que el panel asesor (#3a3a3a) */
export function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <div
      className={`w-full max-w-md rounded-3xl border border-[#A6E22E]/40 bg-[#3a3a3a] px-6 py-8 text-neutral-100 shadow-xl sm:px-10 sm:py-10 ${className}`}
    >
      {children}
    </div>
  );
}
