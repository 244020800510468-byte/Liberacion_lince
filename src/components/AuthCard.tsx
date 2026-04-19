import type { ReactNode } from "react";

type AuthCardProps = {
  children: ReactNode;
  className?: string;
  variant?: "student" | "admin";
};

export function AuthCard({ children, className = "", variant = "student" }: AuthCardProps) {
  const bg =
    variant === "admin" ? "bg-lince-admin" : "bg-lince-card";
  return (
    <div
      className={`w-full max-w-md rounded-3xl border-2 border-lince-accent/40 px-6 py-8 shadow-lg sm:px-10 sm:py-10 ${bg} ${className}`}
    >
      {children}
    </div>
  );
}
