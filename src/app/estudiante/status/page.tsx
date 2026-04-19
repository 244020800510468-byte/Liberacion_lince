"use client";

import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/AuthCard";
import { StatusBadge } from "@/components/StatusBadge";
import { DASHBOARD_DEPT_ORDER } from "@/lib/departments";
import { useSessionStore } from "@/store/session-store";

export default function EstudianteStatusPage() {
  const router = useRouter();
  const student = useSessionStore((s) => s.student);
  const getLiberaciones = useSessionStore((s) => s.getLiberacionesForMatricula);
  const logoutStudent = useSessionStore((s) => s.logoutStudent);

  const lib = student
    ? getLiberaciones(student.matricula)
    : undefined;

  const allReleased =
    lib &&
    DASHBOARD_DEPT_ORDER.every(({ key }) => lib[key]);

  const anyPending = lib && !allReleased;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-4 py-10">
      <AuthCard className="max-w-lg">
        <div className="flex flex-col gap-6">
          <h1 className="text-center text-2xl font-black tracking-tight text-foreground">
            LIBERACION LINCE
          </h1>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {DASHBOARD_DEPT_ORDER.map(({ key, label }) => (
              <StatusBadge
                key={key}
                label={label}
                released={lib ? Boolean(lib[key]) : false}
              />
            ))}
          </div>

          {anyPending ? (
            <p className="rounded-2xl border border-lince-accent/60 bg-white/50 px-4 py-3 text-center text-sm font-medium text-foreground">
              Aún no has sido liberado, espera a que tu asesor o los departamentos te firmen
            </p>
          ) : null}

          {allReleased ? (
            <p className="rounded-2xl border border-lince-primary/50 bg-white/60 px-4 py-3 text-center text-sm font-bold text-lince-primary">
              ¡FELICIDADES!, Has sido liberado y todo está en orden. Ya puedes reinscribirte
            </p>
          ) : null}

          <button
            type="button"
            onClick={() => {
              logoutStudent();
              router.push("/");
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-lince-accent bg-white/70 px-4 py-2.5 text-sm font-bold text-foreground transition hover:bg-white"
          >
            <span aria-hidden>←</span> Atrás
          </button>
        </div>
      </AuthCard>
    </div>
  );
}
