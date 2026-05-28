"use client";

import { useEffect } from "react";

type ConfirmReleaseDialogProps = {
  open: boolean;
  nombre: string;
  matricula: string;
  departamento: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmReleaseDialog({
  open,
  nombre,
  matricula,
  departamento,
  onConfirm,
  onCancel,
}: ConfirmReleaseDialogProps) {
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-stone-900/45 px-4 backdrop-blur-[2px]"
      role="presentation"
      onClick={onCancel}
    >
      <div
        role="alertdialog"
        aria-labelledby="confirm-release-title"
        aria-describedby="confirm-release-desc"
        className="animate-scale-in w-full max-w-md rounded-2xl border border-[#16a34a]/40 bg-[#dfd6c8] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="confirm-release-title"
          className="text-center text-lg font-bold text-[#15803d]"
        >
          Confirmar liberación
        </h2>
        <p
          id="confirm-release-desc"
          className="mt-4 text-center text-sm leading-relaxed text-stone-700"
        >
          ¿Estás seguro de que deseas liberar a{" "}
          <strong className="text-stone-900">{nombre}</strong> ({matricula}) en{" "}
          <strong className="text-stone-900">{departamento}</strong>?
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-stone-400 bg-[#ebe4d8] px-5 py-2.5 text-sm font-semibold text-stone-800 transition-all duration-200 hover:bg-[#d4cbbf] active:scale-[0.98]"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-[#22c55e] px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-[#4ade80] active:scale-[0.98]"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
