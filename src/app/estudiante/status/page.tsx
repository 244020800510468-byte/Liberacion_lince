"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { AuthCard } from "@/components/AuthCard";
import { DASHBOARD_DEPT_ORDER } from "@/lib/departments";
import { mockStudent } from "@/lib/mock";
import { useSessionStore } from "@/store/session-store";

function EstudianteStatusContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") === "1";

  const student = useSessionStore((s) => s.student);
  const liberacionesByMatricula = useSessionStore(
    (s) => s.liberacionesByMatricula
  );
  const logoutStudent = useSessionStore((s) => s.logoutStudent);

  const matricula = isPreview ? mockStudent.matricula : student?.matricula;
  const lib = matricula ? liberacionesByMatricula[matricula] : undefined;

  const profile = useMemo(() => {
    if (!matricula) return null;
    return {
      nombre: mockStudent.nombre,
      email: mockStudent.email,
      matricula: mockStudent.matricula,
    };
  }, [matricula]);

  const allReleased =
    lib && DASHBOARD_DEPT_ORDER.every(({ key }) => lib[key]);
  const anyPending = lib && !allReleased;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1e1e1e] px-4 py-10 text-neutral-100">
      <AuthCard className="max-w-2xl">
        <div className="flex flex-col gap-6">
          <h1 className="text-center text-2xl font-black tracking-tight text-neutral-100">
            LIBERACION LINCE
          </h1>

          {isPreview ? (
            <p className="rounded-xl border border-dashed border-[#A6E22E]/50 bg-[#2d2d2d] px-3 py-2 text-center text-xs font-medium text-neutral-400">
              Vista previa (demo) — sin sesión
            </p>
          ) : null}

          {profile ? (
            <div className="overflow-hidden rounded-xl border border-neutral-600 bg-[#2d2d2d]">
              <table className="w-full text-left text-sm">
                <tbody>
                  <tr className="border-b border-neutral-600">
                    <th className="w-1/3 px-3 py-2 font-medium text-neutral-400">Nombre</th>
                    <td className="px-3 py-2 text-neutral-100">{profile.nombre}</td>
                  </tr>
                  <tr className="border-b border-neutral-600">
                    <th className="px-3 py-2 font-medium text-neutral-400">Correo</th>
                    <td className="break-all px-3 py-2 text-neutral-200">{profile.email}</td>
                  </tr>
                  <tr>
                    <th className="px-3 py-2 font-medium text-neutral-400">Matrícula</th>
                    <td className="px-3 py-2 font-mono text-neutral-200">{profile.matricula}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : null}

          <div>
            <h2 className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-[#A6E22E]">
              Estado por departamento
            </h2>
            <div className="overflow-hidden rounded-xl border border-neutral-600">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-600 bg-[#2d2d2d] text-neutral-400">
                    <th className="px-3 py-2 font-medium">Departamento</th>
                    <th className="px-3 py-2 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {DASHBOARD_DEPT_ORDER.map(({ key, label }) => {
                    const ok = lib ? Boolean(lib[key]) : false;
                    return (
                      <tr key={key} className="border-b border-neutral-700/90 last:border-0">
                        <td className="px-3 py-2.5 text-neutral-200">{label}</td>
                        <td className="px-3 py-2.5">
                          {ok ? (
                            <span className="font-medium text-[#A6E22E]">✅ Liberado</span>
                          ) : (
                            <span className="text-neutral-400">❌ Pendiente</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {anyPending ? (
            <p className="rounded-2xl border border-[#A6E22E]/30 bg-[#2d2d2d] px-4 py-3 text-center text-sm font-medium text-neutral-300">
              Aún no has sido liberado, espera a que tu asesor o los departamentos te firmen
            </p>
          ) : null}

          {allReleased ? (
            <p className="rounded-2xl border border-[#5FAF2E]/40 bg-[#2d2d2d] px-4 py-3 text-center text-sm font-bold text-[#A6E22E]">
              ¡FELICIDADES!, Has sido liberado y todo está en orden. Ya puedes reinscribirte
            </p>
          ) : null}

          <button
            type="button"
            onClick={() => {
              if (!isPreview) {
                logoutStudent();
              }
              router.push("/");
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-600 bg-[#2d2d2d] px-4 py-2.5 text-sm font-bold text-neutral-100 transition hover:bg-[#333]"
          >
            <span aria-hidden>←</span> Atrás
          </button>
        </div>
      </AuthCard>
    </div>
  );
}

export default function EstudianteStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#1e1e1e] text-neutral-400">
          Cargando…
        </div>
      }
    >
      <EstudianteStatusContent />
    </Suspense>
  );
}
