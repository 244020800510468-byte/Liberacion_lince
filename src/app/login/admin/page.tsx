"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthCard } from "@/components/AuthCard";
import { ErrorMessage } from "@/components/ErrorMessage";
import { PasswordInput } from "@/components/PasswordInput";
import { getDepartmentFromEmpleado } from "@/lib/departments";
import { mockAdmin } from "@/lib/mock";
import { useSessionHydrated } from "@/lib/use-session-hydrated";
import { INPUT_DARK, LINK_ON_DARK } from "@/lib/ui";
import { useSessionStore } from "@/store/session-store";

export default function LoginAdminPage() {
  const router = useRouter();
  const storeHydrated = useSessionHydrated();
  const loginAdmin = useSessionStore((s) => s.loginAdmin);

  const [nEmpleado, setNEmpleado] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [empleadoError, setEmpleadoError] = useState<string | null>(null);
  const [contrasenaError, setContrasenaError] = useState<string | null>(null);

  function submit() {
    if (!storeHydrated) return;

    const dept = getDepartmentFromEmpleado(nEmpleado.trim());
    let eErr: string | null = null;
    let pErr: string | null = null;

    if (nEmpleado.trim() !== mockAdmin.nEmpleado || !dept) {
      eErr = "No se encontró coincidencia con el usuario que ingresó, Inténtelo de nuevo";
    }
    if (contrasena !== mockAdmin.contrasena) {
      pErr = "Contraseña incorrecta, Inténtelo de nuevo";
    }

    setEmpleadoError(eErr);
    setContrasenaError(pErr);

    if (eErr || pErr || !dept) return;

    loginAdmin(mockAdmin.nEmpleado, dept);
    router.push("/admin/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#ebe4d8] px-4 py-10">
      <AuthCard>
        <div className="flex flex-col gap-6">
          <h1 className="text-center text-2xl font-black tracking-tight text-stone-900">
            Liberacion lince
          </h1>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="nempleado" className="text-sm font-medium text-stone-800">
                N. Empleado
              </label>
              <input
                id="nempleado"
                name="nEmpleado"
                value={nEmpleado}
                onChange={(e) => {
                  setNEmpleado(e.target.value);
                  if (empleadoError) setEmpleadoError(null);
                }}
                onBlur={() => {
                  const d = getDepartmentFromEmpleado(nEmpleado.trim());
                  if (nEmpleado.trim() && (!d || nEmpleado.trim() !== mockAdmin.nEmpleado)) {
                    setEmpleadoError(
                      "No se encontró coincidencia con el usuario que ingresó, Inténtelo de nuevo"
                    );
                  }
                }}
                className={INPUT_DARK}
              />
              <ErrorMessage message={empleadoError} />
            </div>

            <PasswordInput
              label="Contraseña"
              name="password"
              value={contrasena}
              onChange={(v) => {
                setContrasena(v);
                if (contrasenaError) setContrasenaError(null);
              }}
              onBlur={() => {
                if (contrasena && contrasena !== mockAdmin.contrasena) {
                  setContrasenaError("Contraseña incorrecta, Inténtelo de nuevo");
                }
              }}
              error={contrasenaError}
            />
          </div>

          {!storeHydrated ? (
            <p className="text-center text-xs text-stone-600">Cargando sesión…</p>
          ) : null}

          <button
            type="button"
            onClick={submit}
            disabled={!storeHydrated}
            className="w-full rounded-xl bg-[#22c55e] py-3 text-center text-sm font-bold text-white shadow transition hover:bg-[#4ade80] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Iniciar sesion
          </button>

          <div className="flex flex-col gap-2 text-center text-sm">
            <Link href="/recuperar/admin/contrasena" className={LINK_ON_DARK}>
              ¿Olvidaste tu contraseña?
            </Link>
            <Link href="/recuperar/admin/empleado" className={LINK_ON_DARK}>
              ¿Olvidaste tu número de empleado?
            </Link>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
