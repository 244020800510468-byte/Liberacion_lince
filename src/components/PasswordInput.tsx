"use client";

import { useId, useState } from "react";

type PasswordInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string | null;
  id?: string;
  autoComplete?: string;
  name?: string;
  hint?: string;
};

export function PasswordInput({
  label,
  value,
  onChange,
  onBlur,
  error,
  id: idProp,
  autoComplete = "current-password",
  name,
  hint,
}: PasswordInputProps) {
  const genId = useId();
  const id = idProp ?? genId;
  const errorId = `${id}-error`;
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-neutral-200">
        {label}
      </label>
      {hint ? (
        <p className="text-xs text-[#7ab3e0]">{hint}</p>
      ) : null}
      <div className="relative">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? errorId : undefined}
          className="w-full rounded-xl border border-neutral-600 bg-[#2d2d2d] px-3 py-2.5 pr-11 text-neutral-100 outline-none transition focus:border-[#5FAF2E] focus:ring-2 focus:ring-[#5FAF2E]/40"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setVisible((v) => !v)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-lg text-neutral-400 hover:bg-white/10"
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          👁
        </button>
      </div>
      {error ? (
        <p id={errorId} className="text-sm font-medium text-[#EF4444]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
