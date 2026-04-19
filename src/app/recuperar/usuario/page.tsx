"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthCard } from "@/components/AuthCard";
import { CountdownButton } from "@/components/CountdownButton";
import { ErrorMessage } from "@/components/ErrorMessage";
import { mockStudent, MOCK_RECOVERY_CODE } from "@/lib/mock";
import { INPUT_DARK, LINK_ON_DARK } from "@/lib/ui";

export default function RecuperarUsuarioPage() {
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [codigoError, setCodigoError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function validarYContinuar() {
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
    setDone(true);
  }

  if (done) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1e1e1e] px-4 py-10 text-neutral-100">
        <AuthCard>
          <div className="flex flex-col gap-6 text-center">
            <h1 className="text-2xl font-black text-neutral-100">Liberación Lince</h1>
            <p className="text-sm leading-relaxed text-neutral-300">
              Gracias, enviamos tu usuario a tu correo de recuperación. Presiona confirmar para volver
              a la pantalla de inicio.
            </p>
            <Link
              href="/"
              className="rounded-xl bg-[#3B6EAA] py-3 text-sm font-bold text-[#FAFAFA] shadow transition hover:brightness-95"
            >
              confirmar
            </Link>
          </div>
        </AuthCard>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1e1e1e] px-4 py-10 text-neutral-100">
      <AuthCard>
        <div className="flex flex-col gap-6">
          <h1 className="text-center text-2xl font-black text-neutral-100">Liberación Lince</h1>

          <div className="flex flex-col gap-2">
            <label htmlFor="email-u" className="text-sm font-medium text-neutral-200">
              Hola!, Ingresa tu correo de recuperación
            </label>
            <input
              id="email-u"
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
              className={INPUT_DARK}
            />
            <ErrorMessage message={emailError} />
          </div>

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
            className="bg-[#5FAF2E] hover:bg-[#A6E22E]"
          >
            Enviar código
          </CountdownButton>

          <div className="flex flex-col gap-2">
            <label htmlFor="codigo-u" className="text-sm font-medium text-neutral-200">
              Ingresa el código recibido
            </label>
            <input
              id="codigo-u"
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
              className={INPUT_DARK}
            />
            <ErrorMessage message={codigoError} />
          </div>

          <button
            type="button"
            onClick={validarYContinuar}
            className="w-full rounded-xl bg-[#5FAF2E] py-3 text-sm font-bold text-[#FAFAFA] shadow transition hover:bg-[#A6E22E]"
          >
            Siguiente...
          </button>

          <p className="text-center text-sm">
            <Link href="/login/estudiante" className={LINK_ON_DARK}>
              Volver al inicio de sesión
            </Link>
          </p>
        </div>
      </AuthCard>
    </div>
  );
}
