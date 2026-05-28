"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { AuthCard } from "@/components/AuthCard";
import { HomeLoginLink } from "@/components/HomeLoginLink";
import { DASHBOARD_DEPT_ORDER } from "@/lib/departments";
import { findStudentByMatricula } from "@/lib/db";
import { mockStudent } from "@/lib/mock";
import { useSessionStore } from "@/store/session-store";

function EstudianteStatusContent() {
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") === "1";

  const student = useSessionStore((s) => s.student);
  const liberacionesByMatricula = useSessionStore(
    (s) => s.liberacionesByMatricula
  );

  const matricula = isPreview ? mockStudent.matricula : student?.matricula;
  const lib = matricula ? liberacionesByMatricula[matricula] : undefined;

  const profile = useMemo(() => {
    if (!matricula) return null;
    const record = findStudentByMatricula(matricula);
    if (!record) return null;
    return {
      nombre: record.nombre,
      email: record.email,
      matricula: record.matricula,
    };
  }, [matricula]);

  const allReleased =
    lib && DASHBOARD_DEPT_ORDER.every(({ key }) => lib[key]);
  const anyPending = lib && !allReleased;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#ebe4d8] px-4 py-10 text-stone-900">
      <AuthCard className="max-w-2xl">
        <div className="flex flex-col gap-6">
          <h1 className="text-center text-2xl font-black tracking-tight text-stone-900">
            LIBERACION LINCE
          </h1>

          {isPreview ? (
            <p className="rounded-xl border border-dashed border-[#16a34a]/50 bg-[#e8e2d6] px-3 py-2 text-center text-xs font-medium text-stone-600">
              Vista previa (demo) — sin sesión
            </p>
          ) : null}

          {profile ? (
            <div className="animate-scale-in overflow-hidden rounded-xl border border-stone-400 bg-[#d4cbbf]">
              <table className="w-full text-left text-sm">
                <tbody>
                  <tr className="border-b border-stone-400">
                    <th className="w-1/3 px-3 py-2 font-medium text-stone-600">Nombre</th>
                    <td className="px-3 py-2 text-stone-900">{profile.nombre}</td>
                  </tr>
                  <tr className="border-b border-stone-400">
                    <th className="px-3 py-2 font-medium text-stone-600">Correo</th>
                    <td className="break-all px-3 py-2 text-stone-800">{profile.email}</td>
                  </tr>
                  <tr>
                    <th className="px-3 py-2 font-medium text-stone-600">Matrícula</th>
                    <td className="px-3 py-2 font-mono text-stone-800">{profile.matricula}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : null}

          <div>
            <h2 className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-[#15803d]">
              Estado por departamento
            </h2>
            <div className="overflow-hidden rounded-xl border border-stone-400">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-400 bg-[#d4cbbf] text-stone-600">
                    <th className="px-3 py-2 font-medium">Departamento</th>
                    <th className="px-3 py-2 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {DASHBOARD_DEPT_ORDER.map(({ key, label }, index) => {
                    const ok = lib ? Boolean(lib[key]) : false;
                    return (
                      <tr
                        key={key}
                        className="animate-slide-up border-b border-stone-400/90 bg-[#ebe4d8] last:border-0"
                        style={{ animationDelay: `${index * 40}ms` }}
                      >
                        <td className="px-3 py-2.5 text-stone-800">{label}</td>
                        <td className="px-3 py-2.5">
                          {ok ? (
                            <span className="font-medium text-[#16a34a] transition-all duration-300">
                              ✅ Liberado
                            </span>
                          ) : (
                            <span className="text-stone-600">❌ Pendiente</span>
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
            <p className="animate-pulse-soft rounded-2xl border border-[#22c55e]/35 bg-[#d4cbbf] px-4 py-3 text-center text-sm font-medium text-stone-800">
              Aún no has sido liberado, espera a que tu asesor o los departamentos te firmen
            </p>
          ) : null}

          {allReleased ? (
            <p className="animate-scale-in rounded-2xl border border-[#16a34a]/45 bg-[#d4cbbf] px-4 py-3 text-center text-sm font-bold text-[#15803d]">
              ¡FELICIDADES!, Has sido liberado y todo está en orden. Ya puedes reinscribirte
            </p>
          ) : null}

          <HomeLoginLink className="w-full" />
        </div>
      </AuthCard>
    </div>
  );
}

export default function EstudianteStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#ebe4d8] text-stone-600">
          Cargando…
        </div>
      }
    >
      <EstudianteStatusContent />
    </Suspense>
  );
}
