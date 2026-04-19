"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ErrorMessage } from "@/components/ErrorMessage";
import { SuccessMessage } from "@/components/SuccessMessage";
import {
  DASHBOARD_DEPT_ORDER,
  getDepartmentDisplayName,
} from "@/lib/departments";
import type { DepartmentKey } from "@/lib/types";
import { mockStudent } from "@/lib/mock";
import { useSessionStore } from "@/store/session-store";

export default function AdminDashboardPage() {
  const router = useRouter();
  const admin = useSessionStore((s) => s.admin);
  const liberarMatricula = useSessionStore((s) => s.liberarMatricula);
  const liberacionesByMatricula = useSessionStore(
    (s) => s.liberacionesByMatricula
  );
  const registerMatriculaIfKnown = useSessionStore(
    (s) => s.registerMatriculaIfKnown
  );
  const logoutAdmin = useSessionStore((s) => s.logoutAdmin);

  const isAsesor = admin?.departamento === "asesor";

  const [matricula, setMatricula] = useState<string>(mockStudent.matricula);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [buscado, setBuscado] = useState(false);
  const [matriculaActiva, setMatriculaActiva] = useState<string | null>(null);

  const deptName = admin ? getDepartmentDisplayName(admin.departamento) : "";

  const lib =
    matriculaActiva != null
      ? liberacionesByMatricula[matriculaActiva]
      : undefined;

  const pendientes =
    lib &&
    DASHBOARD_DEPT_ORDER.filter(({ key }) => !lib[key]).map((d) => ({
      ...d,
    }));

  const todosLiberados =
    lib && DASHBOARD_DEPT_ORDER.every(({ key }) => lib[key]);

  function handleBuscarAsesor() {
    setError(null);
    setSuccess(null);
    const trimmed = matricula.trim();
    if (!trimmed) {
      setError("Ingrese una matrícula para buscar.");
      setBuscado(false);
      setMatriculaActiva(null);
      return;
    }
    const known = registerMatriculaIfKnown(trimmed);
    if (!known) {
      setError("No se encontró una matrícula vinculada, Intente de nuevo");
      setBuscado(false);
      setMatriculaActiva(null);
      return;
    }
    setBuscado(true);
    setMatriculaActiva(trimmed);
  }

  function liberarDeptoAsesor(dept: DepartmentKey, label: string) {
    if (!matriculaActiva || !admin) return;
    setError(null);
    setSuccess(null);
    const result = liberarMatricula(matriculaActiva, dept);
    if (result === "not_found") {
      setError("No se encontró una matrícula vinculada, Intente de nuevo");
      return;
    }
    if (result === "already") {
      setError("¡Atención!, Esa matrícula ya fue liberada, intente con otra");
      return;
    }
    setSuccess(
      `Se liberó el departamento ${label} para la matrícula ${matriculaActiva}`
    );
  }

  function handleLiberarOtroRol() {
    setError(null);
    setSuccess(null);
    if (!admin) return;
    const trimmed = matricula.trim();
    if (!trimmed) {
      setError("No se encontró una matrícula vinculada, Intente de nuevo");
      return;
    }
    if (!registerMatriculaIfKnown(trimmed)) {
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
    setSuccess(
      `Se liberó el departamento ${deptName} para la matrícula ${trimmed}`
    );
  }

  function handleAceptarCompleto() {
    if (!matriculaActiva) return;
    setError(null);
    setSuccess(
      `Registro aceptado: la matrícula ${matriculaActiva} tiene todos los departamentos liberados.`
    );
    setMatriculaActiva(null);
    setBuscado(false);
  }

  const titulo = isAsesor
    ? "Bienvenido, Asesor"
    : `Bienvenido, Dpto de ${deptName}`;

  return (
    <div className="min-h-screen bg-[#1e1e1e] px-4 py-8 text-white">
      <div className="mx-auto flex max-w-lg flex-col gap-6">
        <header className="text-center">
          <h1 className="text-xl font-bold text-[#A6E22E] sm:text-2xl">{titulo}</h1>
          <p className="mt-3 text-sm text-neutral-300">
            {isAsesor
              ? "Busque una matrícula para ver departamentos pendientes y liberarlos."
              : "Ingrese la matrícula del estudiante que desea liberar en su departamento."}
          </p>
        </header>

        <div className="rounded-2xl border border-[#A6E22E]/40 bg-[#3a3a3a] p-6 shadow-xl">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wide text-[#A6E22E]/90">
            {deptName}
          </p>

          {isAsesor ? (
            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium text-neutral-200">
                Matrícula del estudiante
              </label>
              <input
                value={matricula}
                onChange={(e) => {
                  setMatricula(e.target.value);
                  if (error) setError(null);
                  if (success) setSuccess(null);
                }}
                placeholder={mockStudent.matricula}
                className="w-full rounded-xl border border-neutral-600 bg-[#2d2d2d] px-3 py-2.5 text-center font-mono text-white outline-none transition focus:border-[#5FAF2E] focus:ring-2 focus:ring-[#5FAF2E]/40"
              />
              <button
                type="button"
                onClick={handleBuscarAsesor}
                className="w-full rounded-xl bg-[#5FAF2E] py-3 text-sm font-bold text-[#FAFAFA] transition hover:bg-[#A6E22E]"
              >
                Buscar
              </button>

              <ErrorMessage
                message={error}
                className="text-center text-[#EF4444]"
              />
              <SuccessMessage
                message={success}
                variant="admin"
                className="text-center"
              />

              {buscado && matriculaActiva ? (
                <div className="mt-2 flex flex-col gap-4 border-t border-white/10 pt-5">
                  <p className="text-center text-sm font-semibold text-[#A6E22E]">
                    ✓ Matrícula encontrada
                  </p>
                  <div className="rounded-xl bg-[#2d2d2d]/80 px-4 py-3 text-center">
                    <p className="text-sm font-semibold text-white">
                      {mockStudent.nombre}
                    </p>
                    <p className="text-xs text-neutral-400">{mockStudent.email}</p>
                    <p className="mt-1 font-mono text-xs text-neutral-500">
                      {matriculaActiva}
                    </p>
                  </div>

                  {todosLiberados ? (
                    <div className="flex flex-col gap-4 rounded-xl border border-[#A6E22E]/40 bg-[#2d2d2d] px-4 py-4">
                      <p className="text-center text-sm font-medium text-[#A6E22E]">
                        Todos los departamentos están liberados para esta matrícula.
                      </p>
                      <ul className="flex flex-col gap-2 text-sm text-neutral-300">
                        {DASHBOARD_DEPT_ORDER.map(({ key, label }) => (
                          <li
                            key={key}
                            className="flex items-center justify-between rounded-lg border border-neutral-600/80 bg-[#1e1e1e] px-3 py-2"
                          >
                            <span>{label}</span>
                            <span className="text-[#A6E22E]" aria-hidden>
                              ✅
                            </span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-center text-xs text-neutral-500">
                        Puede confirmar el registro con Aceptar o buscar otra matrícula.
                      </p>
                      <button
                        type="button"
                        onClick={handleAceptarCompleto}
                        className="w-full rounded-xl bg-[#5FAF2E] py-3 text-sm font-bold text-[#FAFAFA] transition hover:bg-[#A6E22E]"
                      >
                        Aceptar
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-neutral-300">
                        Departamentos pendientes
                      </p>
                      {pendientes && pendientes.length > 0 ? (
                        <ul className="flex flex-col gap-3">
                          {pendientes.map(({ key, label }) => (
                            <li
                              key={key}
                              className="flex items-center justify-between gap-3 rounded-xl border border-neutral-600 bg-[#2d2d2d] px-3 py-3"
                            >
                              <span className="flex items-center gap-2 text-sm font-medium text-neutral-200">
                                <span aria-hidden>❌</span>
                                {label}
                              </span>
                              <button
                                type="button"
                                onClick={() => liberarDeptoAsesor(key, label)}
                                className="shrink-0 rounded-lg bg-[#5FAF2E] px-3 py-1.5 text-xs font-bold text-[#FAFAFA] transition hover:bg-[#A6E22E]"
                              >
                                Liberar
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </>
                  )}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <span className="text-center text-2xl text-neutral-400" aria-hidden>
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
                className="w-full rounded-xl border border-neutral-600 bg-[#2d2d2d] px-3 py-2.5 text-center font-mono text-white outline-none transition focus:border-[#5FAF2E] focus:ring-2 focus:ring-[#5FAF2E]/40"
              />
              <span className="text-center text-2xl text-neutral-400" aria-hidden>
                ↓
              </span>
              <button
                type="button"
                onClick={handleLiberarOtroRol}
                className="w-full rounded-xl bg-[#5FAF2E] py-3 text-sm font-bold text-[#FAFAFA] transition hover:bg-[#A6E22E]"
              >
                Liberar Matrícula
              </button>

              <ErrorMessage
                message={error}
                className="text-center text-[#EF4444]"
              />
              <SuccessMessage
                message={success}
                variant="admin"
                className="text-center"
              />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            logoutAdmin();
            router.push("/");
          }}
          className="mx-auto inline-flex items-center gap-2 rounded-xl border border-neutral-600 bg-[#2d2d2d] px-4 py-2.5 text-sm font-semibold text-neutral-200 transition hover:bg-[#333]"
        >
          <span aria-hidden>←</span> Salir
        </button>
      </div>
    </div>
  );
}
