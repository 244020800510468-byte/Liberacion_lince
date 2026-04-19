"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthCard } from "@/components/AuthCard";
import { CountdownButton } from "@/components/CountdownButton";
import { ErrorMessage } from "@/components/ErrorMessage";
import { SuccessMessage } from "@/components/SuccessMessage";
import { INPUT_DARK, LINK_ON_DARK } from "@/lib/ui";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RecuperarAdminEmpleadoPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function validateEmail(): boolean {
    if (!email.trim()) {
      setError("Por favor, Ingrese un correo");
      return false;
    }
    if (!emailRegex.test(email.trim())) {
      setError("El correo no es válido");
      return false;
    }
    setError(null);
    return true;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1e1e1e] px-4 py-10 text-neutral-100">
      <AuthCard>
        <div className="flex flex-col gap-6">
          <h1 className="text-center text-2xl font-black text-neutral-100">Liberación Lince</h1>

          <div className="flex flex-col gap-2">
            <label htmlFor="emp-email" className="text-sm font-medium text-neutral-200">
              Correo electrónico
            </label>
            <input
              id="emp-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
                if (success) setSuccess(false);
              }}
              onBlur={() => {
                if (email.trim() && !emailRegex.test(email.trim())) {
                  setError("El correo no es válido");
                }
              }}
              className={INPUT_DARK}
            />
            <ErrorMessage message={error} />
          </div>

          <CountdownButton
            durationSec={120}
            onClick={() => {
              if (!validateEmail()) return;
              setSuccess(true);
            }}
            className="bg-[#5FAF2E] hover:bg-[#A6E22E]"
          >
            Recuperar
          </CountdownButton>

          {success ? (
            <SuccessMessage
              variant="admin"
              message="Se envió un correo a tu dirección de correo electrónico"
            />
          ) : null}

          <button
            type="button"
            disabled={!success}
            onClick={() => router.push("/login/admin")}
            className="w-full rounded-xl bg-[#5FAF2E] py-3 text-sm font-bold text-[#FAFAFA] shadow transition enabled:hover:bg-[#A6E22E] disabled:cursor-not-allowed disabled:bg-neutral-600 disabled:text-neutral-300"
          >
            Siguiente
          </button>

          <p className="text-center text-sm">
            <Link href="/login/admin" className={LINK_ON_DARK}>
              Volver al inicio de sesión
            </Link>
          </p>
        </div>
      </AuthCard>
    </div>
  );
}
