"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthCard } from "@/components/AuthCard";
import { BackToHomeLink } from "@/components/HomeLoginLink";
import { ErrorMessage } from "@/components/ErrorMessage";
import { PasswordInput } from "@/components/PasswordInput";
import { mockStudent } from "@/lib/mock";
import {
  getPasswordLengthError,
  isPasswordLengthValid,
} from "@/lib/password-validation";
import { useSessionHydrated } from "@/lib/use-session-hydrated";
import { INPUT_DARK, LINK_ON_DARK } from "@/lib/ui";
import { useSessionStore } from "@/store/session-store";

export default function LoginEstudiantePage() {
  const router = useRouter();
  const storeHydrated = useSessionHydrated();
  const loginStudent = useSessionStore((s) => s.loginStudent);

  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [usuarioError, setUsuarioError] = useState<string | null>(null);
  const [contrasenaError, setContrasenaError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function validateAndSubmit() {
    if (!storeHydrated || loading) return;

    let uErr: string | null = null;
    let pErr: string | null = getPasswordLengthError(contrasena);

    if (!usuario.trim()) {
      uErr = "Ingrese su usuario.";
    }

    setUsuarioError(uErr);
    setContrasenaError(pErr);

    if (uErr || pErr) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contrasena }),
      });
      const data = (await res.json()) as {
        error?: string;
        usuario?: string;
        matricula?: string;
        nombre?: string;
      };

      if (!res.ok) {
        if (data.error?.includes("contraseña")) {
          setContrasenaError(data.error);
        } else {
          setUsuarioError(data.error ?? "Usuario incorrecto");
        }
        return;
      }

      loginStudent(data.usuario!, data.matricula!, data.nombre);
      router.push("/estudiante/status");
    } catch {
      setUsuarioError("No se pudo conectar con el servidor. Intente de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#ebe4d8] px-4 py-10 text-stone-900">
      <AuthCard>
        <div className="flex flex-col gap-6">
          <h1 className="text-center text-2xl font-black tracking-tight text-stone-900">
            LIBERACION LINCE
          </h1>

          <div className="flex flex-col gap-4">
            {usuarioError ? (
              <div
                className="animate-scale-in flex items-start gap-2 rounded-xl border border-[#EF4444]/40 bg-[#faf8f3] px-3 py-2"
                role="alert"
              >
                <span className="text-lg font-bold text-[#EF4444]" aria-hidden>
                  ✕
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#EF4444]">
                    Error
                  </p>
                  <ErrorMessage message={usuarioError} />
                </div>
              </div>
            ) : null}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="usuario" className="text-sm font-medium text-stone-800">
                Usuario
              </label>
              <input
                id="usuario"
                name="usuario"
                autoComplete="username"
                placeholder={mockStudent.usuario}
                value={usuario}
                onChange={(e) => {
                  setUsuario(e.target.value);
                  if (usuarioError) setUsuarioError(null);
                }}
                onBlur={() => {
                  if (!usuario.trim()) {
                    setUsuarioError("Ingrese su usuario.");
                  }
                }}
                className={INPUT_DARK}
              />
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
            onClick={validateAndSubmit}
            disabled={!storeHydrated || loading}
            className="w-full rounded-xl bg-[#22c55e] py-3 text-center text-sm font-bold text-white shadow transition-all duration-200 hover:scale-[1.01] hover:bg-[#4ade80] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Verificando…" : "Iniciar sesión"}
          </button>

          <div className="flex flex-col gap-2 text-center text-sm">
            <Link href="/recuperar/contrasena" className={LINK_ON_DARK}>
              ¿Olvidaste tu contraseña?
            </Link>
            <Link href="/recuperar/usuario" className={LINK_ON_DARK}>
              ¿Olvidaste tu usuario?
            </Link>
            <BackToHomeLink className="mt-1" />
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
