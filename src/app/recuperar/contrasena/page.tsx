"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthCard } from "@/components/AuthCard";
import { CountdownButton } from "@/components/CountdownButton";
import { ErrorMessage } from "@/components/ErrorMessage";
import { mockStudent, MOCK_RECOVERY_CODE } from "@/lib/mock";

export default function RecuperarContrasenaPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [codigoError, setCodigoError] = useState<string | null>(null);

  function onSiguiente() {
    let eErr: string | null = null;
    let cErr: string | null = null;

    if (email.trim().toLowerCase() !== mockStudent.email.toLowerCase()) {
      eErr = "El correo que se ingresó no coincide o no existe, Inténtelo de nuevo";
    }
    if (!codigo.trim() || codigo.trim() !== MOCK_RECOVERY_CODE) {
      cErr = "El código es incorrecto o no se ingresó, por favor revisa e inténtalo de nuevo";
    }

    setEmailError(eErr);
    setCodigoError(cErr);
    if (eErr || cErr) return;

    router.push("/recuperar/nueva-contrasena");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-4 py-10">
      <AuthCard>
        <div className="flex flex-col gap-6">
          <h1 className="text-center text-2xl font-black text-foreground">Liberación Lince</h1>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground/90">
              Hola!, Ingresa tu correo de recuperación
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError(null);
              }}
              onBlur={() => {
                if (
                  email.trim() &&
                  email.trim().toLowerCase() !== mockStudent.email.toLowerCase()
                ) {
                  setEmailError(
                    "El correo que se ingresó no coincide o no existe, Inténtelo de nuevo"
                  );
                }
              }}
              className="w-full rounded-xl border border-neutral-300 bg-white/90 px-3 py-2.5 text-foreground outline-none ring-lince-accent focus:border-lince-accent focus:ring-2"
            />
            <ErrorMessage message={emailError} />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <CountdownButton
              durationSec={120}
              onClick={() => {
                if (email.trim().toLowerCase() !== mockStudent.email.toLowerCase()) {
                  setEmailError(
                    "El correo que se ingresó no coincide o no existe, Inténtelo de nuevo"
                  );
                } else {
                  setEmailError(null);
                }
              }}
              className="bg-lince-primary hover:brightness-95"
            >
              Enviar código
            </CountdownButton>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="codigo" className="text-sm font-medium text-foreground/90">
              Ingresa el código recibido
            </label>
            <input
              id="codigo"
              value={codigo}
              onChange={(e) => {
                setCodigo(e.target.value);
                if (codigoError) setCodigoError(null);
              }}
              onBlur={() => {
                if (!codigo.trim() || codigo.trim() !== MOCK_RECOVERY_CODE) {
                  setCodigoError(
                    "El código es incorrecto o no se ingresó, por favor revisa e inténtalo de nuevo"
                  );
                }
              }}
              className="w-full rounded-xl border border-neutral-300 bg-white/90 px-3 py-2.5 text-foreground outline-none ring-lince-accent focus:border-lince-accent focus:ring-2"
            />
            <ErrorMessage message={codigoError} />
          </div>

          <button
            type="button"
            onClick={onSiguiente}
            className="w-full rounded-xl bg-lince-primary py-3 text-sm font-bold text-[#FAFAFA] shadow transition hover:brightness-95"
          >
            Siguiente...
          </button>

          <p className="text-center text-sm">
            <Link href="/login/estudiante" className="font-medium text-[#3B6EAA] hover:underline">
              Volver al inicio de sesión
            </Link>
          </p>
        </div>
      </AuthCard>
    </div>
  );
}
