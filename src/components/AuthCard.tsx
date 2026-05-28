import type { ReactNode } from "react";

type AuthCardProps = {
  children: ReactNode;
  className?: string;
};

/** Card unificada — superficie beige */
export function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <div
      className={`animate-slide-up w-full max-w-md rounded-3xl border border-[#16a34a]/45 bg-[#dfd6c8] px-6 py-8 text-stone-900 shadow-xl transition-shadow duration-300 hover:shadow-2xl sm:px-10 sm:py-10 ${className}`}
    >
      {children}
    </div>
  );
}
