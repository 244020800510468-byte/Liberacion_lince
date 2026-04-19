"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AuthCard } from "@/components/AuthCard";
import { ErrorMessage } from "@/components/ErrorMessage";
import { PasswordInput } from "@/components/PasswordInput";
import { LINK_ON_DARK } from "@/lib/ui";

export default function NuevaContrasenaPage() {
  const router = useRouter();
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [matchError, setMatchError] = useState<string | null>(null);

  const bothFilled = a.length > 0 && b.length > 0;
  const canSubmit = bothFilled && a === b && a.length >= 10;

  const hint =
    "la contraseña debe tener un mínimo de 10 caracteres y puede incluir caracteres especiales";

  const buttonClass = useMemo(() => {
    if (!bothFilled) return "bg-neutral-600 text-neutral-300 cursor-not-allowed";
    if (a !== b) return "bg-neutral-600 text-neutral-300 cursor-not-allowed";
    return "bg-[#3B6EAA] text-[#FAFAFA] hover:brightness-95";
  }, [a, b, bothFilled]);

  function submit() {
    if (!bothFilled) return;
    if (a !== b) {
      setMatchError("las contraseñas no coinciden, vuélvalo a intentar");
      return;
    }
    if (a.length < 10) {
      setMatchError("las contraseñas no coinciden, vuélvalo a intentar");
      return;
    }
    setMatchError(null);
    router.push("/login/estudiante");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1e1e1e] px-4 py-10 text-neutral-100">
      <AuthCard>
        <div className="flex flex-col gap-6">
          <h1 className="text-center text-2xl font-black text-neutral-100">Liberación Lince</h1>

          <PasswordInput
            label="ingrese nueva contraseña"
            name="new-password"
            autoComplete="new-password"
            value={a}
            onChange={(v) => {
              setA(v);
              if (matchError) setMatchError(null);
            }}
            hint={hint}
          />

          <PasswordInput
            label="confirmar contraseña"
            name="confirm-password"
            autoComplete="new-password"
            value={b}
            onChange={(v) => {
              setB(v);
              if (matchError) setMatchError(null);
            }}
          />

          <ErrorMessage message={matchError} />

          <button
            type="button"
            disabled={!canSubmit}
            onClick={submit}
            className={`w-full rounded-xl py-3 text-sm font-bold shadow transition ${buttonClass}`}
          >
            confirmar
          </button>

          <p className="text-center text-sm">
            <Link href="/login/estudiante" className={LINK_ON_DARK}>
              Cancelar
            </Link>
          </p>
        </div>
      </AuthCard>
    </div>
  );
}
