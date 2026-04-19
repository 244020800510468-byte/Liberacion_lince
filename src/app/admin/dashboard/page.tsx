"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ErrorMessage } from "@/components/ErrorMessage";
import { SuccessMessage } from "@/components/SuccessMessage";
import { getDepartmentDisplayName } from "@/lib/departments";
import { useSessionStore } from "@/store/session-store";

export default function AdminDashboardPage() {
  const router = useRouter();
  const admin = useSessionStore((s) => s.admin);
  const liberarMatricula = useSessionStore((s) => s.liberarMatricula);
  const logoutAdmin = useSessionStore((s) => s.logoutAdmin);

  const [matricula, setMatricula] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const deptName = admin ? getDepartmentDisplayName(admin.departamento) : "";

  function handleLiberar() {
    setError(null);
    setSuccess(null);
    if (!admin) return;
    const trimmed = matricula.trim();
    if (!trimmed) {
      setError("No se encontró una matrícula vinculada, Intente de nuevo");
      return;
    }
    const result = liberarMatricula(trimmed, admin.departamento);
    if (result === "not_found") {
      setError("No se encontró una matrícula vinculada, Intente de nuevo");
      return;
    }
    if (result === "already") {
      setError("¡Atención!, Esa matrícula ya fue liberada, intente con otra");
      return;
    }
    setSuccess(`Se liberó la matrícula ${trimmed}`);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col px-4 py-10 text-white">
      <header className="mb-8 text-center">
        <h1 className="text-xl font-black sm:text-2xl">
          Bienvenido, Dpto de {deptName}
        </h1>
        <p className="mt-4 text-sm font-medium text-white/95">
          Ingrese la matrícula del estudiante que desea liberar
        </p>
      </header>

      <div className="flex flex-1 flex-col items-center gap-4">
        <span className="text-2xl" aria-hidden>
          ↓
        </span>
        <input
          value={matricula}
          onChange={(e) => {
            setMatricula(e.target.value);
            if (error) setError(null);
            if (success) setSuccess(null);
          }}
          placeholder="Matrícula"
          className="w-full max-w-sm rounded-xl border border-white/50 bg-white/95 px-3 py-2.5 text-center text-foreground outline-none ring-white focus:ring-2"
        />
        <span className="text-2xl" aria-hidden>
          ↓
        </span>
        <button
          type="button"
          onClick={handleLiberar}
          className="w-full max-w-sm rounded-xl bg-lince-primary py-3 text-sm font-bold text-[#FAFAFA] shadow transition hover:brightness-95"
        >
          Liberar Matrícula
        </button>

        <ErrorMessage message={error} className="text-center" />
        <SuccessMessage message={success} className="text-center" />

        <button
          type="button"
          onClick={() => {
            logoutAdmin();
            router.push("/");
          }}
          className="mt-auto inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20"
        >
          <span aria-hidden>←</span> Salir
        </button>
      </div>
    </div>
  );
}
