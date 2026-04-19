"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthCard } from "@/components/AuthCard";
import { CountdownButton } from "@/components/CountdownButton";
import { ErrorMessage } from "@/components/ErrorMessage";
import { SuccessMessage } from "@/components/SuccessMessage";

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
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-4 py-10">
      <AuthCard variant="admin">
        <div className="flex flex-col gap-6">
          <h1 className="text-center text-2xl font-black text-white drop-shadow">Liberación Lince</h1>

          <div className="flex flex-col gap-2">
            <label htmlFor="emp-email" className="text-sm font-medium text-white/95">
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
              className="w-full rounded-xl border border-white/40 bg-white/95 px-3 py-2.5 text-foreground outline-none ring-white focus:ring-2"
            />
            <ErrorMessage message={error} />
          </div>

          <CountdownButton
            durationSec={120}
            onClick={() => {
              if (!validateEmail()) return;
              setSuccess(true);
            }}
            className="bg-lince-primary hover:brightness-95"
          >
            Recuperar
          </CountdownButton>

          {success ? (
            <SuccessMessage message="Se envió un correo a tu dirección de correo electrónico" />
          ) : null}

          <button
            type="button"
            disabled={!success}
            onClick={() => router.push("/login/admin")}
            className="w-full rounded-xl bg-lince-primary py-3 text-sm font-bold text-[#FAFAFA] shadow transition enabled:hover:brightness-95 disabled:cursor-not-allowed disabled:bg-neutral-500 disabled:text-neutral-200"
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
