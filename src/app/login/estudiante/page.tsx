"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthCard } from "@/components/AuthCard";
import { ErrorMessage } from "@/components/ErrorMessage";
import { PasswordInput } from "@/components/PasswordInput";
import { mockStudent } from "@/lib/mock";
import { useSessionStore } from "@/store/session-store";

export default function LoginEstudiantePage() {
  const router = useRouter();
  const loginStudent = useSessionStore((s) => s.loginStudent);

  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [usuarioError, setUsuarioError] = useState<string | null>(null);
  const [contrasenaError, setContrasenaError] = useState<string | null>(null);

  function validateAndSubmit() {
    let uErr: string | null = null;
    let pErr: string | null = null;

    if (usuario.trim() !== mockStudent.usuario) {
      uErr = "usuario incorrecto";
    }
    if (contrasena !== mockStudent.contrasena) {
      pErr = "Contraseña incorrecta";
    }

    setUsuarioError(uErr);
    setContrasenaError(pErr);

    if (uErr || pErr) return;

    loginStudent(mockStudent.usuario, mockStudent.matricula);
    router.push("/estudiante/status");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-4 py-10">
      <AuthCard>
        <div className="flex flex-col gap-6">
          <h1 className="text-center text-2xl font-black tracking-tight text-foreground">
            LIBERACION LINCE
          </h1>

          <div className="flex flex-col gap-4">
            {usuarioError ? (
              <div
                className="flex items-start gap-2 rounded-xl border border-[#EF4444]/40 bg-white/70 px-3 py-2"
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
              <label htmlFor="usuario" className="text-sm font-medium text-foreground/90">
                Usuario
              </label>
              <input
                id="usuario"
                name="usuario"
                autoComplete="username"
                value={usuario}
                onChange={(e) => {
                  setUsuario(e.target.value);
                  if (usuarioError) setUsuarioError(null);
                }}
                onBlur={() => {
                  if (usuario.trim() && usuario.trim() !== mockStudent.usuario) {
                    setUsuarioError("usuario incorrecto");
                  }
                }}
                className="w-full rounded-xl border border-neutral-300 bg-white/90 px-3 py-2.5 text-foreground outline-none ring-lince-accent focus:border-lince-accent focus:ring-2"
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
                if (contrasena && contrasena !== mockStudent.contrasena) {
                  setContrasenaError("Contraseña incorrecta");
                }
              }}
              error={contrasenaError}
            />
          </div>

          <button
            type="button"
            onClick={validateAndSubmit}
            className="w-full rounded-xl bg-lince-primary py-3 text-center text-sm font-bold text-[#FAFAFA] shadow transition hover:brightness-95"
          >
            Iniciar sesión
          </button>

          <div className="flex flex-col gap-2 text-center text-sm">
            <Link href="/recuperar/contrasena" className="font-medium text-lince-blue hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
            <Link href="/recuperar/usuario" className="font-medium text-lince-blue hover:underline">
              ¿Olvidaste tu usuario?
            </Link>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
