"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthCard } from "@/components/AuthCard";
import { CountdownButton } from "@/components/CountdownButton";
import { ErrorMessage } from "@/components/ErrorMessage";
import { mockStudent, MOCK_RECOVERY_CODE } from "@/lib/mock";
import { INPUT_DARK, LINK_ON_DARK } from "@/lib/ui";

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
    <div className="flex min-h-screen items-center justify-center bg-[#ebe4d8] px-4 py-10 text-stone-900">
      <AuthCard>
        <div className="flex flex-col gap-6">
          <h1 className="text-center text-2xl font-black text-stone-900">Liberación Lince</h1>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-stone-800">
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
              className={INPUT_DARK}
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
              className="bg-[#22c55e] hover:bg-[#4ade80]"
            >
              Enviar código
            </CountdownButton>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="codigo" className="text-sm font-medium text-stone-800">
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
              className={INPUT_DARK}
            />
            <ErrorMessage message={codigoError} />
          </div>

          <button
            type="button"
            onClick={onSiguiente}
            className="w-full rounded-xl bg-[#22c55e] py-3 text-sm font-bold text-white shadow transition hover:bg-[#4ade80]"
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
