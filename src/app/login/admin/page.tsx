"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthCard } from "@/components/AuthCard";
import { BackToHomeLink } from "@/components/HomeLoginLink";
import { ErrorMessage } from "@/components/ErrorMessage";
import { PasswordInput } from "@/components/PasswordInput";
import { staffDb } from "@/lib/mock";
import {
  getPasswordLengthError,
  isPasswordLengthValid,
} from "@/lib/password-validation";
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
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!storeHydrated || loading) return;

    let eErr: string | null = null;
    let pErr: string | null = getPasswordLengthError(contrasena);

    if (!nEmpleado.trim()) {
      eErr = "Ingrese su número de empleado.";
    }

    setEmpleadoError(eErr);
    setContrasenaError(pErr);

    if (eErr || pErr) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nEmpleado, contrasena }),
      });
      const data = (await res.json()) as {
        error?: string;
        nEmpleado?: string;
        departamento?: import("@/lib/types").DepartmentKey;
        nombre?: string;
      };

      if (!res.ok) {
        if (data.error?.toLowerCase().includes("contraseña")) {
          setContrasenaError(data.error);
        } else {
          setEmpleadoError(
            data.error ??
              "No se encontró coincidencia con el usuario que ingresó, Inténtelo de nuevo"
          );
        }
        return;
      }

      loginAdmin(data.nEmpleado!, data.departamento!, data.nombre);
      router.push("/admin/dashboard");
    } catch {
      setEmpleadoError("No se pudo conectar con el servidor. Intente de nuevo.");
    } finally {
      setLoading(false);
    }
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
                placeholder={staffDb[0].nEmpleado}
                value={nEmpleado}
                onChange={(e) => {
                  setNEmpleado(e.target.value);
                  if (empleadoError) setEmpleadoError(null);
                }}
                onBlur={() => {
                  if (!nEmpleado.trim()) {
                    setEmpleadoError("Ingrese su número de empleado.");
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
                if (contrasena && !isPasswordLengthValid(contrasena)) {
                  setContrasenaError(getPasswordLengthError(contrasena));
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
            disabled={!storeHydrated || loading}
            className="w-full rounded-xl bg-[#22c55e] py-3 text-center text-sm font-bold text-white shadow transition-all duration-200 hover:scale-[1.01] hover:bg-[#4ade80] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Verificando…" : "Iniciar sesion"}
          </button>

          <div className="flex flex-col gap-2 text-center text-sm">
            <Link href="/recuperar/admin/contrasena" className={LINK_ON_DARK}>
              ¿Olvidaste tu contraseña?
            </Link>
            <Link href="/recuperar/admin/empleado" className={LINK_ON_DARK}>
              ¿Olvidaste tu número de empleado?
            </Link>
            <BackToHomeLink className="mt-1" />
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
