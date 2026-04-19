"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthCard } from "@/components/AuthCard";
import { CountdownButton } from "@/components/CountdownButton";
import { ErrorMessage } from "@/components/ErrorMessage";
import { PasswordInput } from "@/components/PasswordInput";
import { mockAdmin, MOCK_RECOVERY_CODE } from "@/lib/mock";

type Step = "codigo" | "nueva";

export default function RecuperarAdminContrasenaPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("codigo");

  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [codigoError, setCodigoError] = useState<string | null>(null);

  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  function siguienteCodigo() {
    let eErr: string | null = null;
    let cErr: string | null = null;

    if (email.trim().toLowerCase() !== mockAdmin.email.toLowerCase()) {
      eErr = "El correo que se ingresó no coincide o no existe, Inténtelo de nuevo";
    }
    if (!codigo.trim() || codigo.trim() !== MOCK_RECOVERY_CODE) {
      cErr = "El código es incorrecto o no se ingresó, por favor revisa e inténtalo de nuevo";
    }

    setEmailError(eErr);
    setCodigoError(cErr);
    if (eErr || cErr) return;
    setStep("nueva");
  }

  function confirmarNueva() {
    setFormError(null);

    if (!a.trim() || !b.trim()) {
      setFormError("No puede continuar con la acción, Por favor ingrese la nueva contraseña");
      return;
    }

    if (a.length > 6 || b.length > 6) {
      setFormError("La contraseña no puede exceder 6 caracteres");
      return;
    }

    if (a !== b) {
      setFormError("La contraseñas no coinciden");
      return;
    }

    router.push("/login/admin");
  }

  if (step === "codigo") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-4 py-10">
        <AuthCard variant="admin">
          <div className="flex flex-col gap-6">
            <h1 className="text-center text-2xl font-black text-white drop-shadow">Liberación Lince</h1>

            <div className="flex flex-col gap-2">
              <label htmlFor="adm-email" className="text-sm font-medium text-white/95">
                Hola!, Ingresa tu correo de recuperación
              </label>
              <input
                id="adm-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError(null);
                }}
                onBlur={() => {
                  if (
                    email.trim() &&
                    email.trim().toLowerCase() !== mockAdmin.email.toLowerCase()
                  ) {
                    setEmailError(
                      "El correo que se ingresó no coincide o no existe, Inténtelo de nuevo"
                    );
                  }
                }}
                className="w-full rounded-xl border border-white/40 bg-white/95 px-3 py-2.5 text-foreground outline-none ring-white focus:ring-2"
              />
              <ErrorMessage message={emailError} />
            </div>

            <CountdownButton
              durationSec={120}
              onClick={() => {
                if (email.trim().toLowerCase() !== mockAdmin.email.toLowerCase()) {
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

            <div className="flex flex-col gap-2">
              <label htmlFor="adm-codigo" className="text-sm font-medium text-white/95">
                Ingresa el código recibido
              </label>
              <input
                id="adm-codigo"
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
                className="w-full rounded-xl border border-white/40 bg-white/95 px-3 py-2.5 text-foreground outline-none ring-white focus:ring-2"
              />
              <ErrorMessage message={codigoError} />
            </div>

            <button
              type="button"
              onClick={siguienteCodigo}
              className="w-full rounded-xl bg-lince-primary py-3 text-sm font-bold text-[#FAFAFA] shadow transition hover:brightness-95"
            >
              Siguiente...
            </button>

            <p className="text-center text-sm">
              <Link href="/login/admin" className="font-medium text-lince-blue hover:underline">
                Volver al inicio de sesión
              </Link>
            </p>
          </div>
        </AuthCard>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-4 py-10">
      <AuthCard variant="admin">
        <div className="flex flex-col gap-6">
          <h1 className="text-center text-2xl font-black text-white drop-shadow">Liberación Lince</h1>

          <PasswordInput
            label="ingrese nueva contraseña"
            name="new-password"
            value={a}
            onChange={(v) => {
              setA(v);
              if (formError) setFormError(null);
            }}
            onBlur={() => {
              if (a.length > 6) {
                setFormError("La contraseña no puede exceder 6 caracteres");
              }
            }}
          />

          <PasswordInput
            label="confirmar contraseña"
            name="confirm-password"
            value={b}
            onChange={(v) => {
              setB(v);
              if (formError) setFormError(null);
            }}
            onBlur={() => {
              if (b.length > 6) {
                setFormError("La contraseña no puede exceder 6 caracteres");
              }
            }}
          />

          <ErrorMessage message={formError} />

          <button
            type="button"
            onClick={confirmarNueva}
            className="w-full rounded-xl bg-lince-primary py-3 text-sm font-bold text-[#FAFAFA] shadow transition hover:brightness-95"
          >
            Siguiente
          </button>

          <p className="text-center text-sm">
            <Link href="/login/admin" className="font-medium text-lince-blue hover:underline">
              Volver al inicio de sesión
            </Link>
          </p>
        </div>
      </AuthCard>
    </div>
  );
}
